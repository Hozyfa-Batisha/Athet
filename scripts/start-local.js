/** Launcher for the persistent local PGlite database. */
import { fork, spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
console.log("Starting Athar with a persistent local database...");
console.log(
  "Accounts and website data stay saved on this computer after closing.",
);
console.log("Keep this window open while using the website.");

const child = fork(
  path.join(root, "scripts/local-server.js"),
  ["--host", "127.0.0.1", "--port", "0"],
  {
    cwd: root,
    env: { ...process.env, NODE_ENV: "development", HOST: "127.0.0.1" },
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  },
);
let ready = false;
let closing = false;

const deadline = setTimeout(() => {
  console.error(
    "The preview did not become ready. Check the error messages above.",
  );
  closing = true;
  process.exitCode = 1;
  child.kill("SIGTERM");
}, 60000);
deadline.unref();

function openBrowser(url) {
  let command, args;
  if (process.platform === "win32") {
    command = "cmd.exe";
    args = ["/d", "/c", "start", '""', url];
  } else if (process.platform === "darwin") {
    command = "open";
    args = [url];
  } else {
    command = "xdg-open";
    args = [url];
  }
  const browser = spawn(command, args, {
    stdio: "ignore",
    detached: true,
    windowsHide: true,
    windowsVerbatimArguments: process.platform === "win32",
  });
  browser.on("error", () =>
    console.log(`Open this address in your browser: ${url}`),
  );
  browser.unref();
}

child.on("message", (message) => {
  if (
    ready ||
    message?.type !== "athar-ready" ||
    !Number.isInteger(message.port) ||
    message.port < 1 ||
    message.port > 65535
  )
    return;
  ready = true;
  clearTimeout(deadline);
  const url = `http://127.0.0.1:${message.port}/`;
  console.log(`LOCAL_PREVIEW_URL=${url}`);
  if (process.env.LOCAL_PREVIEW_NO_BROWSER !== "1") openBrowser(url);
});

child.on("error", (error) => {
  clearTimeout(deadline);
  console.error("Could not launch the preview:", error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  clearTimeout(deadline);
  if (!closing) process.exitCode = code ?? 1;
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    if (closing) return;
    closing = true;
    clearTimeout(deadline);
    child.kill("SIGTERM");
  });
