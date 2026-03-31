<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact — ORIGINS | Origin Coffee Crafter</title>
  <meta name="description" content="Get in touch with ORIGINS. Whether you're inquiring about wholesale supply, custom roasting, barista staffing, or equipment service — we respond with precision." />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;1,300&family=Barlow+Condensed:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #f4f2ef;
      --ink: #0f0f0f;
      --ink-soft: #5a5a5a;
      --ink-muted: #9a9a9a;
      --accent: #0f0f0f;
      --card-bg: #0f0f0f;
      --card-text: #f4f2ef;
      --rule: #d0cdc8;
      --hover: #1a1a1a;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'Barlow', sans-serif;
      font-weight: 300;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── BACK NAV ── */
    .back-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg);
      border-bottom: 1px solid var(--rule);
    }

    .back-link {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 400;
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--ink-soft);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s;
    }
    .back-link:hover { color: var(--ink); }
    .back-link::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 1px;
      background: currentColor;
    }

    .breadcrumb {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.12em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .breadcrumb a { color: var(--ink-muted); text-decoration: none; }
    .breadcrumb span { margin: 0 6px; }

    /* ── MAIN LAYOUT ── */
    .page-wrapper {
      padding-top: 80px;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: calc(100vh - 80px);
    }

    /* ── LEFT PANEL ── */
    .left-panel {
      padding: 80px 60px 80px 40px;
      border-right: 1px solid var(--rule);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .section-tag {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.2em;
      color: var(--ink-muted);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 40px;
    }
    .section-tag::before {
      content: '';
      display: block;
      width: 30px;
      height: 1px;
      background: var(--ink-muted);
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(64px, 8vw, 110px);
      line-height: 0.92;
      letter-spacing: 0.02em;
      color: var(--ink);
      margin-bottom: 32px;
    }

    .hero-sub {
      font-family: 'Barlow', sans-serif;
      font-size: 14px;
      font-weight: 300;
      font-style: italic;
      color: var(--ink-soft);
      line-height: 1.7;
      max-width: 340px;
      margin-bottom: 60px;
      padding-left: 16px;
      border-left: 2px solid var(--ink);
    }

    .contact-details {
      margin-top: auto;
    }

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 28px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--rule);
    }
    .detail-row:last-child { border-bottom: none; margin-bottom: 0; }

    .detail-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 10px;
      letter-spacing: 0.2em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }

    .detail-value {
      font-family: 'Barlow', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: var(--ink);
    }

    /* Dot grid decoration */
    .dot-grid {
      position: absolute;
      bottom: 80px;
      right: 40px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
    }
    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--ink-muted);
      opacity: 0.4;
    }

    /* Vertical text */
    .vertical-label {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 10px;
      letter-spacing: 0.25em;
      color: var(--ink-muted);
      text-transform: uppercase;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .vertical-label::before,
    .vertical-label::after {
      content: '';
      display: block;
      width: 20px;
      height: 1px;
      background: var(--ink-muted);
    }

    /* ── RIGHT PANEL — FORM ── */
    .right-panel {
      padding: 80px 40px 80px 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .form-header {
      margin-bottom: 48px;
    }

    .form-number {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.15em;
      color: var(--ink-muted);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .form-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
    }

    /* Form fields */
    .field-group {
      margin-bottom: 32px;
    }

    .field-label {
      display: block;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--ink-muted);
      margin-bottom: 10px;
    }

    .field-input {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--rule);
      padding: 10px 0;
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 300;
      color: var(--ink);
      outline: none;
      transition: border-color 0.25s;
      -webkit-appearance: none;
    }

    .field-input::placeholder {
      color: var(--ink-muted);
      font-style: italic;
    }

    .field-input:focus {
      border-bottom-color: var(--ink);
    }

    /* Service type selector */
    .service-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 4px;
    }

    .service-option {
      position: relative;
    }

    .service-option input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0; height: 0;
    }

    .service-label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border: 1px solid var(--rule);
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .service-label::before {
      content: '✕';
      font-size: 10px;
      color: var(--ink-muted);
      transition: color 0.2s;
      flex-shrink: 0;
    }

    .service-option input:checked + .service-label {
      background: var(--card-bg);
      color: var(--card-text);
      border-color: var(--card-bg);
    }

    .service-option input:checked + .service-label::before {
      color: var(--card-text);
    }

    .service-label:hover {
      border-color: var(--ink-soft);
      color: var(--ink);
    }

    /* Submit */
    .submit-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--rule);
    }

    .submit-note {
      font-family: 'Barlow', sans-serif;
      font-size: 12px;
      font-style: italic;
      color: var(--ink-muted);
      max-width: 200px;
      line-height: 1.5;
    }

    .submit-btn {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--card-bg);
      color: var(--card-text);
      border: none;
      padding: 16px 28px;
      cursor: pointer;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 13px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: var(--hover);
    }

    .submit-btn .arrow {
      font-size: 16px;
      transition: transform 0.2s;
    }

    .submit-btn:hover .arrow {
      transform: translateX(4px);
    }

    /* ── BOTTOM STRIP ── */
    .bottom-strip {
      grid-column: 1 / -1;
      border-top: 1px solid var(--rule);
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .strip-left {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.15em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }

    .strip-right {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--ink-muted);
    }

    /* ── SUCCESS STATE ── */
    .success-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: var(--card-bg);
      color: var(--card-text);
      z-index: 200;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px;
    }

    .success-overlay.show { display: flex; }

    .success-tag {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      letter-spacing: 0.25em;
      color: #888;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .success-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 72px;
      letter-spacing: 0.04em;
      margin-bottom: 20px;
    }

    .success-body {
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 300;
      font-style: italic;
      color: #aaa;
      max-width: 320px;
      line-height: 1.7;
      margin-bottom: 40px;
    }

    .success-back {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #fff;
      text-decoration: none;
      border-bottom: 1px solid #555;
      padding-bottom: 4px;
      cursor: pointer;
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .left-panel > * {
      animation: fadeUp 0.7s ease both;
    }
    .left-panel > *:nth-child(1) { animation-delay: 0.1s; }
    .left-panel > *:nth-child(2) { animation-delay: 0.2s; }
    .left-panel > *:nth-child(3) { animation-delay: 0.3s; }
    .left-panel > *:nth-child(4) { animation-delay: 0.4s; }

    .right-panel > * {
      animation: fadeUp 0.7s ease both;
    }
    .right-panel > *:nth-child(1) { animation-delay: 0.25s; }
    .right-panel > *:nth-child(2) { animation-delay: 0.4s; }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .left-panel {
        padding: 48px 24px;
        border-right: none;
        border-bottom: 1px solid var(--rule);
      }

      .right-panel {
        padding: 48px 24px;
      }

      .back-nav {
        padding: 16px 24px;
      }

      .hero-title {
        font-size: 72px;
      }

      .vertical-label { display: none; }

      .service-grid {
        grid-template-columns: 1fr;
      }

      .submit-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
      }

      .dot-grid { display: none; }

      .bottom-strip {
        padding: 16px 24px;
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
    }
  </style>
