(function () {
  "use strict";

  const cfg = window.CSC_ADSENSE || {};
  const body = document.body;
  const adBoxes = Array.from(document.querySelectorAll(".js-ad-slot"));
  const localHosts = new Set(["", "localhost", "127.0.0.1", "::1"]);
  const isLocalPreview = location.protocol === "file:" || localHosts.has(location.hostname);
  const adsDisabledForPage = body && body.dataset.adsDisabled === "true";
  const validPublisher = /^ca-pub-\d{16}$/.test(String(cfg.publisherId || ""));

  function showPreview(message) {
    adBoxes.forEach(function (box) {
      box.classList.add("is-preview");
      const frame = box.querySelector(".ad-unit-frame");
      if (frame) {
        frame.innerHTML = "<span class=\"ad-preview-icon\">AD</span><strong>Responsive AdSense slot</strong><small>" +
          (message || "Approval के बाद यहाँ Google ad दिखाई देगा।") + "</small>";
      }
    });
  }

  function hideAll() {
    adBoxes.forEach(function (box) {
      box.classList.remove("is-preview", "is-active");
    });
  }

  if (adsDisabledForPage) {
    hideAll();
    return;
  }

  if (!cfg.enabled || !validPublisher) {
    if (cfg.previewOnLocalhost && isLocalPreview) {
      showPreview(validPublisher ? "AdSense अभी disabled है।" : "Publisher ID configure करने के बाद live ads शुरू होंगे।");
    } else {
      hideAll();
    }
    if (cfg.enabled && !validPublisher) {
      console.warn("AdSense is enabled, but publisherId is missing or invalid.");
    }
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cfg.publisherId);
  script.dataset.adClient = cfg.publisherId;
  document.head.appendChild(script);

  adBoxes.forEach(function (box) {
    const key = box.dataset.slotKey || "";
    const slotId = cfg.slots && cfg.slots[key] ? String(cfg.slots[key]).trim() : "";
    if (!/^\d+$/.test(slotId)) {
      if (cfg.previewOnLocalhost && isLocalPreview) {
        box.classList.add("is-preview");
        const frame = box.querySelector(".ad-unit-frame");
        if (frame) frame.innerHTML = "<span class=\"ad-preview-icon\">AD</span><strong>Slot ID missing</strong><small>Config file में " + key + " का Ad Unit ID डालें।</small>";
      }
      return;
    }

    const frame = box.querySelector(".ad-unit-frame");
    if (!frame) return;
    frame.textContent = "";
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.dataset.adClient = cfg.publisherId;
    ins.dataset.adSlot = slotId;
    ins.dataset.adFormat = "auto";
    ins.dataset.fullWidthResponsive = "true";
    frame.appendChild(ins);
    box.classList.add("is-active");
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  });
})();
