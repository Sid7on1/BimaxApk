// Bimax: Apple-Class Product Reveal Deck Generator (10-Slide Investor & Stage System)
// Strictly follows the 2026 Apple-Class Product Reveal System (WWDC26 / Sept 2025 / Aside Master Guide)
// Narrative: Status Quo -> Frustration -> Mental Model -> Live Demo -> Architecture -> Proof -> Why Now -> Wedge -> Trust -> Vision

(async () => {
  try {
    // 1. Apple-Class Launch Palette (from Page 13 of the System Guide)
    const C = {
      deepInk: { r: 0.02, g: 0.024, b: 0.031 },       // #050608 (Hero Canvas)
      carbon: { r: 0.067, g: 0.078, b: 0.098 },      // #111419 (Raised Surface / Cards)
      graphite: { r: 0.145, g: 0.165, b: 0.192 },    // #252A31 (Dividers & Borders)
      frost: { r: 0.961, g: 0.969, b: 0.98 },        // #F5F7FA (Primary Text)
      silver: { r: 0.655, g: 0.678, b: 0.718 },      // #A7ADB7 (Secondary Supporting Text)
      slate: { r: 0.412, g: 0.443, b: 0.49 },        // #69717D (Muted Text)
      signalBlue: { r: 0.184, g: 0.49, b: 1.0 },     // #2F7DFF (Primary Active Control)
      auroraCyan: { r: 0.271, g: 0.831, b: 1.0 },    // #45D4FF (Secondary Accent)
      electricIce: { r: 0.659, g: 0.933, b: 1.0 },   // #A8EEFF (Tiny Highlight)
      mint: { r: 0.271, g: 0.851, b: 0.604 },        // #45D99A (Verified Completion / Success)
      amber: { r: 1.0, g: 0.722, b: 0.302 },         // #FFB84D (Warning / Consequential)
    };

    const solid = (rgb, a = 1) => [{ type: 'SOLID', color: rgb, opacity: a }];

    // 135° Reveal Gradient: #2F7DFF -> #45D4FF
    const revealGradient = () => [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [
        [0.7071, 0.7071, 0],
        [-0.7071, 0.7071, 0]
      ],
      gradientStops: [
        { position: 0, color: { ...C.signalBlue, a: 1 } },
        { position: 1, color: { ...C.auroraCyan, a: 1 } }
      ]
    }];

    // 2. Pre-load standard Inter fonts
    const fontRegular = { family: "Inter", style: "Regular" };
    const fontMedium = { family: "Inter", style: "Medium" };
    const fontSemiBold = { family: "Inter", style: "Semi Bold" };
    const fontBold = { family: "Inter", style: "Bold" };

    const fontReg = fontRegular;
    const fontMed = fontMedium;
    const fontSemi = fontSemiBold;

    try {
      await Promise.all([
        figma.loadFontAsync(fontRegular),
        figma.loadFontAsync(fontMedium),
        figma.loadFontAsync(fontSemiBold),
        figma.loadFontAsync(fontBold),
      ]);
    } catch (e) {
      await Promise.all([
        figma.loadFontAsync(fontRegular),
        figma.loadFontAsync(fontBold),
      ]);
    }

    // Text Helper
    function makeText(text, font, size, fill, opts = {}) {
      const t = figma.createText();
      t.fontName = font;
      t.fontSize = size;
      t.characters = text;
      t.fills = opts.gradient ? revealGradient() : solid(fill, opts.opacity || 1);
      if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' };
      if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: 'PIXELS' };
      if (opts.align) t.textAlignHorizontal = opts.align;
      return t;
    }

    // Minimal Pill Tag Helper
    function makePill(label, strokeColor, textColor, fillColor = C.carbon) {
      const f = figma.createFrame();
      f.name = `Pill-${label}`;
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      f.paddingLeft = 16;
      f.paddingRight = 16;
      f.paddingTop = 6;
      f.paddingBottom = 6;
      f.cornerRadius = 20;
      f.fills = solid(fillColor);
      f.strokes = solid(strokeColor);
      f.strokeWeight = 1;

      const txt = makeText(label, fontSemiBold, 13, textColor, { letterSpacing: 1.2 });
      f.appendChild(txt);
      return f;
    }

    // Standard Slide Generator (1920x1080) in 2 rows of 5
    function makeSlide(index, name) {
      const slide = figma.createFrame();
      slide.name = `Slide ${String(index).padStart(2, '0')} — ${name}`;
      slide.resize(1920, 1080);
      const col = (index - 1) % 5;
      const row = Math.floor((index - 1) / 5);
      slide.x = col * 2080;
      slide.y = row * 1240;
      slide.fills = solid(C.deepInk);
      slide.clipsContent = true;
      return slide;
    }

    // Standard Card Container (Archetype: Idea on Left, Evidence Card on Right)
    function makeCard(width, height, opts = {}) {
      const c = figma.createFrame();
      c.resize(width, height);
      c.layoutMode = opts.layout || 'VERTICAL';
      c.itemSpacing = opts.itemSpacing || 20;
      c.paddingTop = opts.padding || 36;
      c.paddingBottom = opts.padding || 36;
      c.paddingLeft = opts.padding || 36;
      c.paddingRight = opts.padding || 36;
      c.cornerRadius = opts.radius || 20;
      c.fills = solid(opts.bg || C.carbon);
      c.strokes = solid(opts.border || C.graphite);
      c.strokeWeight = 1.5;
      return c;
    }

    const allSlides = [];

    // ==========================================
    // SLIDE 01: IDENTITY (<10s Pitch)
    // "AI that can use your computer."
    // ==========================================
    {
      const s = makeSlide(1, "Identity");

      // Left: Idea (Hero Statement)
      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(800, 480);
      left.fills = [];

      left.appendChild(makePill("BIMAX", C.graphite, C.auroraCyan));

      const h1 = makeText("AI that can use your computer.", fontBold, 76, C.frost, { letterSpacing: -2.0, lineHeight: 86 });
      h1.resize(760, 180);
      left.appendChild(h1);

      const sub = makeText("The zero-trust autonomous engineering control plane.", fontRegular, 24, C.silver);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (Clean Device Lockup)
      const right = makeCard(760, 460, { padding: 48, itemSpacing: 24 });
      right.x = 1040;
      right.y = 310;

      right.appendChild(makeText("WHAT IT ACTUALLY DOES", fontSemiBold, 13, C.slate, { letterSpacing: 1.5 }));
      const claim = makeText("Bimax connects autonomous coding agents on your Mac to your phone with zero open ports, on-device SLM diff analysis, and biometric hardware gating.", fontMedium, 22, C.frost, { lineHeight: 34 });
      claim.resize(664, 120);
      right.appendChild(claim);

      const div = figma.createFrame();
      div.resize(664, 1);
      div.fills = solid(C.graphite);
      right.appendChild(div);

      const footRow = figma.createFrame();
      footRow.layoutMode = 'HORIZONTAL';
      footRow.itemSpacing = 32;
      footRow.fills = [];
      footRow.appendChild(makePill("0 Open Ports", C.graphite, C.mint));
      footRow.appendChild(makePill("Snapdragon NPU", C.graphite, C.auroraCyan));
      footRow.appendChild(makePill("StrongBox HSM", C.graphite, C.signalBlue));
      right.appendChild(footRow);

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 02: THE FRICTION (The Problem)
    // "AI stops where the clicks begin."
    // ==========================================
    {
      const s = makeSlide(2, "The Problem");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(800, 480);
      left.fills = [];

      left.appendChild(makePill("THE BOTTLENECK", C.graphite, C.amber));

      const h1 = makeText("AI stops where the clicks begin.", fontBold, 76, C.frost, { letterSpacing: -2.0, lineHeight: 86 });
      h1.resize(760, 180);
      left.appendChild(h1);

      const sub = makeText("Autonomous agents code at 100x. But leaving your desk means stalled prompts or catastrophic accidents.", fontRegular, 22, C.silver, { lineHeight: 32 });
      sub.resize(720, 100);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (The Broken Loop)
      const right = makeCard(760, 460, { padding: 48, itemSpacing: 24 });
      right.x = 1040;
      right.y = 310;

      right.appendChild(makeText("THE CURRENT DEVELOPER TRAP", fontSemiBold, 13, C.slate, { letterSpacing: 1.5 }));

      const steps = [
        { label: "01", text: "Agent prompts: 'Run database migration? [y/n]'" },
        { label: "02", text: "Developer steps away -> entire task stalls for hours" },
        { label: "03", text: "Or agent runs unchecked -> hallucinated deletion or leaked secret" },
        { label: "04", text: "Mobile SSH is broken: unreadable fonts, open port vulnerabilities" }
      ];

      for (const st of steps) {
        const item = figma.createFrame();
        item.layoutMode = 'HORIZONTAL';
        item.itemSpacing = 20;
        item.fills = [];
        item.appendChild(makeText(st.label, fontBold, 18, C.slate));
        const t = makeText(st.text, fontRegular, 18, C.silver);
        t.resize(580, 24);
        item.appendChild(t);
        right.appendChild(item);
      }

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 03: THE MENTAL MODEL
    // "One request. The whole workflow."
    // ==========================================
    {
      const s = makeSlide(3, "Mental Model");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(800, 480);
      left.fills = [];

      left.appendChild(makePill("THE MENTAL MODEL", C.graphite, C.auroraCyan));

      const h1 = makeText("One request. The whole workflow.", fontBold, 76, C.frost, { letterSpacing: -2.0, lineHeight: 86 });
      h1.resize(760, 180);
      left.appendChild(h1);

      const sub = makeText("You don't babysit an agent line-by-line. You set intent, inspect checkpoints, and authorize key transitions.", fontRegular, 22, C.silver, { lineHeight: 32 });
      sub.resize(720, 100);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (Before vs After)
      const right = makeCard(760, 460, { padding: 44, itemSpacing: 28 });
      right.x = 1040;
      right.y = 310;

      // Before block
      const bBlock = figma.createFrame();
      bBlock.layoutMode = 'VERTICAL';
      bBlock.itemSpacing = 8;
      bBlock.fills = [];
      bBlock.appendChild(makeText("BEFORE BIMAX", fontSemiBold, 12, C.slate, { letterSpacing: 1.5 }));
      const bText = makeText("Tethered to laptop • Stalled CLI prompts • Unmonitored risk • Open port 22", fontRegular, 17, C.slate);
      bBlock.appendChild(bText);
      right.appendChild(bBlock);

      const div = figma.createFrame();
      div.resize(672, 1);
      div.fills = solid(C.graphite);
      right.appendChild(div);

      // After block
      const aBlock = figma.createFrame();
      aBlock.layoutMode = 'VERTICAL';
      aBlock.itemSpacing = 8;
      aBlock.fills = [];
      aBlock.appendChild(makeText("WITH BIMAX", fontSemiBold, 12, C.mint, { letterSpacing: 1.5 }));
      const aText = makeText("One prompt from phone • Background execution • On-chip diff summary • Ultrasonic biometric approval", fontMedium, 18, C.frost, { lineHeight: 28 });
      aText.resize(672, 60);
      aBlock.appendChild(aText);
      right.appendChild(aBlock);

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 04: THE HERO LIVE MOMENT
    // "Watch this."
    // ==========================================
    {
      const s = makeSlide(4, "Live Demo");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 24;
      left.x = 120;
      left.y = 360;
      left.resize(760, 400);
      left.fills = [];

      left.appendChild(makePill("THE LIVE EXECUTION", C.graphite, C.signalBlue));

      const h1 = makeText("Watch this.", fontBold, 96, C.frost, { letterSpacing: -2.5 });
      left.appendChild(h1);

      const sub = makeText("A single command executed across laptop and phone in real time.", fontRegular, 22, C.silver);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (The Hero Command Box)
      const right = makeCard(820, 480, { padding: 44, itemSpacing: 24 });
      right.x = 980;
      right.y = 300;

      right.appendChild(makeText("DISPATCHED PROMPT", fontSemiBold, 12, C.auroraCyan, { letterSpacing: 2.0 }));

      const cmdBox = figma.createFrame();
      cmdBox.resize(732, 130);
      cmdBox.cornerRadius = 14;
      cmdBox.fills = solid(C.deepInk);
      cmdBox.strokes = solid(C.graphite);
      cmdBox.strokeWeight = 1;
      cmdBox.paddingLeft = 24;
      cmdBox.paddingTop = 20;

      const cmdText = makeText('"Refactor the auth middleware to scoped tokens, run tests, and ask before touching production secrets."', fontMedium, 19, C.frost, { lineHeight: 30 });
      cmdText.resize(684, 80);
      cmdBox.appendChild(cmdText);
      right.appendChild(cmdBox);

      // Status checkpoint
      const statusBox = figma.createFrame();
      statusBox.layoutMode = 'VERTICAL';
      statusBox.itemSpacing = 12;
      statusBox.fills = [];

      statusBox.appendChild(makeText("LIVE CHECKPOINT", fontSemiBold, 12, C.slate, { letterSpacing: 1.5 }));
      statusBox.appendChild(makeText("> 14 tests passing on Mac daemon", fontRegular, 16, C.mint));
      statusBox.appendChild(makeText("> High-risk action detected: rotate_keys.sh", fontSemiBold, 16, C.amber));
      statusBox.appendChild(makeText("> Awaiting StrongBox ultrasonic fingerprint on iQOO 15...", fontRegular, 16, C.auroraCyan));
      right.appendChild(statusBox);

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 05: THE ARCHITECTURE
    // "Phone + computer. One agent."
    // ==========================================
    {
      const s = makeSlide(5, "Architecture");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(760, 480);
      left.fills = [];

      left.appendChild(makePill("TOPOLOGY", C.graphite, C.auroraCyan));

      const h1 = makeText("Phone + computer. One agent.", fontBold, 76, C.frost, { letterSpacing: -2.0, lineHeight: 86 });
      h1.resize(760, 180);
      left.appendChild(h1);

      const sub = makeText("The phone handles perception, triage, and human authorization. The workstation handles heavy compilation and execution.", fontRegular, 22, C.silver, { lineHeight: 32 });
      sub.resize(720, 100);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (2-Node Connected System Diagram)
      const right = makeCard(820, 460, { padding: 40, itemSpacing: 24 });
      right.x = 980;
      right.y = 310;

      const nodesRow = figma.createFrame();
      nodesRow.layoutMode = 'HORIZONTAL';
      nodesRow.itemSpacing = 24;
      nodesRow.fills = [];

      // Node A: Phone
      const nodeA = makeCard(350, 260, { padding: 28, itemSpacing: 14, bg: C.deepInk });
      nodeA.appendChild(makePill("iQOO 15 (Phone)", C.auroraCyan, C.auroraCyan));
      nodeA.appendChild(makeText("• Snapdragon 8 Elite NPU\n• On-chip SLM diff triage\n• StrongBox EC P-256 HSM\n• CameraX 1568px WebP", fontRegular, 15, C.silver, { lineHeight: 24 }));
      nodesRow.appendChild(nodeA);

      // Node B: Laptop
      const nodeB = makeCard(350, 260, { padding: 28, itemSpacing: 14, bg: C.deepInk });
      nodeB.appendChild(makePill("Mac Workstation", C.signalBlue, C.signalBlue));
      nodeB.appendChild(makeText("• bimaxd Go daemon\n• Master POSIX PTY\n• Mach kernel vitals\n• Atomic SIGSTOP -PGID", fontRegular, 15, C.silver, { lineHeight: 24 }));
      nodesRow.appendChild(nodeB);

      right.appendChild(nodesRow);

      const linkText = makeText("Connected via Outbound-Only Cloudflare Edge Tunnel  •  Noise_IK E2EE  •  0 Open Inbound Ports", fontMedium, 14, C.mint, { letterSpacing: 0.5 });
      right.appendChild(linkText);

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 06: THE PROOF (It Works)
    // "It works."
    // ==========================================
    {
      const s = makeSlide(6, "Proof Metrics");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 340;
      left.resize(600, 400);
      left.fills = [];

      left.appendChild(makePill("VERIFIED PROOF", C.graphite, C.mint));

      const h1 = makeText("It works.", fontBold, 96, C.frost, { letterSpacing: -2.5 });
      left.appendChild(h1);

      const sub = makeText("Verified against official NIST, RFC, and Darwin kernel benchmarks.", fontRegular, 22, C.silver);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (3 Grand Metrics in Tabular Numerals)
      const right = figma.createFrame();
      right.layoutMode = 'HORIZONTAL';
      right.itemSpacing = 24;
      right.x = 800;
      right.y = 300;
      right.resize(1000, 480);
      right.fills = [];

      const metrics = [
        { num: "0 ms", title: "Process Freeze", desc: "Atomic SIGSTOP across all Mac child processes via negative PGID." },
        { num: "85%", title: "Token Savings", desc: "Spectra ISP downscales whiteboard snapshots to optimal 1568px WebP." },
        { num: "0", title: "Open Ports", desc: "Outbound-only zero-trust tunnel. Zero public attack surface." }
      ];

      for (const m of metrics) {
        const card = makeCard(310, 440, { padding: 36, itemSpacing: 18 });
        card.appendChild(makeText(m.num, fontBold, 64, C.frost, { letterSpacing: -2.0, gradient: true }));
        card.appendChild(makeText(m.title, fontBold, 22, C.frost));
        const d = makeText(m.desc, fontRegular, 16, C.silver, { lineHeight: 26 });
        d.resize(238, 120);
        card.appendChild(d);
        right.appendChild(card);
      }

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 07: WHY NOW
    // "Why now."
    // ==========================================
    {
      const s = makeSlide(7, "Timing");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(760, 480);
      left.fills = [];

      left.appendChild(makePill("THE CONVERGENCE", C.graphite, C.auroraCyan));

      const h1 = makeText("Why now.", fontBold, 88, C.frost, { letterSpacing: -2.5 });
      left.appendChild(h1);

      const sub = makeText("Three technological shifts made this possible for the first time in 2026.", fontRegular, 22, C.silver);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (3 Forces Maximum)
      const right = makeCard(820, 460, { padding: 44, itemSpacing: 24 });
      right.x = 980;
      right.y = 310;

      const forces = [
        { force: "01 · Frontier Agent Autonomy", desc: "Models like Claude Code can run complex, multi-hour engineering tasks alone." },
        { force: "02 · 3nm Mobile AI Silicon", desc: "Snapdragon 8 Elite's Oryon CPU and Hexagon NPU can run 4-bit SLMs locally on-chip." },
        { force: "03 · Hardware Enclave Security", desc: "Android StrongBox enables air-gapped cryptographic signing for critical operations." }
      ];

      for (const f of forces) {
        const item = figma.createFrame();
        item.layoutMode = 'VERTICAL';
        item.itemSpacing = 8;
        item.fills = [];
        item.appendChild(makeText(f.force, fontBold, 20, C.frost));
        const d = makeText(f.desc, fontRegular, 16, C.silver, { lineHeight: 24 });
        d.resize(732, 48);
        item.appendChild(d);
        right.appendChild(item);
      }

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 08: OUR WEDGE
    // "Our wedge."
    // ==========================================
    {
      const s = makeSlide(8, "The Wedge");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(760, 480);
      left.fills = [];

      left.appendChild(makePill("MARKET ADOPTION", C.graphite, C.signalBlue));

      const h1 = makeText("Our wedge.", fontBold, 88, C.frost, { letterSpacing: -2.5 });
      left.appendChild(h1);

      const sub = makeText("Engineers running long-horizon autonomous tasks who cannot afford stalled momentum or leaked secrets.", fontRegular, 22, C.silver, { lineHeight: 32 });
      sub.resize(700, 100);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (Urgent Workflows)
      const right = makeCard(820, 460, { padding: 44, itemSpacing: 24 });
      right.x = 980;
      right.y = 310;

      right.appendChild(makeText("HIGH-CONSEQUENCE WORKFLOWS WE SECURE", fontSemiBold, 12, C.slate, { letterSpacing: 1.5 }));

      const wedges = [
        { title: "Background Refactoring", detail: "Overnight architecture migrations running autonomously while you sleep." },
        { title: "Cloud Deployment Approvals", detail: "Authorizing infrastructure deployments with StrongBox ultrasonic biometrics." },
        { title: "Incident Remediation", detail: "Fixing broken production builds on the go from your phone without opening a laptop." }
      ];

      for (const w of wedges) {
        const row = figma.createFrame();
        row.layoutMode = 'VERTICAL';
        row.itemSpacing = 6;
        row.fills = [];
        row.appendChild(makeText(w.title, fontBold, 20, C.frost));
        row.appendChild(makeText(w.detail, fontRegular, 16, C.silver));
        right.appendChild(row);
      }

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 09: TRUST & CONTROL
    // "Designed for control."
    // ==========================================
    {
      const s = makeSlide(9, "Trust & Control");

      const left = figma.createFrame();
      left.layoutMode = 'VERTICAL';
      left.itemSpacing = 28;
      left.x = 120;
      left.y = 320;
      left.resize(760, 480);
      left.fills = [];

      left.appendChild(makePill("RESOLVING PRIVACY ANXIETY", C.graphite, C.mint));

      const h1 = makeText("Designed for control.", fontBold, 76, C.frost, { letterSpacing: -2.0, lineHeight: 86 });
      h1.resize(760, 180);
      left.appendChild(h1);

      const sub = makeText("Software is no longer allowed to approve software. You are always the final authority.", fontRegular, 22, C.silver, { lineHeight: 32 });
      sub.resize(720, 100);
      left.appendChild(sub);
      s.appendChild(left);

      // Right: Evidence (The Concrete Trust Ledger)
      const right = makeCard(820, 460, { padding: 40, itemSpacing: 22 });
      right.x = 980;
      right.y = 310;

      const ledger = [
        { q: "Where does code perception run?", a: "100% on-device via Snapdragon 8 Elite NPU; never leaves your hands." },
        { q: "How are destructive actions gated?", a: "Android StrongBox HSM requires ultrasonic fingerprint; EC P-256 signed." },
        { q: "Can an agent leak secrets?", a: "Client-side Shannon Entropy (H>=4.5) redacts keys before network transmission." },
        { q: "What if an agent goes rogue?", a: "Double-tap physical volume button: 0ms negative PGID SIGSTOP freezes all processes." }
      ];

      for (const item of ledger) {
        const box = figma.createFrame();
        box.layoutMode = 'VERTICAL';
        box.itemSpacing = 4;
        box.fills = [];
        box.appendChild(makeText(item.q, fontSemiBold, 15, C.auroraCyan));
        box.appendChild(makeText(item.a, fontRegular, 15, C.silver));
        right.appendChild(box);
      }

      s.appendChild(right);
      allSlides.push(s);
    }

    // ==========================================
    // SLIDE 10: VISION & CLOSE
    // "From assistant to operator."
    // ==========================================
    {
      const s = makeSlide(10, "Vision");

      const center = figma.createFrame();
      center.layoutMode = 'VERTICAL';
      center.counterAxisAlignItems = 'CENTER';
      center.primaryAxisAlignItems = 'CENTER';
      center.itemSpacing = 28;
      center.resize(1720, 800);
      center.x = 100;
      center.y = 140;
      center.fills = [];

      center.appendChild(makePill("BIMAX · 2026", C.graphite, C.auroraCyan));

      const h1 = makeText("From assistant to operator.", fontBold, 88, C.frost, { letterSpacing: -2.5, gradient: true });
      center.appendChild(h1);

      const sub = makeText("The future of software engineering is autonomous. You hold the controls.", fontMedium, 28, C.silver, { align: 'CENTER' });
      center.appendChild(sub);

      const spacer = figma.createFrame();
      spacer.resize(1, 20);
      spacer.fills = [];
      center.appendChild(spacer);

      const closeCard = makeCard(720, 180, { padding: 32, itemSpacing: 14, bg: C.carbon });
      closeCard.appendChild(makeText("BIMAX", fontBold, 24, C.frost));
      closeCard.appendChild(makeText("One request. The whole workflow.", fontRegular, 18, C.silver));
      closeCard.appendChild(makeText("bimax.ai  •  github.com/Sid7on1/BimaxApk", fontSemiBold, 15, C.auroraCyan));
      center.appendChild(closeCard);

      s.appendChild(center);
      allSlides.push(s);
    }

    // Finalize: Select all slides & zoom into view
    figma.currentPage.selection = allSlides;
    figma.viewport.scrollAndZoomIntoView(allSlides);
    figma.closePlugin(" Apple-Class 10-Slide Investor & Stage Deck Generated!");
  } catch (err) {
    console.error("Figma Plugin Error:", err);
    figma.notify("⚠️ Error: " + (err.message || String(err)), { error: true });
    figma.closePlugin();
  }
})();
