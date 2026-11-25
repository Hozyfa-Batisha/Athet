/* Server-rendered state is held in memory only. PostgreSQL owns persistence. */
(() => {
  const element = document.getElementById("app-bootstrap");
  const initial = element ? JSON.parse(element.textContent) : {};
  const guest = !initial.me;
  const originalFetch = window.fetch.bind(window);
  window.AppBootstrap = initial;

  async function authenticatedFetch(resource, options = {}) {
    const target = new URL(
      typeof resource === "string" ? resource : resource.url,
      location.href,
    );
    if (target.origin !== location.origin)
      return originalFetch(resource, options);
    const method = String(
      options.method || (resource instanceof Request ? resource.method : "GET"),
    ).toUpperCase();
    const headers = new Headers(
      options.headers || (resource instanceof Request ? resource.headers : {}),
    );
    if (
      !["GET", "HEAD", "OPTIONS"].includes(method) &&
      (target.pathname.startsWith("/api/") || target.pathname === "/logout")
    )
      headers.set("X-CSRF-Token", initial.csrfToken || "");
    return originalFetch(resource, {
      ...options,
      headers,
      cache: "no-store",
      credentials: "same-origin",
    });
  }
  window.fetch = authenticatedFetch;

  let inherited;
  try {
    if (window.parent !== window) inherited = window.parent.ServerStore;
  } catch {
    /* A standalone page owns its store. */
  }
  if (inherited) {
    window.ServerStore = inherited;
    return;
  }
  const values = { ...(initial.settings || {}) };
  const pending = new Map();
  let timer, inFlight;

  function broadcast(key, value, target = window) {
    const event = new target.CustomEvent("athar:settings", {
      detail: { key, newValue: value },
    });
    Object.defineProperties(event, {
      key: { value: key },
      newValue: { value },
    });
    target.dispatchEvent(event);
    for (const frame of target.document.querySelectorAll("iframe")) {
      try {
        if (frame.contentWindow?.document)
          broadcast(key, value, frame.contentWindow);
      } catch {
        /* Foreign frames never receive account settings. */
      }
    }
  }

  function report(message, failed = false) {
    let status = document.getElementById("persistence-status");
    if (!status) {
      status = document.createElement("div");
      status.id = "persistence-status";
      status.className = "no-print";
      status.setAttribute("role", "status");
      status.style.cssText =
        "position:fixed;bottom:14px;right:14px;z-index:99999;background:#fffdf6;color:#0a4f40;border:1px solid #c9a24b;padding:8px 12px;border-radius:12px;font:700 13px Cairo,sans-serif;box-shadow:0 3px 15px #0002;max-width:90vw";
      (document.body || document.documentElement).appendChild(status);
    }
    status.replaceChildren();
    status.hidden = !message;
    status.style.color = failed ? "#b91c1c" : "#0a4f40";
    status.append(document.createTextNode(message));
    if (failed) {
      const retry = document.createElement("button");
      retry.textContent = "إعادة المحاولة";
      retry.style.cssText =
        "margin-inline-start:10px;text-decoration:underline";
      retry.addEventListener("click", () => {
        window.dispatchEvent(new Event("athar:retry-save"));
        window.ServerStore.flush().catch(() => {});
      });
      status.append(retry);
    }
  }
  window.reportSaveStatus = report;

  async function flush() {
    clearTimeout(timer);
    if (guest) { pending.clear(); return; }
    if (inFlight) return inFlight;
    inFlight = (async () => {
      while (pending.size) {
        const changes = Object.fromEntries(pending);
        try {
          const response = await authenticatedFetch("/api/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ changes }),
          });
          if (response.status === 401) {
            location.href = "/login";
            throw new Error("انتهت جلسة الدخول.");
          }
          const result = await response.json();
          if (!response.ok)
            throw new Error(result.error || "تعذر حفظ الإعدادات.");
          for (const [key, value] of Object.entries(changes))
            if (pending.get(key) === value) pending.delete(key);
          if (!window.scheduleHasPendingChanges?.()) report("");
        } catch (error) {
          report(
            error instanceof TypeError
              ? "تعذر الاتصال بالسيرفر لحفظ الإعدادات. أعد المحاولة."
              : `تعذر حفظ الإعدادات: ${error.message || "أعد المحاولة."}`,
            true,
          );
          throw error;
        }
      }
    })().finally(() => {
      inFlight = null;
    });
    return inFlight;
  }

  function setValue(key, value) {
    if (value === null ? !(key in values) : values[key] === value) return;
    if (value === null) delete values[key];
    else values[key] = value;
    if (!guest) pending.set(key, value);
    if (key === "theme" || key === "hurufi-theme") {
      const alias = key === "theme" ? "hurufi-theme" : "theme";
      if (value === null) delete values[alias];
      else values[alias] = value;
      broadcast(alias, value);
    }
    broadcast(key, value);
    clearTimeout(timer);
    if (!guest) timer = setTimeout(() => flush().catch(() => {}), 80);
  }
  window.ServerStore = Object.freeze({
    getItem: (key) => values[key] ?? null,
    setItem: (key, value) => setValue(String(key), String(value)),
    removeItem: (key) => setValue(String(key), null),
    flush,
    hasPendingChanges: () => pending.size > 0,
  });
  window.addEventListener("online", () => flush().catch(() => {}));
  window.addEventListener("beforeunload", (event) => {
    if (pending.size || window.scheduleHasPendingChanges?.()) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
})();
