// Bimax: Apple Keynote "Special Event" Presentation Generator for Figma
// Generates all 12 Cinematic Slides (1920x1080) with Monumental Typography, Apple Black, and Lighting Effects

(async () => {
  // 1. Apple Keynote Palette
  const C = {
    black: { r: 0.0, g: 0.0, b: 0.0 },               // Pure Void Black #000000
    darkCard: { r: 0.07, g: 0.07, b: 0.09 },          // Frosted Glass Dark #121217
    cardBorder: { r: 0.16, g: 0.16, b: 0.2 },         // Titanium Edge #292933
    white: { r: 1.0, g: 1.0, b: 1.0 },               // Pure White #FFFFFF
    offWhite: { r: 0.94, g: 0.94, b: 0.96 },          // #F0F0F5
    emerald: { r: 0.0, g: 1.0, b: 0.52 },             // Apple Neon Emerald #00FF85
    cyan: { r: 0.0, g: 0.94, b: 1.0 },               // Electric Cyan #00F0FF
    crimson: { r: 1.0, g: 0.23, b: 0.19 },            // Apple Warning Red #FF3B30
    indigo: { r: 0.36, g: 0.41, b: 0.96 },            // Royal Indigo #5B68F6
    slateDark: { r: 0.28, g: 0.28, b: 0.3 },          // Shadow Slate #48484A
    slateMuted: { r: 0.54, g: 0.54, b: 0.58 },        // Slate Gray #8A8A94
  };

  const solid = (rgb, a = 1) => [{ type: 'SOLID', color: rgb, opacity: a }];

  // 2. Pre-load standard Figma fonts
  const fontReg = { family: "Inter", style: "Regular" };
  const fontMed = { family: "Inter", style: "Medium" };
  const fontSemi = { family: "Inter", style: "Semi Bold" };
  const fontBold = { family: "Inter", style: "Bold" };

  await figma.loadFontAsync(fontReg);
  await figma.loadFontAsync(fontMed);
  await figma.loadFontAsync(fontSemi);
  await figma.loadFontAsync(fontBold);

  // Helper: Text Node
  function makeText(text, font, size, fill, opts = {}) {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    t.characters = text;
    t.fills = solid(fill, opts.opacity || 1);
    if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' };
    if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: 'PIXELS' };
    if (opts.align) t.textAlignHorizontal = opts.align;
    return t;
  }

  // Helper: Pill Badge
  function makePill(label, strokeColor, textColor, fillColor = C.darkCard) {
    const f = figma.createFrame();
    f.name = `Pill-${label}`;
    f.layoutMode = 'HORIZONTAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    f.paddingLeft = 20;
    f.paddingRight = 20;
    f.paddingTop = 8;
    f.paddingBottom = 8;
    f.cornerRadius = 24;
    f.fills = solid(fillColor);
    f.strokes = solid(strokeColor);
    f.strokeWeight = 1.5;

    const txt = makeText(label, fontSemi, 14, textColor, { letterSpacing: 1.5 });
    f.appendChild(txt);
    return f;
  }

  // Helper: Slide Canvas (Grid Layout: 4 columns x 3 rows)
  function makeSlide(index, name) {
    const slide = figma.createFrame();
    slide.name = `Slide ${String(index).padStart(2, '0')} — ${name}`;
    slide.resize(1920, 1080);
    const col = (index - 1) % 4;
    const row = Math.floor((index - 1) / 4);
    slide.x = col * 2120;
    slide.y = row * 1280;
    slide.fills = solid(C.black);
    slide.clipsContent = true;
    return slide;
  }

  const allSlides = [];

  // ==========================================
  // SLIDE 01: The Cold Open (Autonomous Agents)
  // ==========================================
  {
    const s = makeSlide(1, "The Cold Open");

    // Center Vertical Container
    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 28;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    // Glowing Cursor
    const cursor = makeText("_", fontBold, 72, C.emerald);
    center.appendChild(cursor);

    // Monumental Title
    const h1 = makeText("Autonomous Agents.", fontBold, 110, C.white, { letterSpacing: -2.0 });
    center.appendChild(h1);

    // Subtitle
    const sub = makeText("Over the last two years, software engineering changed forever.", fontRegular, 26, C.slateMuted);
    center.appendChild(sub);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 02: The Tension (100x vs 0x)
  // ==========================================
  {
    const s = makeSlide(2, "The Tension");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 32;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    // Monumental Contrast
    const line1 = makeText("100× Faster Code.", fontBold, 120, C.white, { letterSpacing: -2.5 });
    center.appendChild(line1);

    const line2 = makeText("0× Developer Freedom.", fontBold, 120, C.slateDark, { letterSpacing: -2.5 });
    center.appendChild(line2);

    const punch = makeText("We gave AI the keyboard. But we trapped the developer.", fontRegular, 28, C.slateMuted);
    center.appendChild(punch);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 03: The Provocation
  // ==========================================
  {
    const s = makeSlide(3, "The Provocation");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 36;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("THE QUESTION", C.cardBorder, C.cyan));

    const q1 = makeText("What if your phone wasn't just a screen?", fontBold, 72, C.slateMuted, { letterSpacing: -1.5, align: 'CENTER' });
    center.appendChild(q1);

    const q2 = makeText("What if it was the control plane?", fontBold, 88, C.white, { letterSpacing: -2.0, align: 'CENTER' });
    center.appendChild(q2);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 04: The Reveal (Bimax Hero)
  // ==========================================
  {
    const s = makeSlide(4, "Product Reveal");

    // Left Hero Typography
    const left = figma.createFrame();
    left.layoutMode = 'VERTICAL';
    left.itemSpacing = 24;
    left.x = 140;
    left.y = 300;
    left.resize(900, 500);
    left.fills = [];

    left.appendChild(makePill("SPECIAL EVENT 2026", C.emerald, C.emerald));

    const brand = makeText("Bimax.", fontBold, 130, C.white, { letterSpacing: -3.0 });
    left.appendChild(brand);

    const tag = makeText("Desktop class. In your palm.", fontMedium, 40, C.cyan);
    left.appendChild(tag);

    const desc = makeText("A zero-trust, phone-first engineering cockpit for autonomous coding agents. Watch, steer, and verify from anywhere on earth.", fontRegular, 22, C.slateMuted, { lineHeight: 34 });
    desc.resize(800, 100);
    left.appendChild(desc);

    s.appendChild(left);

    // Right Realistic Phone Frame
    const phone = figma.createFrame();
    phone.name = "iQOO 15 Frame";
    phone.x = 1260;
    phone.y = 180;
    phone.resize(400, 720);
    phone.cornerRadius = 48;
    phone.fills = solid(C.darkCard);
    phone.strokes = solid(C.emerald, 0.6);
    phone.strokeWeight = 3;
    phone.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 1, b: 0.52, a: 0.25 },
      offset: { x: 0, y: 0 },
      radius: 60,
      spread: 10,
      visible: true,
      blendMode: 'NORMAL'
    }];
    phone.clipsContent = true;

    // Island
    const island = figma.createFrame();
    island.resize(130, 8);
    island.x = 135;
    island.y = 20;
    island.cornerRadius = 4;
    island.fills = solid(C.slateDark);
    phone.appendChild(island);

    // Terminal Container
    const term = figma.createFrame();
    term.layoutMode = 'VERTICAL';
    term.itemSpacing = 20;
    term.x = 32;
    term.y = 60;
    term.resize(336, 620);
    term.fills = [];

    term.appendChild(makeText("BIMAX SESSION", fontSemi, 13, C.emerald, { letterSpacing: 2.0 }));
    term.appendChild(makeText("refinery-inspection-v3", fontBold, 22, C.white));

    const line = figma.createLine();
    line.resize(336, 0);
    line.strokes = solid(C.cardBorder);
    line.strokeWeight = 1;
    term.appendChild(line);

    // Log Lines
    const logs = figma.createFrame();
    logs.layoutMode = 'VERTICAL';
    logs.itemSpacing = 16;
    logs.resize(336, 320);
    logs.fills = [];
    logs.appendChild(makeText("> parsing SOP retrieval...", fontRegular, 15, C.slateMuted));
    logs.appendChild(makeText("> anomaly detected: valve-04", fontSemi, 15, C.emerald));
    logs.appendChild(makeText("> awaiting review", fontRegular, 15, C.slateDark));
    term.appendChild(logs);

    // Button
    const btn = figma.createFrame();
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.resize(336, 60);
    btn.cornerRadius = 16;
    btn.fills = solid(C.indigo);
    btn.appendChild(makeText("Dispatch new prompt", fontBold, 17, C.white));
    term.appendChild(btn);

    phone.appendChild(term);
    s.appendChild(phone);

    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 05: The Architecture (0 Open Ports)
  // ==========================================
  {
    const s = makeSlide(5, "The Zero-Trust Architecture");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 20;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    // Giant 0
    const zero = makeText("0", fontBold, 220, C.emerald, { letterSpacing: -5.0 });
    center.appendChild(zero);

    const title = makeText("OPEN PORTS.", fontBold, 60, C.white, { letterSpacing: 4.0 });
    center.appendChild(title);

    const sub = makeText("Zero Trust. Zero Inbound Attack Surface. Zero VPN Latency.", fontMedium, 26, C.cyan);
    center.appendChild(sub);

    const desc = makeText("Encrypted Noise_IK handshake over Cloudflare Zero Trust. It simply connects.", fontRegular, 20, C.slateMuted);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 06: Silicon (Snapdragon 8 Elite)
  // ==========================================
  {
    const s = makeSlide(6, "The Silicon Engine");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 28;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("HETEROGENEOUS NEURAL COMPUTE", C.cyan, C.cyan));

    const h = makeText("The model runs on the silicon. Full stop.", fontBold, 76, C.white, { letterSpacing: -2.0, align: 'CENTER' });
    center.appendChild(h);

    const p = makeText("No round trip to a third-party server. Code and commit data never leave your hands.", fontRegular, 24, C.slateMuted, { align: 'CENTER' });
    center.appendChild(p);

    // Silicon Chip Mockup Frame
    const chip = figma.createFrame();
    chip.layoutMode = 'HORIZONTAL';
    chip.itemSpacing = 36;
    chip.counterAxisAlignItems = 'CENTER';
    chip.paddingLeft = 48;
    chip.paddingRight = 48;
    chip.paddingTop = 28;
    chip.paddingBottom = 28;
    chip.cornerRadius = 24;
    chip.fills = solid(C.darkCard);
    chip.strokes = solid(C.cyan, 0.5);
    chip.strokeWeight = 2;

    const specs = [
      { top: "Snapdragon 8 Elite", btm: "4.6 GHz Oryon Cores" },
      { top: "NVFP4 / MXFP4", btm: "Microscaled 4-Bit Weights" },
      { top: "Hexagon NPU", btm: "Sub-300ms Diff Triage" }
    ];

    for (let i = 0; i < specs.length; i++) {
      const sp = specs[i];
      const box = figma.createFrame();
      box.layoutMode = 'VERTICAL';
      box.itemSpacing = 6;
      box.fills = [];
      box.appendChild(makeText(sp.top, fontBold, 22, C.white));
      box.appendChild(makeText(sp.btm, fontRegular, 16, C.emerald));
      chip.appendChild(box);
      if (i < specs.length - 1) {
        const div = figma.createFrame();
        div.resize(1, 48);
        div.fills = solid(C.cardBorder);
        chip.appendChild(div);
      }
    }
    center.appendChild(chip);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 07: The Autonomous Loop (4 Discs)
  // ==========================================
  {
    const s = makeSlide(7, "The Closed-Loop Pipeline");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 48;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("AUTONOMOUS SELF-HEALING", C.emerald, C.emerald));

    const h = makeText("From broken build to shipped fix.", fontBold, 76, C.white, { letterSpacing: -2.0 });
    center.appendChild(h);

    // 4 Frosted Cards Row
    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 28;
    row.fills = [];

    const steps = [
      { num: "01", tag: "RUN", desc: "Test results ingested instantly" },
      { num: "02", tag: "SUMMARIZE", desc: "Plain-English failure analysis" },
      { num: "03", tag: "REPORT", desc: "Auto-drafted repro bug report" },
      { num: "04", tag: "IDEATE", desc: "Actionable fix dispatched" },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const card = figma.createFrame();
      card.layoutMode = 'VERTICAL';
      card.itemSpacing = 16;
      card.resize(340, 240);
      card.paddingLeft = 32;
      card.paddingTop = 32;
      card.cornerRadius = 24;
      card.fills = solid(C.darkCard);
      card.strokes = solid(C.cardBorder);
      card.strokeWeight = 1.5;

      card.appendChild(makeText(st.num, fontBold, 44, C.slateDark));
      card.appendChild(makeText(st.tag, fontSemi, 14, C.emerald, { letterSpacing: 2.0 }));
      const d = makeText(st.desc, fontRegular, 16, C.white, { lineHeight: 24 });
      d.resize(276, 60);
      card.appendChild(d);
      row.appendChild(card);
    }
    center.appendChild(row);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 08: Biometric Hardware Gate
  // ==========================================
  {
    const s = makeSlide(8, "Biometric Hardware Gate");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 28;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("ANDROID STRONGBOX HSM · EC P-256", C.cyan, C.cyan));

    const h = makeText("Signed in silicon.", fontBold, 90, C.white, { letterSpacing: -2.5 });
    center.appendChild(h);

    const sub = makeText("Your ultrasonic fingerprint is the final firewall.", fontMedium, 36, C.cyan);
    center.appendChild(sub);

    const desc = makeText("Software is no longer allowed to approve software. Destructive actions require physical hardware biometric signatures.", fontRegular, 22, C.slateMuted, { align: 'CENTER', lineHeight: 32 });
    desc.resize(1100, 70);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 09: Phone as a Resource (85%)
  // ==========================================
  {
    const s = makeSlide(9, "Multimodal Economics");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 20;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("CAMERAX TO ANTHROPIC VISION", C.emerald, C.emerald));

    // Giant 85%
    const num = makeText("85%", fontBold, 180, C.emerald, { letterSpacing: -4.0 });
    center.appendChild(num);

    const h = makeText("Less Vision Tokens. Infinite Context.", fontBold, 48, C.white);
    center.appendChild(h);

    const desc = makeText("Spectra ISP downscales whiteboard snapshots to Claude's optimal 1568px ceiling in WebP. Whiteboard to working code in seconds.", fontRegular, 22, C.slateMuted, { align: 'CENTER' });
    desc.resize(1100, 60);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 10: Office Kit Continuity
  // ==========================================
  {
    const s = makeSlide(10, "Desktop Continuity");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 36;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("vivo / iQOO OFFICE KIT", C.indigo, C.indigo));

    const h = makeText("Pocket remote. Workstation cockpit.", fontBold, 76, C.white, { letterSpacing: -2.0 });
    center.appendChild(h);

    // 3 Column Station
    const cols = figma.createFrame();
    cols.layoutMode = 'HORIZONTAL';
    cols.itemSpacing = 32;
    cols.fills = [];

    const cdata = [
      { top: "LEFT COLUMN", mid: "Agent Task Backlog", btm: "Active subagents & diff queue" },
      { top: "CENTER COLUMN", mid: "60FPS ANSI Terminal", btm: "Zero-GC 10,000-line circular buffer" },
      { top: "RIGHT COLUMN", mid: "macOS Kernel Vitals", btm: "Live per-core CPU & Mach RAM" }
    ];

    for (const cd of cdata) {
      const card = figma.createFrame();
      card.layoutMode = 'VERTICAL';
      card.itemSpacing = 14;
      card.resize(480, 220);
      card.paddingLeft = 36;
      card.paddingTop = 32;
      card.cornerRadius = 24;
      card.fills = solid(C.darkCard);
      card.strokes = solid(C.cardBorder);
      card.strokeWeight = 1.5;

      card.appendChild(makeText(cd.top, fontSemi, 13, C.cyan, { letterSpacing: 2.0 }));
      card.appendChild(makeText(cd.mid, fontBold, 24, C.white));
      card.appendChild(makeText(cd.btm, fontRegular, 16, C.slateMuted));
      cols.appendChild(card);
    }
    center.appendChild(cols);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 11: One More Thing... (0 ms Freeze)
  // ==========================================
  {
    const s = makeSlide(11, "One More Thing");

    // Crimson Glow Border on Slide
    s.strokes = solid(C.crimson, 0.8);
    s.strokeWeight = 4;

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 24;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    const oneMore = makeText("One more thing.", fontBold, 90, C.crimson, { letterSpacing: -2.0 });
    center.appendChild(oneMore);

    const zeroMs = makeText("0 ms to freeze.", fontBold, 110, C.white, { letterSpacing: -2.5 });
    center.appendChild(zeroMs);

    const desc = makeText("Double-tap the physical volume rocker. Instant negative PGID SIGSTOP. Rogue processes frozen. Mac screen locked.", fontMedium, 24, C.slateMuted, { align: 'CENTER' });
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // ==========================================
  // SLIDE 12: Grand Finale
  // ==========================================
  {
    const s = makeSlide(12, "The Grand Finale");

    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 36;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("BUILT FOR iQOO 15 · 2026", C.emerald, C.emerald));

    const brand = makeText("Bimax.", fontBold, 150, C.white, { letterSpacing: -4.0 });
    center.appendChild(brand);

    const line = makeText("The control plane for autonomous engineers.", fontMedium, 36, C.cyan);
    center.appendChild(line);

    const sub = makeText("Zero Trust  •  Snapdragon 8 Elite  •  Hardware Biometrics", fontSemi, 18, C.slateMuted, { letterSpacing: 2.0 });
    center.appendChild(sub);

    s.appendChild(center);
    allSlides.push(s);
  }

  // Select all slides & zoom into view
  figma.currentPage.selection = allSlides;
  figma.viewport.scrollAndZoomIntoView(allSlides);
  figma.closePlugin(" Apple Keynote Edition: 12 Cinematic Slides Generated!");
})();
