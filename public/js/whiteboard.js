(function () {
  // Core State Management
  const canvas = document.getElementById("paintCanvas");
  const ctx = canvas.getContext("2d");
  const boardWrapper = document.getElementById("boardWrapper");
  const overlayContainer = document.getElementById("overlayContainer");

  let currentTool = "pen";
  let currentColor = "#000000";
  let currentSize = 4;
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  // Board Canvas Viewport Zoom & Pan
  let zoomLevel = 1;
  let boardTheme = "light"; // 'dark' | 'light'
  let bgStyle = "blank"; // 'blank' | 'grid' | 'lines'

  // Undo & Redo Stacks
  let undoStack = [];
  let redoStack = [];
  const MAX_HISTORY = 25;

  // Temporary preview canvas state for shapes
  let snapshot = null;
  const SHAPE_TOOLS = [
    "rectangle",
    "roundRect",
    "ellipse",
    "triangle",
    "rightTriangle",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
    "plus",
    "line",
    "dashedLine",
    "arrow",
    "doubleArrow",
  ];

  // Initialize Canvas Dimensions & State
  // Size the bitmap to the screen's real pixel density so strokes and text stay sharp
  function sizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = boardWrapper.clientWidth,
      h = boardWrapper.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function initCanvas() {
    sizeCanvas();
    saveState();
    updateCanvasBackground();
  }

  let canvasReady = false;
  function fitCanvas() {
    if (!boardWrapper.clientWidth) return;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext("2d").drawImage(canvas, 0, 0);
    sizeCanvas();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
  }
  function boardShow() {
    if (!canvasReady) {
      canvasReady = true;
      initCanvas();
    } else {
      fitCanvas();
    }
  }
  window.addEventListener("resize", fitCanvas);

  let lastX = 0;
  let lastY = 0;

  // Set Active Drawing Tool
  function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll(".tool-btn").forEach((btn) => {
      btn.classList.remove("bg-brand-600", "text-white", "shadow-md");
      btn.classList.add("text-slate-400");
    });

    let activeBtnId = `tool-${tool}`;
    if (SHAPE_TOOLS.includes(tool)) {
      activeBtnId = "tool-shape";
    }

    const activeBtn = document.getElementById(activeBtnId);
    if (activeBtn) {
      activeBtn.classList.add("bg-brand-600", "text-white", "shadow-md");
      activeBtn.classList.remove("text-slate-400");
    }

    document.querySelectorAll(".shape-opt").forEach((b) => {
      const on = b.dataset.shape === tool;
      b.classList.toggle("bg-brand-600", on);
      b.classList.toggle("text-white", on);
    });

    // Laser dot + editable shapes follow the active tool
    const ld = document.getElementById("laserDot");
    if (ld && tool !== "laser") ld.style.display = "none";
    if (tool !== "select") deselectShape();
    document
      .querySelectorAll(".board-shape")
      .forEach(
        (s) => (s.style.pointerEvents = tool === "select" ? "auto" : "none"),
      );

    // Adjust Cursors
    if (tool === "select") {
      canvas.style.cursor = "default";
    } else if (tool === "text") {
      canvas.style.cursor = "text";
    } else {
      canvas.style.cursor = "crosshair";
    }
    if (tool === "laser") canvas.style.cursor = "none";
    if (tool === "select") canvas.style.cursor = "grab";
  }

  // Set Color
  function setColor(color) {
    currentColor = color;
    document.querySelectorAll("#colorPalette button").forEach((btn) => {
      btn.classList.remove("ring-2", "ring-brand-500", "scale-110");
    });
    if (event && event.target) {
      event.target.classList.add("ring-2", "ring-brand-500", "scale-110");
    }
  }

  // Set Brush Thickness
  function setBrushSize(size) {
    currentSize = size;
    document.getElementById("sizeDisplay").innerText = size;
  }

  // Mouse & Touch Drawing Handlers
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) / zoomLevel,
      y: (clientY - rect.top) / zoomLevel,
    };
  }

  function startDrawing(e) {
    if (currentTool === "select" || currentTool === "laser") {
      deselectShape();
      return;
    }

    // Handle Canvas Text Tool Insertion
    if (currentTool === "text") {
      const pos = getCanvasCoordinates(e);
      addTextInput(pos.x, pos.y);
      return;
    }

    isDrawing = true;
    const pos = getCanvasCoordinates(e);
    startX = pos.x;
    startY = pos.y;
    lastX = pos.x;
    lastY = pos.y;

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function draw(e) {
    if (!isDrawing) return;

    const pos = getCanvasCoordinates(e);

    if (currentTool === "pen") {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (currentTool === "chisel") {
      // قلم الخط العربي Chisel Tip برأس مائل
      ctx.fillStyle = currentColor;
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";

      const dist = Math.hypot(pos.x - lastX, pos.y - lastY);
      const steps = Math.max(Math.ceil(dist / 2), 1);
      const angle = -Math.PI / 4;
      const nibWidth = currentSize * 3;

      for (let i = 0; i < steps; i++) {
        const currX = lastX + (pos.x - lastX) * (i / steps);
        const currY = lastY + (pos.y - lastY) * (i / steps);

        ctx.save();
        ctx.translate(currX, currY);
        ctx.rotate(angle);
        ctx.fillRect(-nibWidth / 2, -1, nibWidth, 2.5);
        ctx.restore();
      }

      lastX = pos.x;
      lastY = pos.y;
    } else if (currentTool === "highlighter") {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize * 4;
      ctx.globalAlpha = 0.35;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = currentSize * 5;
      ctx.globalAlpha = 1.0;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (SHAPE_TOOLS.includes(currentTool)) {
      ctx.putImageData(snapshot, 0, 0);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineJoin = "round";
      ctx.setLineDash(currentTool === "dashedLine" ? [12, 8] : []);
      ctx.beginPath();
      drawShapeGeometry(currentTool, startX, startY, pos.x, pos.y);
      lastX = pos.x;
      lastY = pos.y;
      ctx.stroke();
    }
  }

  function stopDrawing() {
    if (isDrawing) {
      isDrawing = false;
      ctx.setLineDash([]);
      if (SHAPE_TOOLS.includes(currentTool)) {
        ctx.putImageData(snapshot, 0, 0);
        if (Math.hypot(lastX - startX, lastY - startY) > 3) {
          createShapeObject(currentTool, startX, startY, lastX, lastY);
        }
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "source-over";
        return;
      }
      ctx.closePath();
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      saveState();
    }
  }

  // Draw Helper Arrow
  function drawArrow(fromX, fromY, toX, toY) {
    const headLength = 15;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();
  }

  // Build the path for a shape between two points (caller strokes it)
  function drawShapeGeometry(tool, x1, y1, x2, y2) {
    const x = Math.min(x1, x2),
      y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1),
      h = Math.abs(y2 - y1);
    const cx = x + w / 2,
      cy = y + h / 2;
    const polygon = (pts) => {
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
    };
    const regular = (n, offset) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = offset + (i * 2 * Math.PI) / n;
        pts.push([cx + (w / 2) * Math.cos(a), cy + (h / 2) * Math.sin(a)]);
      }
      return pts;
    };
    switch (tool) {
      case "rectangle":
        ctx.rect(x, y, w, h);
        break;
      case "roundRect": {
        const r = Math.min(w, h) * 0.25;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        break;
      }
      case "circle":
        ctx.arc(x1, y1, Math.hypot(x2 - x1, y2 - y1), 0, 2 * Math.PI);
        break;
      case "ellipse":
        ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, 2 * Math.PI);
        break;
      case "triangle":
        polygon([
          [cx, y],
          [x + w, y + h],
          [x, y + h],
        ]);
        break;
      case "rightTriangle":
        polygon([
          [x, y],
          [x, y + h],
          [x + w, y + h],
        ]);
        break;
      case "diamond":
        polygon([
          [cx, y],
          [x + w, cy],
          [cx, y + h],
          [x, cy],
        ]);
        break;
      case "pentagon":
        polygon(regular(5, -Math.PI / 2));
        break;
      case "hexagon":
        polygon(regular(6, 0));
        break;
      case "star": {
        const pts = [];
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5;
          const k = i % 2 === 0 ? 1 : 0.5;
          pts.push([
            cx + (w / 2) * k * Math.cos(a),
            cy + (h / 2) * k * Math.sin(a),
          ]);
        }
        polygon(pts);
        break;
      }
      case "plus": {
        const tw = w / 3,
          th = h / 3;
        polygon([
          [x + tw, y],
          [x + 2 * tw, y],
          [x + 2 * tw, y + th],
          [x + w, y + th],
          [x + w, y + 2 * th],
          [x + 2 * tw, y + 2 * th],
          [x + 2 * tw, y + h],
          [x + tw, y + h],
          [x + tw, y + 2 * th],
          [x, y + 2 * th],
          [x, y + th],
          [x + tw, y + th],
        ]);
        break;
      }
      case "line":
      case "dashedLine":
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        break;
      case "arrow":
        drawArrow(x1, y1, x2, y2);
        break;
      case "doubleArrow":
        drawArrow(x1, y1, x2, y2);
        drawArrow(x2, y2, x1, y1);
        break;
    }
  }

  // Shape menu: stays open until a specific shape is picked
  function openShapeMenu() {
    document.getElementById("shape-menu").classList.remove("hidden");
    if (!SHAPE_TOOLS.includes(currentTool)) setTool("rectangle");
  }

  function pickShape(tool) {
    setTool(tool);
    document.getElementById("shape-menu").classList.add("hidden");
  }

  // ===== Editable shapes (SVG objects that can be moved / deleted) =====
  const SVGNS = "http://www.w3.org/2000/svg";
  let selectedShape = null;

  function arrowD(fx, fy, tx, ty) {
    const L = 15,
      a = Math.atan2(ty - fy, tx - fx);
    const h1 = [
      tx - L * Math.cos(a - Math.PI / 6),
      ty - L * Math.sin(a - Math.PI / 6),
    ];
    const h2 = [
      tx - L * Math.cos(a + Math.PI / 6),
      ty - L * Math.sin(a + Math.PI / 6),
    ];
    return `M${fx} ${fy} L${tx} ${ty} M${h1[0]} ${h1[1]} L${tx} ${ty} L${h2[0]} ${h2[1]}`;
  }

  function buildShapeEl(tool, x1, y1, x2, y2, color, size) {
    const x = Math.min(x1, x2),
      y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1),
      h = Math.abs(y2 - y1);
    const cx = x + w / 2,
      cy = y + h / 2;
    const pad = size * 2 + 6;
    const mk = (name, attrs) => {
      const n = document.createElementNS(SVGNS, name);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    };
    const style = {
      fill: "transparent",
      stroke: color,
      "stroke-width": size,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    };
    const poly = (pts) =>
      mk(
        "polygon",
        Object.assign({}, style, {
          points: pts.map((p) => p[0] + "," + p[1]).join(" "),
        }),
      );
    const regular = (n, off) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = off + (i * 2 * Math.PI) / n;
        pts.push([cx + (w / 2) * Math.cos(a), cy + (h / 2) * Math.sin(a)]);
      }
      return pts;
    };
    let node;
    switch (tool) {
      case "rectangle":
        node = mk(
          "rect",
          Object.assign({}, style, { x, y, width: w, height: h }),
        );
        break;
      case "roundRect":
        node = mk(
          "rect",
          Object.assign({}, style, {
            x,
            y,
            width: w,
            height: h,
            rx: Math.min(w, h) * 0.25,
          }),
        );
        break;
      case "ellipse":
        node = mk(
          "ellipse",
          Object.assign({}, style, { cx, cy, rx: w / 2, ry: h / 2 }),
        );
        break;
      case "triangle":
        node = poly([
          [cx, y],
          [x + w, y + h],
          [x, y + h],
        ]);
        break;
      case "rightTriangle":
        node = poly([
          [x, y],
          [x, y + h],
          [x + w, y + h],
        ]);
        break;
      case "diamond":
        node = poly([
          [cx, y],
          [x + w, cy],
          [cx, y + h],
          [x, cy],
        ]);
        break;
      case "pentagon":
        node = poly(regular(5, -Math.PI / 2));
        break;
      case "hexagon":
        node = poly(regular(6, 0));
        break;
      case "star": {
        const pts = [];
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5;
          const k = i % 2 === 0 ? 1 : 0.5;
          pts.push([
            cx + (w / 2) * k * Math.cos(a),
            cy + (h / 2) * k * Math.sin(a),
          ]);
        }
        node = poly(pts);
        break;
      }
      case "plus": {
        const tw = w / 3,
          th = h / 3;
        node = poly([
          [x + tw, y],
          [x + 2 * tw, y],
          [x + 2 * tw, y + th],
          [x + w, y + th],
          [x + w, y + 2 * th],
          [x + 2 * tw, y + 2 * th],
          [x + 2 * tw, y + h],
          [x + tw, y + h],
          [x + tw, y + 2 * th],
          [x, y + 2 * th],
          [x, y + th],
          [x + tw, y + th],
        ]);
        break;
      }
      case "line":
      case "dashedLine":
        node = mk("line", Object.assign({}, style, { x1, y1, x2, y2 }));
        if (tool === "dashedLine")
          node.setAttribute("stroke-dasharray", size * 4 + " " + size * 3);
        break;
      case "arrow":
        node = mk(
          "path",
          Object.assign({}, style, { d: arrowD(x1, y1, x2, y2) }),
        );
        break;
      case "doubleArrow":
        node = mk(
          "path",
          Object.assign({}, style, {
            d: arrowD(x1, y1, x2, y2) + " " + arrowD(x2, y2, x1, y1),
          }),
        );
        break;
      default:
        return null;
    }
    const svg = mk("svg", {
      width: w + 2 * pad,
      height: h + 2 * pad,
      viewBox: `${x - pad} ${y - pad} ${w + 2 * pad} ${h + 2 * pad}`,
    });
    svg.style.position = "absolute";
    svg.style.left = x - pad + "px";
    svg.style.top = y - pad + "px";
    svg.style.overflow = "visible";
    svg.style.pointerEvents = "none";
    svg.classList.add("board-shape");
    svg.appendChild(node);
    return svg;
  }

  function createShapeObject(tool, x1, y1, x2, y2) {
    const svg = buildShapeEl(tool, x1, y1, x2, y2, currentColor, currentSize);
    if (!svg) return;
    overlayContainer.appendChild(svg);
    svg.addEventListener("mousedown", (e) => {
      if (currentTool !== "select") return;
      e.preventDefault();
      e.stopPropagation();
      selectShape(svg);
      let sx = e.clientX,
        sy = e.clientY;
      const move = (ev) => {
        svg.style.left = parseFloat(svg.style.left) + ev.clientX - sx + "px";
        svg.style.top = parseFloat(svg.style.top) + ev.clientY - sy + "px";
        sx = ev.clientX;
        sy = ev.clientY;
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }

  function selectShape(svg) {
    deselectShape();
    selectedShape = svg;
    svg.style.filter = "drop-shadow(0 0 4px #0E6B55)";
  }

  function deselectShape() {
    if (selectedShape) selectedShape.style.filter = "";
    selectedShape = null;
  }

  document.addEventListener("keydown", (e) => {
    if (!selectedShape) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "Delete" || e.key === "Backspace") {
      selectedShape.remove();
      selectedShape = null;
      e.preventDefault();
    }
  });

  // ===== Laser pointer =====
  const laserDot = document.createElement("div");
  laserDot.id = "laserDot";
  laserDot.style.cssText =
    "position:absolute;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#ff1a1a;box-shadow:0 0 12px 5px rgba(255,40,40,.8);pointer-events:none;display:none;z-index:5;";
  boardWrapper.appendChild(laserDot);
  boardWrapper.addEventListener("mousemove", (e) => {
    // Hide the dot over the toolbar / shape menu, show it only on the board
    const overTools =
      e.target.closest &&
      e.target.closest(".tool-btn, #shape-menu, #shape-group");
    if (currentTool !== "laser" || overTools) {
      laserDot.style.display = "none";
      return;
    }
    const r = boardWrapper.getBoundingClientRect();
    laserDot.style.left = e.clientX - r.left + "px";
    laserDot.style.top = e.clientY - r.top + "px";
    laserDot.style.display = "block";
  });
  boardWrapper.addEventListener("mouseleave", () => {
    laserDot.style.display = "none";
  });

  // Canvas Event Listeners
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  canvas.addEventListener("touchstart", (e) => {
    startDrawing(e);
    e.preventDefault();
  });
  canvas.addEventListener("touchmove", (e) => {
    draw(e);
    e.preventDefault();
  });
  canvas.addEventListener("touchend", stopDrawing);

  // Sticky Notes
  function addStickyNote() {
    const note = document.createElement("div");
    note.className =
      "absolute p-3 rounded-xl shadow-xl w-48 bg-amber-200 text-slate-800 pointer-events-auto cursor-move z-20 flex flex-col gap-2 border border-amber-300";
    note.style.left = `${boardWrapper.clientWidth / 2 - 96}px`;
    note.style.top = `${boardWrapper.clientHeight / 2 - 80}px`;

    note.innerHTML = `
                <div class="flex justify-between items-center border-b border-amber-300/60 pb-1">
                    <svg class="ico text-amber-600 text-xs" style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-amber-800 hover:text-red-600 transition-colors">
                        <svg class="ico text-sm" style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <textarea placeholder="اكتب ملاحظتك هنا..." class="w-full bg-transparent resize-none border-0 focus:outline-none text-sm text-slate-800 font-semibold placeholder-amber-700/50" rows="3"></textarea>
            `;

    makeDraggable(note);
    overlayContainer.appendChild(note);
  }

  // Interactive Canvas Text Input
  function addTextInput(x, y) {
    const textContainer = document.createElement("div");
    textContainer.className =
      "absolute pointer-events-auto cursor-move z-20 flex items-center gap-1 group";
    textContainer.style.left = `${x}px`;
    textContainer.style.top = `${y}px`;

    textContainer.innerHTML = `
                <input type="text" placeholder="اكتب هنا..." class="text-input-field bg-transparent border-b-2 border-brand-500 focus:outline-none text-xl font-bold px-1 py-0.5 transition-all" style="color:${currentColor}; min-width: 120px;">
                <button onclick="this.parentElement.remove()" class="delete-btn opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-600 p-1 transition-opacity">
                    <svg class="ico " style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            `;

    const inputEl = textContainer.querySelector("input");
    const deleteBtn = textContainer.querySelector(".delete-btn");

    inputEl.addEventListener("blur", () => {
      if (inputEl.value.trim() === "") {
        textContainer.remove();
      } else {
        inputEl.classList.remove("border-b-2", "border-brand-500");
        inputEl.classList.add("border-transparent");
        deleteBtn.classList.add("hidden");
      }
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        inputEl.blur();
      }
    });

    inputEl.addEventListener("focus", () => {
      inputEl.classList.add("border-b-2", "border-brand-500");
      inputEl.classList.remove("border-transparent");
      deleteBtn.classList.remove("hidden");
    });

    makeDraggable(textContainer);
    overlayContainer.appendChild(textContainer);

    setTimeout(() => inputEl.focus(), 50);
  }

  // Upload Image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const imgContainer = document.createElement("div");
      imgContainer.className =
        "absolute pointer-events-auto cursor-move z-20 group inline-block p-1 bg-slate-800/40 border border-slate-600/50 rounded-xl backdrop-blur-xs shadow-2xl";
      imgContainer.style.left = `${boardWrapper.clientWidth / 2 - 140}px`;
      imgContainer.style.top = `${boardWrapper.clientHeight / 2 - 140}px`;

      imgContainer.innerHTML = `
                    <div class="relative">
                        <img src="${event.target.result}" class="max-w-[280px] max-h-[280px] rounded-lg object-contain">
                        <button onclick="this.parentElement.parentElement.remove()" class="absolute -top-2 -right-2 bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <svg class="ico text-xs" style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                `;

      makeDraggable(imgContainer);
      overlayContainer.appendChild(imgContainer);
    };
    reader.readAsDataURL(file);
  }

  // Draggable Helper
  function makeDraggable(element) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")
        return;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Background & Theme Control
  function changeBackground(type) {
    bgStyle = type;
    ["blank", "grid", "lines"].forEach((b) => {
      const btn = document.getElementById(`bgBtn-${b}`);
      if (b === type) {
        btn.className =
          "px-2.5 py-1 text-xs rounded-md transition-all bg-brand-600 text-white";
      } else {
        btn.className =
          "px-2.5 py-1 text-xs rounded-md text-slate-300 hover:text-white hover:bg-slate-600 transition-all";
      }
    });
    updateCanvasBackground();
  }

  function toggleBoardTheme() {
    boardTheme = boardTheme === "dark" ? "light" : "dark";
    const btn = document.getElementById("boardThemeBtn");
    if (boardTheme === "light") {
      btn.innerHTML = `<svg class="ico text-amber-500" style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
      canvas.classList.remove("wb-board-dark");
      canvas.classList.add("wb-board-light");
    } else {
      btn.innerHTML = `<svg class="ico text-yellow-400" style="font-size:1em;width:1em;height:1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
      canvas.classList.remove("wb-board-light");
      canvas.classList.add("wb-board-dark");
    }
    updateCanvasBackground();
  }

  function updateCanvasBackground() {
    canvas.className = canvas.className.replace(
      /bg-(grid|lines)-(light|dark)/g,
      "",
    );
    if (bgStyle !== "blank") {
      const bgClass = `bg-${bgStyle}-${boardTheme}`;
      canvas.classList.add(bgClass);
    }
  }

  // Zoom Controls
  function zoomIn() {
    if (zoomLevel < 2) {
      zoomLevel += 0.1;
      applyZoom();
    }
  }

  function zoomOut() {
    if (zoomLevel > 1.001) {
      zoomLevel -= 0.1;
      if (zoomLevel < 1) zoomLevel = 1;
      applyZoom();
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    applyZoom();
  }

  function applyZoom() {
    canvas.style.transform = `scale(${zoomLevel})`;
    canvas.style.transformOrigin = "center center";
    document.getElementById("zoomPercent").innerText =
      `${Math.round(zoomLevel * 100)}%`;
  }

  // Undo & Redo History Management
  function saveState() {
    if (undoStack.length >= MAX_HISTORY) undoStack.shift();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack = [];
  }

  function undo() {
    if (undoStack.length > 1) {
      redoStack.push(undoStack.pop());
      const state = undoStack[undoStack.length - 1];
      ctx.putImageData(state, 0, 0);
    }
  }

  function redo() {
    if (redoStack.length > 0) {
      const state = redoStack.pop();
      undoStack.push(state);
      ctx.putImageData(state, 0, 0);
    }
  }

  // Clear Canvas Modal Controls
  function confirmClearCanvas() {
    document.getElementById("clearModal").classList.remove("hidden");
  }

  function closeClearModal() {
    document.getElementById("clearModal").classList.add("hidden");
  }

  function executeClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    overlayContainer.innerHTML = "";
    saveState();
    closeClearModal();
  }

  // Export Canvas as PNG
  function exportImage() {
    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;

    exportCtx.fillStyle = boardTheme === "dark" ? "#0B3B30" : "#ffffff";
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.download = `سبورة-تفاعلية-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  }

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("view-board").classList.contains("hidden"))
      return;
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.ctrlKey && e.key.toLowerCase() === "z") {
      undo();
    } else if (e.ctrlKey && e.key.toLowerCase() === "y") {
      redo();
    }
  });

  // Interactive Audio Effects & Animations (Stars & Sad Emojis)
  // ===== أصوات حقيقية الشكل (مولّدة بالمتصفح) =====
  let sfxAudio = null;
  function sfxContext() {
    if (!sfxAudio)
      sfxAudio = new (window.AudioContext || window.webkitAudioContext)();
    if (sfxAudio.state === "suspended") sfxAudio.resume();
    return sfxAudio;
  }
  function noiseBuffer(ctx, seconds) {
    const buf = ctx.createBuffer(
      1,
      Math.floor(ctx.sampleRate * seconds),
      ctx.sampleRate,
    );
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }
  // صدى خفيف للغرفة
  function roomReverb(ctx) {
    const conv = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 0.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    conv.buffer = ir;
    return conv;
  }
  // تصفيق: ملف الصوت من مجلد sounds بجانب index.html
  const APPLAUSE_FILE = "sounds/applause.mp3";
  const applause = createInPageAudio(APPLAUSE_FILE);
  applause.addEventListener("error", function () {
    console.error("تعذر تحميل ملف التصفيق:", APPLAUSE_FILE);
  });
  function playClapSound() {
    applause.currentTime = 0;
    const p = applause.play();
    if (p && p.catch)
      p.catch(function (err) {
        console.error("تعذر تشغيل التصفيق:", err);
      });
  }

  // فرحة وتشجيع: هتاف جماعي يرتفع ثم يهدأ
  function playCheerSound() {
    const ctx = sfxContext();
    const t0 = ctx.currentTime + 0.05;
    const dur = 1.8;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.5, t0 + 0.25);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    master.connect(ctx.destination);

    // همهمة الجمهور
    const crowd = ctx.createBufferSource();
    crowd.buffer = noiseBuffer(ctx, dur + 0.2);
    const crowdBp = ctx.createBiquadFilter();
    crowdBp.type = "bandpass";
    crowdBp.frequency.value = 900;
    crowdBp.Q.value = 0.6;
    const crowdGain = ctx.createGain();
    crowdGain.gain.value = 0.35;
    crowd.connect(crowdBp);
    crowdBp.connect(crowdGain);
    crowdGain.connect(master);
    crowd.start(t0);
    crowd.stop(t0 + dur + 0.2);

    // أصوات متعددة ترتفع وفيها اهتزاز طبيعي
    for (let v = 0; v < 6; v++) {
      const start = t0 + Math.random() * 0.15;
      const base = 180 + Math.random() * 180;
      const voice = ctx.createOscillator();
      voice.type = "sawtooth";
      voice.frequency.setValueAtTime(base, start);
      voice.frequency.exponentialRampToValueAtTime(
        base * (1.6 + Math.random() * 0.4),
        start + 0.5,
      );
      voice.frequency.exponentialRampToValueAtTime(
        base * 1.2,
        start + dur - 0.2,
      );
      const formant = ctx.createBiquadFilter();
      formant.type = "bandpass";
      formant.frequency.value = 800 + Math.random() * 400;
      formant.Q.value = 3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.12, start + 0.15);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur - 0.1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 5 + Math.random() * 2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = base * 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(voice.frequency);
      voice.connect(formant);
      formant.connect(g);
      g.connect(master);
      voice.start(start);
      voice.stop(start + dur);
      lfo.start(start);
      lfo.stop(start + dur);
    }
  }

  function triggerStarEffect() {
    playClapSound();
    setTimeout(playCheerSound, 250);
    createFallingParticles(["👏"], 30);
  }

  function triggerSadEffect() {
    if (window.Tone) {
      Tone.start();
      const synth = new Tone.MonoSynth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.3, decay: 0.4, sustain: 0.8, release: 0.6 },
        filterEnvelope: {
          attack: 0.2,
          decay: 0.5,
          sustain: 0.5,
          baseFrequency: 200,
          octaves: 2,
        },
      }).toDestination();

      synth.volume.value = -6;

      const now = Tone.now();
      synth.triggerAttack("A2", now);
      synth.frequency.rampTo("C3", 0.4, now + 0.1);
      synth.frequency.rampTo("G2", 0.7, now + 0.5);
      synth.triggerRelease(now + 1.2);
    }

    const sadEmojis = ["😢", "😭", "🥺", "💧"];
    createFallingParticles(sadEmojis, 25);
  }

  function createFallingParticles(items, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.innerText = items[Math.floor(Math.random() * items.length)];
      particle.className =
        "fixed pointer-events-none z-50 text-2xl md:text-3xl transition-transform";

      const startLeft = Math.random() * window.innerWidth;
      const startTop = -40;
      const duration = 2 + Math.random() * 2;
      const rotation = (Math.random() - 0.5) * 360;

      particle.style.left = `${startLeft}px`;
      particle.style.top = `${startTop}px`;
      particle.style.transition = `transform ${duration}s linear, opacity ${duration}s ease-out`;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${rotation}deg)`;
        particle.style.opacity = "0";
      });

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }
  }

  // ===== عصا المعلم: تنبيه بالنقر على السبورة (بدون أي إيذاء) =====
  // الكرباج: حركة تلقائية واحدة وصوت مدمج مدته ثانيتان.
  const WHIP_SOUND_DATA = "/assets/media/214eb22f4f0ee51d9958.wav";
  let whipBufferPromise = null;
  let whipCancel = null;
  let whipSequence = 0;
  function loadWhipBuffer(ctx) {
    if (!whipBufferPromise) {
      const raw = atob(WHIP_SOUND_DATA.split(",")[1]);
      const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
      whipBufferPromise = ctx.decodeAudioData(bytes.buffer).catch((err) => {
        whipBufferPromise = null;
        throw err;
      });
    }
    return whipBufferPromise;
  }
  async function triggerTeacherStick() {
    const sequence = ++whipSequence;
    if (whipCancel) whipCancel();
    let audioCtx, buffer;
    try {
      audioCtx = sfxContext();
      await audioCtx.resume();
      buffer = await loadWhipBuffer(audioCtx);
    } catch (err) {
      console.error("تعذر تشغيل صوت الكرباج", err);
      return;
    }
    if (sequence !== whipSequence) return;
    const w = boardWrapper.clientWidth,
      h = boardWrapper.clientHeight;
    if (!w || !h) return;
    const layer = document.createElement("canvas");
    layer.dataset.whipEffect = "true";
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    layer.width = Math.round(w * dpr);
    layer.height = Math.round(h * dpr);
    overlayContainer.appendChild(layer);
    const g = layer.getContext("2d");
    g.scale(dpr, dpr);
    const scale = Math.min(w / 950, h / 650, 1.25);
    const handleLength = 65 * scale;
    const count = 58;
    const rest = Math.min(w * 0.48, h * 0.7, 460) / count;
    const keys = [
      [0, 0.85, 0.55, -1.1],
      [0.6, 0.9, 0.25, -1.8],
      [0.85, 0.88, 0.28, -2.4],
      [1.05, 0.59, 0.45, -3.2],
      [1.3, 0.7, 0.58, -2.65],
      [1.65, 0.88, 0.5, -1],
      [2, 1.25, 0.55, -0.5],
    ];
    function pose(t) {
      let i = 0;
      while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
      const a = keys[i],
        b = keys[i + 1];
      const u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0])));
      const p = u * u * (3 - 2 * u);
      return {
        x: (a[1] + (b[1] - a[1]) * p) * w,
        y: (a[2] + (b[2] - a[2]) * p) * h,
        angle: a[3] + (b[3] - a[3]) * p,
      };
    }
    function anchor(hand) {
      return {
        x: hand.x + Math.cos(hand.angle) * handleLength,
        y: hand.y + Math.sin(hand.angle) * handleLength,
      };
    }
    let hand = pose(0);
    const first = anchor(hand);
    const rope = Array.from({ length: count + 1 }, (_, i) => {
      const x = first.x - i * rest * 0.8;
      const y = first.y - Math.sin((i / count) * Math.PI) * rest * count * 0.22;
      return { x, y, px: x, py: y };
    });
    function step(t) {
      hand = pose(t);
      const head = anchor(hand);
      for (let i = 1; i <= count; i++) {
        const p = rope[i];
        const vx = (p.x - p.px) * 0.989;
        const vy = (p.y - p.py) * 0.989;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.15 * scale;
      }
      for (let pass = 0; pass < 12; pass++) {
        rope[0].x = head.x;
        rope[0].y = head.y;
        for (let i = 0; i < count; i++) {
          const p = rope[i],
            q = rope[i + 1];
          const dx = q.x - p.x,
            dy = q.y - p.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const c = (dist - rest) / dist;
          if (i === 0) {
            q.x -= dx * c;
            q.y -= dy * c;
          } else {
            p.x += dx * c * 0.5;
            p.y += dy * c * 0.5;
            q.x -= dx * c * 0.5;
            q.y -= dy * c * 0.5;
          }
        }
      }
    }
    function draw(t) {
      g.clearRect(0, 0, w, h);
      g.save();
      g.globalAlpha = Math.min(1, t / 0.12, Math.max(0, (2 - t) / 0.2));
      g.lineCap = "round";
      g.lineJoin = "round";
      g.shadowColor = "#0005";
      g.shadowBlur = 4;
      g.shadowOffsetY = 3;
      for (let i = 0; i < count; i++) {
        g.lineWidth = (5.5 * (1 - i / count) + 0.65) * scale;
        g.strokeStyle = i % 4 < 2 ? "#d7a56b" : "#996036";
        g.beginPath();
        g.moveTo(rope[i].x, rope[i].y);
        g.lineTo(rope[i + 1].x, rope[i + 1].y);
        g.stroke();
      }
      g.translate(hand.x, hand.y);
      g.rotate(hand.angle);
      g.scale(scale, scale);
      const leather = g.createLinearGradient(0, -9, 0, 9);
      leather.addColorStop(0, "#aa6e40");
      leather.addColorStop(0.5, "#674129");
      leather.addColorStop(1, "#35251d");
      g.fillStyle = leather;
      g.beginPath();
      g.roundRect(-5, -9, 65, 18, 5);
      g.fill();
      g.shadowBlur = 0;
      g.shadowOffsetY = 0;
      g.save();
      g.beginPath();
      g.roundRect(-5, -9, 65, 18, 5);
      g.clip();
      g.strokeStyle = "#c08d5a";
      g.lineWidth = 1.3;
      for (let x = -15; x < 70; x += 7) {
        g.beginPath();
        g.moveTo(x, -11);
        g.lineTo(x + 12, 11);
        g.stroke();
      }
      g.restore();
      const metal = g.createLinearGradient(0, -11, 0, 11);
      metal.addColorStop(0, "#ffe6a2");
      metal.addColorStop(0.5, "#c69b51");
      metal.addColorStop(1, "#8b632d");
      g.fillStyle = metal;
      g.beginPath();
      g.roundRect(-9, -11, 11, 22, 4);
      g.fill();
      g.beginPath();
      g.roundRect(53, -10, 13, 20, 3);
      g.fill();
      g.restore();
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    const audioStart = audioCtx.currentTime + 0.03;
    let frameId = 0,
      elapsed = 0,
      finished = false;
    function cleanup() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frameId);
      try {
        source.stop();
      } catch (_) {}
      source.disconnect();
      layer.remove();
      if (whipCancel === cleanup) whipCancel = null;
    }
    whipCancel = cleanup;
    function frame() {
      if (finished) return;
      const t = Math.max(0, audioCtx.currentTime - audioStart);
      if (t >= 2 || !layer.isConnected) {
        cleanup();
        return;
      }
      while (elapsed + 1 / 120 <= t) {
        elapsed += 1 / 120;
        step(elapsed);
      }
      draw(t);
      frameId = requestAnimationFrame(frame);
    }
    source.start(audioStart, 0, Math.min(2, buffer.duration));
    frameId = requestAnimationFrame(frame);
  }

  window.boardShow = boardShow;
  Object.assign(window, {
    addStickyNote,
    changeBackground,
    closeClearModal,
    confirmClearCanvas,
    executeClearCanvas,
    exportImage,
    handleImageUpload,
    redo,
    resetZoom,
    setBrushSize,
    setColor,
    openShapeMenu,
    pickShape,
    setTool,
    toggleBoardTheme,
    triggerSadEffect,
    triggerStarEffect,
    triggerTeacherStick,
    undo,
    zoomIn,
    zoomOut,
  });
})();
