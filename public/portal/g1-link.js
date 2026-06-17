// G1 / DeepGap — portal-side link enricher (runs inside the GHL Client Portal,
// loaded alongside community-i18n.js). The GHL lesson player does NOT render
// per-contact merge fields, so the lesson just contains a STATIC link to
// https://growtify.ai/g1 . This script finds that link and appends the member's
// live Firebase ID token (from the portal's own session) + the return URL, so the
// assessment opens as the right member. growtify.ai/g1 verifies the token
// server-side against Google's keys (it cannot be forged).
(function () {
  "use strict";
  var TARGET = "growtify.ai/g1";

  function fbUser() {
    try {
      var key = Object.keys(localStorage).filter(function (k) {
        return k.indexOf("firebase:authUser:") === 0;
      })[0];
      if (!key) return null;
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (e) {
      return null;
    }
  }

  function token() {
    var u = fbUser();
    return (u && u.stsTokenManager && u.stsTokenManager.accessToken) || null;
  }

  function displayName() {
    var u = fbUser();
    return (u && u.displayName) || "";
  }

  function enrich() {
    var links = document.querySelectorAll('a[href*="' + TARGET + '"]');
    if (!links.length) return;
    var tk = token();
    if (!tk) return;
    var ret = encodeURIComponent(location.href);
    var name = encodeURIComponent(displayName());
    Array.prototype.forEach.call(links, function (a) {
      // re-enrich every pass so the token is always the freshest one in storage
      var base = a.href.split("?")[0];
      a.href =
        base +
        "?ft=" +
        encodeURIComponent(tk) +
        "&ret=" +
        ret +
        (name ? "&name=" + name : "");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  // Also refresh the href at the moment of click (captures the latest token).
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (a && a.href && a.href.indexOf(TARGET) !== -1) enrich();
    },
    true,
  );

  enrich();
  // GHL portal is a SPA — re-scan as the member navigates between lessons.
  setInterval(enrich, 1000);
  console.log("[G1] DeepGap link enricher active");
})();