</head>
<body>

  <!-- Back Nav -->
  <nav class="back-nav">
    <a href="/" class="back-link">Home</a>
    <div class="breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      Contact
    </div>
  </nav>

  <!-- Vertical Side Label -->
  <div class="vertical-label">Enquiries</div>

  <!-- Main -->
  <div class="page-wrapper">
    <div class="content-grid">

      <!-- LEFT PANEL -->
      <div class="left-panel">
        <div class="section-tag">Contact</div>

        <div>
          <h1 class="hero-title">LET'S<br>TALK.</h1>
          <p class="hero-sub">
            Every serious operation starts with a conversation.
            Tell us what you need — we'll respond with precision.
          </p>
        </div>

        <div class="contact-details">
          <div class="detail-row">
            <span class="detail-label">Location</span>
            <span class="detail-value">Phnom Penh, Cambodia</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Response Time</span>
            <span class="detail-value">Within 1 business day</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Brand</span>
            <span class="detail-value">ORIGINS — Origin Coffee Crafter</span>
          </div>
        </div>

        <!-- Dot grid -->
        <div class="dot-grid">
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>

      <!-- RIGHT PANEL — FORM -->
      <div class="right-panel">
        <div class="form-header">
          <div class="form-number">01 / Enquiry Form</div>
          <div class="form-title">Send Your Enquiry</div>
        </div>

        <form id="contactForm" novalidate>

          <!-- Name -->
          <div class="field-group">
            <label class="field-label" for="name">Full Name</label>
            <input
              class="field-input"
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              autocomplete="name"
              required
            />
          </div>

          <!-- Email -->
          <div class="field-group">
            <label class="field-label" for="email">Email Address</label>
            <input
              class="field-input"
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              autocomplete="email"
              required
            />
          </div>

          <!-- Service Type -->
          <div class="field-group">
            <span class="field-label">Service Type</span>
            <div class="service-grid">
              <div class="service-option">
                <input type="radio" name="service" id="svc-wholesale" value="Wholesale" />
                <label class="service-label" for="svc-wholesale">Wholesale</label>
              </div>
              <div class="service-option">
                <input type="radio" name="service" id="svc-roasting" value="Roasting Program" />
                <label class="service-label" for="svc-roasting">Roasting Program</label>
              </div>
              <div class="service-option">
                <input type="radio" name="service" id="svc-barista" value="Barista Staffing" />
                <label class="service-label" for="svc-barista">Barista Staffing</label>
              </div>
              <div class="service-option">
                <input type="radio" name="service" id="svc-equipment" value="Equipment Service" />
                <label class="service-label" for="svc-equipment">Equipment Service</label>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="submit-row">
            <p class="submit-note">We respond within one business day.</p>
            <button type="submit" class="submit-btn">
              Send Enquiry
              <span class="arrow">→</span>
            </button>
          </div>

        </form>
      </div>

    </div>

    <!-- Bottom Strip -->
    <div class="bottom-strip">
      <span class="strip-left">ORIGINS — Origin Coffee Crafter</span>
      <span class="strip-right">Phnom Penh, Cambodia</span>
    </div>
  </div>

  <!-- Success Overlay -->
  <div class="success-overlay" id="successOverlay">
    <div class="success-tag">Enquiry Received</div>
    <div class="success-title">NOTED.</div>
    <p class="success-body">
      Your enquiry has been received.<br>
      We'll be in touch within one business day.
    </p>
    <button class="success-back" onclick="document.getElementById('successOverlay').classList.remove('show')">
      ← Return
    </button>
  </div>

  <script>
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('successOverlay').classList.add('show');
    });
  </script>

</body>
</html>
