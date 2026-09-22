// Bimax & BimaxGo Figma Pitch Deck Generator
// Generates all 11 Presentation Slides (1920x1080) with AutoLayout & Dark Minimalist UI Theme

(async () => {
  // 1. Color Palette Constants (Normalized 0..1 for Figma API)
  const C = {
    bg: { r: 0.043, g: 0.059, b: 0.09 },           // #0B0F17 (Deep Obsidian)
    cardBg: { r: 0.082, g: 0.106, b: 0.157 },       // #151B28 (Dark Navy Glass)
    cardBorder: { r: 0.133, g: 0.173, b: 0.239 },   // #222C3D (Subtle Slate Border)
    green: { r: 0.0, g: 1.0, b: 0.639 },            // #00FFA3 (Accent Terminal Green)
    indigo: { r: 0.357, g: 0.408, b: 0.965 },       // #5B68F6 (Primary Action Button)
    white: { r: 1.0, g: 1.0, b: 1.0 },              // #FFFFFF
    slate400: { r: 0.58, g: 0.639, b: 0.722 },      // #94A3B8 (Body text)
    slate500: { r: 0.392, g: 0.455, b: 0.545 },     // #64748B (Muted text)
    blue: { r: 0.231, g: 0.51, b: 0.965 },          // #3B82F6 (Developer pill)
    teal: { r: 0.063, g: 0.725, b: 0.506 },         // #10B981 (Field Tester pill)
    purple: { r: 0.659, g: 0.333, b: 0.969 },       // #A855F7 (Project Lead pill)
  };

  // Helper solid fill
  const solid = (rgb, a = 1) => [{ type: 'SOLID', color: rgb, opacity: a }];

  // 2. Pre-load required fonts
  const fontRegular = { family: "Inter", style: "Regular" };
  const fontMedium = { family: "Inter", style: "Medium" };
  const fontSemiBold = { family: "Inter", style: "Semi Bold" };
  const fontBold = { family: "Inter", style: "Bold" };

  await figma.loadFontAsync(fontRegular);
  await figma.loadFontAsync(fontMedium);
  await figma.loadFontAsync(fontSemiBold);
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
    return t;
  }

  // Helper: Pill Badge
  function makePill(label, strokeColor, textColor, fillColor = C.cardBg) {
    const frame = figma.createFrame();
    frame.name = `Pill-${label}`;
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.paddingLeft = 14;
    frame.paddingRight = 14;
    frame.paddingTop = 6;
    frame.paddingBottom = 6;
    frame.cornerRadius = 20;
    frame.fills = solid(fillColor);
    frame.strokes = solid(strokeColor);
    frame.strokeWeight = 1.5;

    const txt = makeText(label, fontSemiBold, 12, textColor);
    txt.letterSpacing = { value: 1.2, unit: 'PIXELS' };
    frame.appendChild(txt);
    return frame;
  }

  // Helper: Standard Slide Frame
  function makeSlide(index, titleTag, h1Text, subtitleText) {
    const slide = figma.createFrame();
    slide.name = `Slide ${index} - ${titleTag}`;
    slide.resize(1920, 1080);
    slide.x = (index - 1) * 2120;
    slide.y = 0;
    slide.fills = solid(C.bg);
    slide.clipsContent = true;

    // Header Container (AutoLayout)
    const header = figma.createFrame();
    header.name = "Slide Header";
    header.layoutMode = 'VERTICAL';
    header.itemSpacing = 16;
    header.x = 100;
    header.y = 90;
    header.resize(1720, 180);
    header.fills = [];

    // Monospace Category Tag
    const tag = makeText(titleTag.toUpperCase(), fontSemiBold, 15, C.green);
    tag.letterSpacing = { value: 2.0, unit: 'PIXELS' };
    header.appendChild(tag);

    // H1 Headline
    const h1 = makeText(h1Text, fontBold, 52, C.white, { lineHeight: 62 });
    h1.resize(1720, h1.height);
    header.appendChild(h1);

    // Subtitle
    const sub = makeText(subtitleText, fontRegular, 21, C.slate400, { lineHeight: 32 });
    sub.resize(1500, sub.height);
    header.appendChild(sub);

    slide.appendChild(header);
    return slide;
  }

  // Helper: Card Container
  function makeCard(width, height, options = {}) {
    const card = figma.createFrame();
    card.resize(width, height);
    card.layoutMode = 'VERTICAL';
    card.itemSpacing = options.itemSpacing || 16;
    card.paddingTop = options.padding || 32;
    card.paddingBottom = options.padding || 32;
    card.paddingLeft = options.padding || 32;
    card.paddingRight = options.padding || 32;
    card.cornerRadius = options.cornerRadius || 20;
    card.fills = solid(options.bg || C.cardBg);
    card.strokes = solid(options.border || C.cardBorder);
    card.strokeWeight = 1.5;
    return card;
  }

  const allSlides = [];

  // ==========================================
  // SLIDE 1: Title & Vision
  // ==========================================
  {
    const slide = makeSlide(
      1,
      "01 — BIMAX & BIMAXGO",
      "The autonomous engineering control plane.",
      "Zero-trust, phone-first developer orchestration for the frontier AI era. Engineered for the iQOO 15 & Snapdragon 8 Elite."
    );

    // 4 Key Metrics Row
    const row = figma.createFrame();
    row.name = "Metric Row";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 24;
    row.x = 100;
    row.y = 420;
    row.resize(1720, 480);
    row.fills = [];

    const stats = [
      { title: "0 OPEN PORTS", sub: "Cloudflare Tunnel", desc: "Outbound-only zero-trust bridge. Zero public firewall attack surface." },
      { title: "ON-CHIP NPU AI", sub: "Snapdragon 8 Elite", desc: "4-bit microscaled SLMs run natively offline on Oryon cores in 0 round-trips." },
      { title: "STRONGBOX EC P-256", sub: "Ultrasonic Biometrics", desc: "Hardware HSM signs high-risk approvals with tamper-proof keystore silicon." },
      { title: "vivo OFFICE KIT", sub: "3-Column Cockpit", desc: "Dock to any display for an instant 60fps ANSI terminal and Mach vitals station." },
    ];

    for (const s of stats) {
      const card = makeCard(412, 450, { padding: 36, itemSpacing: 20 });
      card.appendChild(makePill(s.title, C.green, C.green));
      const sub = makeText(s.sub, fontBold, 26, C.white);
      card.appendChild(sub);
      const desc = makeText(s.desc, fontRegular, 17, C.slate400, { lineHeight: 26 });
      desc.resize(340, 140);
      card.appendChild(desc);
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 2: The Problem
  // ==========================================
  {
    const slide = makeSlide(
      2,
      "02 — THE PROBLEM",
      "AI agents code at 100x. Developers are trapped babysitting.",
      "When autonomous agents run long tasks, stepping away from your workstation means either stalling execution or risking catastrophic accidents."
    );

    const row = figma.createFrame();
    row.name = "Problem Cards";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 32;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 520);
    row.fills = [];

    const problems = [
      {
        badge: "01 · DESK TETHERED",
        title: "The Stalled Prompt Bottleneck",
        body: "Autonomous CLIs pause at interactive checkpoints ([y/n], migrations, sudo prompts). Stepping away grinds hours of automated momentum to a complete halt."
      },
      {
        badge: "02 · UNCHECKED AUTONOMY",
        title: "Rogue Execution & Accidents",
        body: "Without a real-time remote leash, a hallucinating agent can drop production tables, delete root directories (rm -rf), or leak keys with zero instant kill-switch."
      },
      {
        badge: "03 · BROKEN MOBILE TOOLS",
        title: "The Clunky SSH Anti-Pattern",
        body: "Opening port 22 to the public internet is a security nightmare. Mobile SSH apps have unreadable terminal fonts, zero diff comprehension, and laggy inputs."
      }
    ];

    for (const p of problems) {
      const card = makeCard(552, 480, { padding: 40, itemSpacing: 24 });
      card.appendChild(makePill(p.badge, C.cardBorder, C.slate400));
      const title = makeText(p.title, fontBold, 28, C.white);
      card.appendChild(title);
      const body = makeText(p.body, fontRegular, 18, C.slate400, { lineHeight: 28 });
      body.resize(472, 200);
      card.appendChild(body);
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 3: The Solution
  // ==========================================
  {
    const slide = makeSlide(
      3,
      "03 — THE SOLUTION",
      "Everything a dev needs, without a laptop open.",
      "A distributed control plane bridging macOS workstations with the iQOO 15 to watch, steer, and verify autonomous software development from anywhere."
    );

    // 2x2 Grid Container
    const grid = figma.createFrame();
    grid.name = "Solution Grid";
    grid.layoutMode = 'VERTICAL';
    grid.itemSpacing = 24;
    grid.x = 100;
    grid.y = 380;
    grid.resize(1720, 540);
    grid.fills = [];

    const sol = [
      [
        { badge: "STREAMING PTY", title: "Zero-Lag VT100 Terminal", desc: "Real-time 60fps ANSI terminal mirroring with zero-latency keystroke response over Cloudflare Zero Trust. No open ports, no VPNs." },
        { badge: "ON-DEVICE SLM", title: "Snapdragon 8 Elite Intelligence", desc: "Local NPU analyzes multi-thousand-line git diffs and build failures without sending raw proprietary code to the cloud." }
      ],
      [
        { badge: "STRONGBOX HSM", title: "Hardware Biometric Gate", desc: "Destructive actions (rm, drop, deploy) require physical ultrasonic fingerprint scans, signed on-chip by Android StrongBox." },
        { badge: "OFFICE KIT READY", title: "Adaptive Workstation Cockpit", desc: "Dock your phone to an external monitor via vivo Office Kit, and the app expands into a 3-column multi-agent workstation." }
      ]
    ];

    for (const r of sol) {
      const row = figma.createFrame();
      row.layoutMode = 'HORIZONTAL';
      row.itemSpacing = 24;
      row.resize(1720, 240);
      row.fills = [];
      for (const item of r) {
        const card = makeCard(848, 240, { padding: 32, itemSpacing: 14 });
        card.appendChild(makePill(item.badge, C.cardBorder, C.green));
        card.appendChild(makeText(item.title, fontBold, 22, C.white));
        const d = makeText(item.desc, fontRegular, 16, C.slate400, { lineHeight: 24 });
        d.resize(780, 80);
        card.appendChild(d);
        row.appendChild(card);
      }
      grid.appendChild(row);
    }
    slide.appendChild(grid);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 4: Bimax Integration (From Screenshot)
  // ==========================================
  {
    const slide = makeSlide(
      4,
      "04 — BIMAX INTEGRATION",
      "Your Bimax agent's remote control.",
      "Bimax runs your agentic harness on a laptop. BimaxGo puts a live window into that session on your phone — built for the SIH 2026 Bimax platform."
    );

    // Left Column: Feature Highlights
    const leftCol = figma.createFrame();
    leftCol.name = "Left Features";
    leftCol.layoutMode = 'VERTICAL';
    leftCol.itemSpacing = 36;
    leftCol.x = 100;
    leftCol.y = 400;
    leftCol.resize(800, 500);
    leftCol.fills = [];

    const feats = [
      { dot: C.green, title: "Dispatch prompts", body: "Send a new prompt into a running Bimax session straight from your phone." },
      { dot: C.blue, title: "Debug from anywhere", body: "See what's actually broken — step through stack traces and errors without opening the laptop." },
      { dot: C.slate400, title: "Bring it to the phone", body: "Mirror a session running on your laptop so you can watch, steer, or hand it off on the go." }
    ];

    for (const f of feats) {
      const row = figma.createFrame();
      row.layoutMode = 'HORIZONTAL';
      row.itemSpacing = 20;
      row.resize(760, 100);
      row.fills = [];

      // Dot
      const dot = figma.createEllipse();
      dot.resize(14, 14);
      dot.fills = solid(f.dot);
      row.appendChild(dot);

      // Text container
      const tb = figma.createFrame();
      tb.layoutMode = 'VERTICAL';
      tb.itemSpacing = 8;
      tb.resize(720, 100);
      tb.fills = [];
      tb.appendChild(makeText(f.title, fontBold, 24, C.white));
      const b = makeText(f.body, fontRegular, 17, C.slate400, { lineHeight: 26 });
      b.resize(700, 60);
      tb.appendChild(b);

      row.appendChild(tb);
      leftCol.appendChild(row);
    }
    slide.appendChild(leftCol);

    // Right Column: Realistic Phone Mockup
    const phoneMockup = figma.createFrame();
    phoneMockup.name = "Phone Mockup";
    phoneMockup.x = 1180;
    phoneMockup.y = 340;
    phoneMockup.resize(360, 640);
    phoneMockup.cornerRadius = 36;
    phoneMockup.fills = solid({ r: 0.07, g: 0.09, b: 0.13 });
    phoneMockup.strokes = solid({ r: 0.2, g: 0.25, b: 0.35 });
    phoneMockup.strokeWeight = 3;
    phoneMockup.clipsContent = true;

    // Phone Header bar / pill notch
    const notch = figma.createFrame();
    notch.resize(120, 6);
    notch.x = 120;
    notch.y = 16;
    notch.cornerRadius = 4;
    notch.fills = solid(C.slate500);
    phoneMockup.appendChild(notch);

    // Inner Session Content Container
    const phoneContent = figma.createFrame();
    phoneContent.layoutMode = 'VERTICAL';
    phoneContent.itemSpacing = 20;
    phoneContent.x = 24;
    phoneContent.y = 50;
    phoneContent.resize(312, 550);
    phoneContent.fills = [];

    // Session tags
    phoneContent.appendChild(makeText("BIMAX SESSION", fontSemiBold, 12, C.green));
    phoneContent.appendChild(makeText("refinery-inspection-v3", fontBold, 20, C.white));

    // Separator line
    const sep = figma.createLine();
    sep.resize(312, 0);
    sep.strokes = solid(C.cardBorder);
    sep.strokeWeight = 1;
    phoneContent.appendChild(sep);

    // Terminal log lines
    const logs = figma.createFrame();
    logs.layoutMode = 'VERTICAL';
    logs.itemSpacing = 12;
    logs.resize(312, 280);
    logs.fills = [];

    logs.appendChild(makeText("> parsing SOP retrieval...", fontRegular, 14, C.slate400));
    logs.appendChild(makeText("> anomaly detected: valve-04", fontSemiBold, 14, C.green));
    logs.appendChild(makeText("> awaiting review", fontRegular, 14, C.slate500));
    phoneContent.appendChild(logs);

    // Button: Dispatch new prompt
    const btn = figma.createFrame();
    btn.name = "Dispatch Button";
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.resize(312, 54);
    btn.cornerRadius = 14;
    btn.fills = solid(C.indigo);
    btn.appendChild(makeText("Dispatch new prompt", fontBold, 16, C.white));
    phoneContent.appendChild(btn);

    phoneMockup.appendChild(phoneContent);
    slide.appendChild(phoneMockup);

    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 5: On-Device Intelligence (From Screenshot)
  // ==========================================
  {
    const slide = makeSlide(
      5,
      "05 — ON-DEVICE INTELLIGENCE",
      "The model runs on the phone. Full stop.",
      "An open-source, open-weight model runs locally on the iQOO's Snapdragon NPU — no round trip to a server for most of what you do."
    );

    const grid = figma.createFrame();
    grid.name = "2x2 Intelligence Cards";
    grid.layoutMode = 'VERTICAL';
    grid.itemSpacing = 28;
    grid.x = 100;
    grid.y = 380;
    grid.resize(1720, 540);
    grid.fills = [];

    const cards = [
      [
        { badge: "SNAPDRAGON NPU", body: "Inference runs on-chip, not in the cloud — fast, and it works with patchy signal." },
        { badge: "OPEN WEIGHT MODEL", body: "No vendor lock-in. The model that reads your code is inspectable and swappable." }
      ],
      [
        { badge: "NVFP4 / MICROSCALING", body: "Built for Nvidia's newer microscaling quantization formats — smaller, faster, phone-sized." },
        { badge: "PRIVATE BY DEFAULT", body: "Code and commit data can stay on-device instead of leaving the team's hands." }
      ]
    ];

    for (const rowData of cards) {
      const row = figma.createFrame();
      row.layoutMode = 'HORIZONTAL';
      row.itemSpacing = 28;
      row.resize(1720, 240);
      row.fills = [];
      for (const c of rowData) {
        const card = makeCard(846, 240, { padding: 40, itemSpacing: 18 });
        card.appendChild(makeText(c.badge, fontSemiBold, 14, C.green));
        const body = makeText(c.body, fontRegular, 19, C.slate400, { lineHeight: 30 });
        body.resize(766, 120);
        card.appendChild(body);
        row.appendChild(card);
      }
      grid.appendChild(row);
    }
    slide.appendChild(grid);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 6: Team Visibility (From Screenshot)
  // ==========================================
  {
    const slide = makeSlide(
      6,
      "06 — TEAM VISIBILITY",
      "An overlooker for the whole project.",
      "Role-based alerts mean the right person gets paged the moment something breaks — not everyone, and not too late."
    );

    const row = figma.createFrame();
    row.name = "Roles Row";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 32;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 520);
    row.fills = [];

    const roles = [
      {
        pill: "DEVELOPER",
        color: C.blue,
        desc: "Commit errors, failed builds, and Bimax session issues that need code changes.",
        footer: "→ Push  ·  Slack DM  ·  In-app"
      },
      {
        pill: "FIELD TESTER",
        color: C.teal,
        desc: "New builds ready to test, and confirmation once a reported bug is fixed.",
        footer: "→ Push  ·  Slack DM  ·  In-app"
      },
      {
        pill: "PROJECT LEAD",
        color: C.purple,
        desc: "Daily progress rollups and a heads-up when something needs a decision.",
        footer: "→ Push  ·  Slack DM  ·  In-app"
      }
    ];

    for (const r of roles) {
      const card = makeCard(552, 480, { padding: 44, itemSpacing: 24 });
      card.appendChild(makePill(r.pill, r.color, r.color));
      const desc = makeText(r.desc, fontRegular, 20, C.slate400, { lineHeight: 32 });
      desc.resize(464, 220);
      card.appendChild(desc);

      const foot = makeText(r.footer, fontSemiBold, 15, C.green);
      foot.letterSpacing = { value: 1.2, unit: 'PIXELS' };
      card.appendChild(foot);
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 7: Testing & Bugs (From Screenshot)
  // ==========================================
  {
    const slide = makeSlide(
      7,
      "07 — TESTING & BUGS",
      "From a broken build to a shipped fix.",
      "An autonomous, closed-loop remediation pipeline that turns build failures into verified production fixes."
    );

    const row = figma.createFrame();
    row.name = "Pipeline 4 Steps";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 24;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 520);
    row.fills = [];

    const steps = [
      { num: "01", tag: "RUN", title: "Test results, in", body: "A test run finishes on any device — results land in BimaxGo automatically." },
      { num: "02", tag: "SUMMARIZE", title: "Plain-English summary", body: "BimaxGo summarizes what passed, what failed, and what changed since last time." },
      { num: "03", tag: "REPORT", title: "Bug report, drafted", body: "Failures become a structured bug report — repro steps, logs, and the likely cause." },
      { num: "04", tag: "IDEATE", title: "Fixes & features", body: "The same bot suggests fixes to try and surfaces new feature ideas from the patterns it sees." }
    ];

    for (const s of steps) {
      const card = makeCard(412, 480, { padding: 36, itemSpacing: 16 });
      const numTxt = makeText(s.num, fontBold, 44, C.slate500);
      card.appendChild(numTxt);
      const tagTxt = makeText(s.tag, fontSemiBold, 13, C.green);
      tagTxt.letterSpacing = { value: 1.5, unit: 'PIXELS' };
      card.appendChild(tagTxt);
      const title = makeText(s.title, fontBold, 24, C.white);
      card.appendChild(title);
      const body = makeText(s.body, fontRegular, 16, C.slate400, { lineHeight: 26 });
      body.resize(340, 160);
      card.appendChild(body);
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 8: Architecture (From Screenshot)
  // ==========================================
  {
    const slide = makeSlide(
      8,
      "08 — ARCHITECTURE",
      "How the pieces connect.",
      "The phone talks to Bimax and Slack over the network; heavy code reasoning stays on-device via the NPU whenever it can."
    );

    const row = figma.createFrame();
    row.name = "Topology Row";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 24;
    row.counterAxisAlignItems = 'CENTER';
    row.x = 100;
    row.y = 380;
    row.resize(1720, 480);
    row.fills = [];

    const nodes = [
      {
        header: "BimaxGo (Phone)",
        highlight: C.green,
        bullets: ["iQOO · Snapdragon NPU", "On-device model"]
      },
      {
        header: "Slack",
        highlight: C.cardBorder,
        bullets: ["Alerts, DMs,", "dev help channel"]
      },
      {
        header: "Bimax (Laptop)",
        highlight: C.indigo,
        bullets: ["Agentic harness ·", "runs your sessions"]
      },
      {
        header: "Claude Code / Agents",
        highlight: C.cardBorder,
        bullets: ["Dev environment ·", "test runners"]
      }
    ];

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const card = makeCard(370, 360, { padding: 36, itemSpacing: 18, border: n.highlight });
      const h = makeText(n.header, fontBold, 24, C.white);
      card.appendChild(h);

      for (const b of n.bullets) {
        const bt = makeText(b, fontRegular, 18, C.slate400);
        card.appendChild(bt);
      }
      row.appendChild(card);

      // Arrow between nodes
      if (i < nodes.length - 1) {
        const arrow = makeText("→", fontBold, 32, C.slate500);
        row.appendChild(arrow);
      }
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 9: Phone as a Resource
  // ==========================================
  {
    const slide = makeSlide(
      9,
      "09 — PHONE AS A RESOURCE",
      "Not just a screen. A hardware co-processor.",
      "Bimax leverages the physical sensors, security chips, and compute units of the iQOO 15 as active development tools."
    );

    const row = figma.createFrame();
    row.name = "Hardware Resource Cards";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 32;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 520);
    row.fills = [];

    const resources = [
      {
        badge: "CAMERAX TO CODE",
        title: "Token-Optimized Whiteboard Ingestion",
        desc: "Point the phone at any diagram. Spectra ISP downscales captures to Claude's optimal 1568px ceiling in WebP, cutting cloud vision tokens by 84.88%."
      },
      {
        badge: "ZERO-PERMISSION 2FA",
        title: "Hardware Biometric SMS Relay",
        desc: "When agents hit AWS or GitHub 2FA, SMS User Consent grabs the OTP with 0 dangerous permissions. Fingerprint sign-off types it into the active Mac browser."
      },
      {
        badge: "EMERGENCY PANIC FREEZE",
        title: "Atomic Process-Group Killswitch",
        desc: "Double-tap the physical volume rocker. In 0 ms, bimaxd issues a SIGSTOP -PGID, atomically freezing every child process, and locks the Mac display."
      }
    ];

    for (const r of resources) {
      const card = makeCard(552, 480, { padding: 40, itemSpacing: 22 });
      card.appendChild(makePill(r.badge, C.cardBorder, C.green));
      card.appendChild(makeText(r.title, fontBold, 26, C.white));
      const desc = makeText(r.desc, fontRegular, 18, C.slate400, { lineHeight: 28 });
      desc.resize(472, 200);
      card.appendChild(desc);
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 10: Office Kit Continuity
  // ==========================================
  {
    const slide = makeSlide(
      10,
      "10 — OFFICE KIT CONTINUITY",
      "From pocket control to 3-column workstation.",
      "Plug the iQOO 15 into an external display via vivo / iQOO Office Kit, and the app seamlessly transforms into a full desktop cockpit."
    );

    const row = figma.createFrame();
    row.name = "3 Column Workstation Cockpit";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 28;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 520);
    row.fills = [];

    const cols = [
      {
        badge: "LEFT COLUMN",
        title: "Agent Task Backlog",
        bullets: ["Active agent runs & subagents", "Diffs pending review & triage", "Instant task re-prioritization"]
      },
      {
        badge: "CENTER COLUMN",
        title: "60FPS ANSI Terminal",
        bullets: ["Zero-GC 10,000-line circular buffer", "Physical keyboard shortcuts (Ctrl+`)", "Interactive VT100 color streaming"]
      },
      {
        badge: "RIGHT COLUMN",
        title: "macOS Kernel Vitals",
        bullets: ["Live per-core CPU load", "Mach kernel RAM memory pressure", "Apple Silicon thermals & battery cycles"]
      }
    ];

    for (const c of cols) {
      const card = makeCard(554, 480, { padding: 40, itemSpacing: 20 });
      card.appendChild(makePill(c.badge, C.cardBorder, C.slate400));
      card.appendChild(makeText(c.title, fontBold, 26, C.white));
      for (const b of c.bullets) {
        const bt = makeText(`•  ${b}`, fontRegular, 17, C.slate400);
        card.appendChild(bt);
      }
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // ==========================================
  // SLIDE 11: The Conclusion & Impact
  // ==========================================
  {
    const slide = makeSlide(
      11,
      "11 — THE HORIZON",
      "The future of engineering is autonomous. You hold the controls.",
      "Bimax transforms mobile phones from passive consumption devices into active, secure command planes for AI-driven software development."
    );

    const row = figma.createFrame();
    row.name = "Impact Pillars";
    row.layoutMode = 'HORIZONTAL';
    row.itemSpacing = 32;
    row.x = 100;
    row.y = 390;
    row.resize(1720, 480);
    row.fills = [];

    const pillars = [
      { title: "FOR DEVELOPERS", bullets: ["Freedom from the desk", "Offline edge diff triage", "Instant emergency kill switch"] },
      { title: "FOR TEAMS", bullets: ["Zero-noise role-based paging", "Closed-loop bug remediation", "Seamless Slack synchronization"] },
      { title: "FOR ENTERPRISES", bullets: ["Zero-trust network perimeter", "StrongBox FIPS compliance", "Private on-chip data custody"] }
    ];

    for (const p of pillars) {
      const card = makeCard(552, 440, { padding: 40, itemSpacing: 24 });
      card.appendChild(makePill(p.title, C.green, C.green));
      for (const b of p.bullets) {
        const bt = makeText(`✔  ${b}`, fontMedium, 19, C.white);
        card.appendChild(bt);
      }
      row.appendChild(card);
    }
    slide.appendChild(row);
    allSlides.push(slide);
  }

  // Finalize in Figma: Select & zoom into view
  figma.currentPage.selection = allSlides;
  figma.viewport.scrollAndZoomIntoView(allSlides);
  figma.closePlugin("✅ 11 Bimax Presentation Slides Generated Successfully!");
})();
