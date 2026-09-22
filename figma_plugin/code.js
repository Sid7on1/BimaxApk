// Bimax: Apple Keynote "Special Event" Presentation Generator for Figma
// 12 Monumental Keynote Slides (1920x1080) with Deep Research Content & Apple Aesthetics

(async () => {
  // Apple Palette
  const C = {
    black: { r: 0.0, g: 0.0, b: 0.0 },              // Void Black #000000
    darkCard: { r: 0.06, g: 0.06, b: 0.08 },         // Frosted Glass Dark #0F0F14
    cardBorder: { r: 0.15, g: 0.15, b: 0.2 },        // Titanium Edge #262633
    white: { r: 1.0, g: 1.0, b: 1.0 },              // Pure White #FFFFFF
    emerald: { r: 0.0, g: 1.0, b: 0.52 },            // Apple Neon Emerald #00FF85
    cyan: { r: 0.0, g: 0.94, b: 1.0 },              // Electric Cyan #00F0FF
    crimson: { r: 1.0, g: 0.23, b: 0.19 },           // Apple Warning Red #FF3B30
    indigo: { r: 0.36, g: 0.41, b: 0.96 },           // Royal Indigo #5B68F6
    slateDark: { r: 0.28, g: 0.28, b: 0.3 },         // Shadow Slate #48484A
    slateMuted: { r: 0.54, g: 0.54, b: 0.58 },       // Slate Gray #8A8A94
  };

  const solid = (rgb, a = 1) => [{ type: 'SOLID', color: rgb, opacity: a }];

  // Pre-load Figma fonts
  const fontReg = { family: "Inter", style: "Regular" };
  const fontMed = { family: "Inter", style: "Medium" };
  const fontSemi = { family: "Inter", style: "Semi Bold" };
  const fontBold = { family: "Inter", style: "Bold" };

  await figma.loadFontAsync(fontReg);
  await figma.loadFontAsync(fontMed);
  await figma.loadFontAsync(fontSemi);
  await figma.loadFontAsync(fontBold);

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

  // SLIDE 01
  {
    const s = makeSlide(1, "The Cold Open");
    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 28;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makeText("_", fontBold, 80, C.emerald));
    center.appendChild(makeText("Autonomous Agents.", fontBold, 110, C.white, { letterSpacing: -2.5 }));
    center.appendChild(makeText("Over the last two years, software engineering changed forever.", fontRegular, 26, C.slateMuted));

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 02
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

    center.appendChild(makeText("100× Faster Code.", fontBold, 120, C.white, { letterSpacing: -2.5 }));
    center.appendChild(makeText("0× Developer Freedom.", fontBold, 120, C.slateDark, { letterSpacing: -2.5 }));
    center.appendChild(makeText("We gave AI the keyboard. But we trapped the developer.", fontRegular, 28, C.slateMuted));

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 03
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

    center.appendChild(makePill("THE PARADIGM SHIFT", C.cardBorder, C.cyan));
    center.appendChild(makeText("What if your phone wasn't just a screen?", fontBold, 72, C.slateMuted, { letterSpacing: -1.5, align: 'CENTER' }));
    center.appendChild(makeText("What if it was the control plane?", fontBold, 88, C.white, { letterSpacing: -2.0, align: 'CENTER' }));

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 04
  {
    const s = makeSlide(4, "Product Reveal");
    const left = figma.createFrame();
    left.layoutMode = 'VERTICAL';
    left.itemSpacing = 24;
    left.x = 140;
    left.y = 280;
    left.resize(920, 520);
    left.fills = [];

    left.appendChild(makePill("SPECIAL EVENT 2026", C.emerald, C.emerald));
    left.appendChild(makeText("Bimax.", fontBold, 140, C.white, { letterSpacing: -3.5 }));
    left.appendChild(makeText("Desktop class. In your palm.", fontMedium, 42, C.cyan));
    const desc = makeText("A zero-trust, phone-first engineering cockpit for autonomous coding agents. Watch, steer, and verify from anywhere on earth.", fontRegular, 22, C.slateMuted, { lineHeight: 34 });
    desc.resize(820, 110);
    left.appendChild(desc);
    s.appendChild(left);

    // Realistic Phone Frame
    const phone = figma.createFrame();
    phone.name = "iQOO 15 Frame";
    phone.x = 1260;
    phone.y = 180;
    phone.resize(400, 720);
    phone.cornerRadius = 48;
    phone.fills = solid(C.darkCard);
    phone.strokes = solid(C.emerald, 0.7);
    phone.strokeWeight = 3;
    phone.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 1, b: 0.52, a: 0.3 },
      offset: { x: 0, y: 0 },
      radius: 60,
      spread: 10,
      visible: true,
      blendMode: 'NORMAL'
    }];
    phone.clipsContent = true;

    const island = figma.createFrame();
    island.resize(130, 8);
    island.x = 135;
    island.y = 20;
    island.cornerRadius = 4;
    island.fills = solid(C.slateDark);
    phone.appendChild(island);

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

    const logs = figma.createFrame();
    logs.layoutMode = 'VERTICAL';
    logs.itemSpacing = 16;
    logs.resize(336, 320);
    logs.fills = [];
    logs.appendChild(makeText("> parsing SOP retrieval...", fontRegular, 15, C.slateMuted));
    logs.appendChild(makeText("> anomaly detected: valve-04", fontSemi, 15, C.emerald));
    logs.appendChild(makeText("> awaiting review", fontRegular, 15, C.slateDark));
    term.appendChild(logs);

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

  // SLIDE 05
  {
    const s = makeSlide(5, "Zero-Trust Ingress");
    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 20;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makeText("0", fontBold, 240, C.emerald, { letterSpacing: -6.0 }));
    center.appendChild(makeText("OPEN PORTS.", fontBold, 64, C.white, { letterSpacing: 4.0 }));
    center.appendChild(makeText("Zero Trust. Zero Inbound Attack Surface. Zero VPN Latency.", fontMedium, 26, C.cyan));
    center.appendChild(makeText("Encrypted Noise_IK handshake over Cloudflare Zero Trust. It simply connects.", fontRegular, 20, C.slateMuted));

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 06
  {
    const s = makeSlide(6, "Snapdragon 8 Elite");
    const center = figma.createFrame();
    center.layoutMode = 'VERTICAL';
    center.counterAxisAlignItems = 'CENTER';
    center.primaryAxisAlignItems = 'CENTER';
    center.itemSpacing = 32;
    center.resize(1720, 900);
    center.x = 100;
    center.y = 90;
    center.fills = [];

    center.appendChild(makePill("HETEROGENEOUS NEURAL COMPUTE", C.cyan, C.cyan));
    center.appendChild(makeText("The model runs on the silicon. Full stop.", fontBold, 76, C.white, { letterSpacing: -2.0, align: 'CENTER' }));
    center.appendChild(makeText("No round trip to a third-party server. Code and commit data never leave your hands.", fontRegular, 24, C.slateMuted, { align: 'CENTER' }));

    const chip = figma.createFrame();
    chip.layoutMode = 'HORIZONTAL';
    chip.itemSpacing = 40;
    chip.counterAxisAlignItems = 'CENTER';
    chip.paddingLeft = 56;
    chip.paddingRight = 56;
    chip.paddingTop = 32;
    chip.paddingBottom = 32;
    chip.cornerRadius = 24;
    chip.fills = solid(C.darkCard);
    chip.strokes = solid(C.cyan, 0.6);
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
      box.appendChild(makeText(sp.top, fontBold, 24, C.white));
      box.appendChild(makeText(sp.btm, fontRegular, 17, C.emerald));
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

  // SLIDE 07
  {
    const s = makeSlide(7, "Closed-Loop Remediation");
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
    center.appendChild(makeText("From broken build to shipped fix.", fontBold, 80, C.white, { letterSpacing: -2.0 }));

    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 28;
    row.fills = [];

    const steps = [
      { num: "01", tag: "RUN", desc: "Test results ingested automatically" },
      { num: "02", tag: "SUMMARIZE", desc: "Plain-English failure analysis" },
      { num: "03", tag: "REPORT", desc: "Auto-drafted repro bug report" },
      { num: "04", tag: "IDEATE", desc: "Actionable fix dispatched" },
    ];

    for (const st of steps) {
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

  // SLIDE 08
  {
    const s = makeSlide(8, "Biometric Gate");
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
    center.appendChild(makeText("Signed in silicon.", fontBold, 96, C.white, { letterSpacing: -2.5 }));
    center.appendChild(makeText("Your ultrasonic fingerprint is the final firewall.", fontMedium, 36, C.cyan));
    const desc = makeText("Software is no longer allowed to approve software. Destructive actions require physical hardware biometric signatures.", fontRegular, 22, C.slateMuted, { align: 'CENTER', lineHeight: 32 });
    desc.resize(1100, 70);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 09
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
    center.appendChild(makeText("85%", fontBold, 190, C.emerald, { letterSpacing: -4.0 }));
    center.appendChild(makeText("Less Vision Tokens. Infinite Context.", fontBold, 48, C.white));
    const desc = makeText("Spectra ISP downscales whiteboard snapshots to Claude's optimal 1568px ceiling in WebP. Whiteboard to working code in seconds.", fontRegular, 22, C.slateMuted, { align: 'CENTER' });
    desc.resize(1100, 60);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 10
  {
    const s = makeSlide(10, "Office Kit Continuity");
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
    center.appendChild(makeText("Pocket remote. Workstation cockpit.", fontBold, 76, C.white, { letterSpacing: -2.0 }));

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

  // SLIDE 11
  {
    const s = makeSlide(11, "One More Thing");
    s.strokes = solid(C.crimson, 0.85);
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

    center.appendChild(makeText("One more thing.", fontBold, 96, C.crimson, { letterSpacing: -2.0 }));
    center.appendChild(makeText("0 ms to freeze.", fontBold, 120, C.white, { letterSpacing: -2.5 }));
    const desc = makeText("Double-tap the physical volume rocker. Instant negative PGID SIGSTOP. Rogue processes frozen. Mac screen locked.", fontMedium, 24, C.slateMuted, { align: 'CENTER' });
    desc.resize(1100, 60);
    center.appendChild(desc);

    s.appendChild(center);
    allSlides.push(s);
  }

  // SLIDE 12
  {
    const s = makeSlide(12, "Grand Finale");
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
    center.appendChild(makeText("Bimax.", fontBold, 150, C.white, { letterSpacing: -4.0 }));
    center.appendChild(makeText("The control plane for autonomous engineers.", fontMedium, 36, C.cyan));
    center.appendChild(makeText("Zero Trust  •  Snapdragon 8 Elite  •  Hardware Biometrics", fontSemi, 18, C.slateMuted, { letterSpacing: 2.0 }));

    s.appendChild(center);
    allSlides.push(s);
  }

  // Select all slides & zoom into view
  figma.currentPage.selection = allSlides;
  figma.viewport.scrollAndZoomIntoView(allSlides);
  figma.closePlugin(" Apple Keynote Edition Generated Successfully!");
})();
