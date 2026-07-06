// G1 / DeepGap — portal-side link enricher (runs inside the GHL Client Portal,
// loaded alongside community-i18n.js). The GHL lesson player does NOT render
// per-contact merge fields, so the lesson just contains a STATIC link to
// https://growtify.ai/g1 . This script finds that link and appends the member's
// live Firebase ID token (from the portal's own session) + the return URL, so the
// assessment opens as the right member. growtify.ai/g1 verifies the token
// server-side against Google's keys (it cannot be forged).
//
// v2 (2026-07-07): AUTO-REFRESH. Firebase ID tokens live ~1h. Previously we
// appended whatever token sat in localStorage as-is; if the portal tab had been
// idle past the token's expiry, the appended token was stale and /g1 rejected it
// ("Erişim doğrulanamadı"). Now we read stsTokenManager.expirationTime and, if the
// token is expired/near-expiry, mint a fresh one via Google's secure-token endpoint
// (using the stored refreshToken; the Firebase Web API key is parsed from the
// localStorage key name — it is public by design). Refresh is deduped + cooled-down
// so the 1s enrich loop can't storm the endpoint. On click, if the current token is
// stale we hold navigation, refresh, then open with the fresh token. If refresh is
// impossible/fails we fall back to the old token (never worse than before).
(function () {
  "use strict";
  var TARGET = "growtify.ai/g1";
  var SKEW_MS = 5 * 60 * 1000; // treat token as stale if <5 min left
  var COOLDOWN_MS = 20 * 1000; // min gap between refresh attempts (storm guard)

  var cache = { token: null, exp: 0 }; // our own freshly-minted token (not written back to the SDK)
  var inFlight = null;
  var lastAttempt = 0;

  // Locates the Firebase auth entry + parses the (public) Web API key from the
  // localStorage key name: "firebase:authUser:<apiKey>:<appName>".
  function fbEntry() {
    try {
      var key = Object.keys(localStorage).filter(function (k) {
        return k.indexOf("firebase:authUser:") === 0;
      })[0];
      if (!key) return null;
      var user = JSON.parse(localStorage.getItem(key) || "null");
      if (!user) return null;
      return { key: key, user: user, apiKey: key.split(":")[2] || "" };
    } catch (e) {
      return null;
    }
  }

  function displayName() {
    var e = fbEntry();
    return (e && e.user && e.user.displayName) || "";
  }

  function isFresh(exp) {
    return exp && Date.now() < exp - SKEW_MS;
  }

  // Best token available WITHOUT a network call: prefer our fresh cache, else the
  // raw stsTokenManager token. Returns { token, exp } or null.
  function bestLocal() {
    if (cache.token && isFresh(cache.exp)) return { token: cache.token, exp: cache.exp };
    var e = fbEntry();
    var stm = e && e.user && e.user.stsTokenManager;
    if (stm && stm.accessToken) return { token: stm.accessToken, exp: Number(stm.expirationTime) || 0 };
    return cache.token ? { token: cache.token, exp: cache.exp } : null;
  }

  // Exchanges the stored refreshToken for a fresh ID token via Google's STS.
  // Deduped (single in-flight) + cooled-down so the 1s loop can't hammer it.
  function refresh() {
    if (inFlight) return inFlight;
    var local = bestLocal();
    if (Date.now() - lastAttempt < COOLDOWN_MS) return Promise.resolve(local ? local.token : null);
    var e = fbEntry();
    var stm = e && e.user && e.user.stsTokenManager;
    var rt = stm && stm.refreshToken;
    if (!rt || !e.apiKey) return Promise.resolve(local ? local.token : null);
    lastAttempt = Date.now();
    inFlight = fetch(
      "https://securetoken.googleapis.com/v1/token?key=" + encodeURIComponent(e.apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=refresh_token&refresh_token=" + encodeURIComponent(rt),
      }
    )
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var t = j && (j.id_token || j.access_token);
        if (t) {
          cache.token = t;
          cache.exp = Date.now() + (Number(j.expires_in) || 3600) * 1000;
          return t;
        }
        var l = bestLocal();
        return l ? l.token : null;
      })
      .catch(function () {
        var l = bestLocal();
        return l ? l.token : null;
      })
      .then(function (t) { inFlight = null; return t; });
    return inFlight;
  }

  // Returns a promise of the freshest usable token (no network if still valid).
  function freshToken() {
    var local = bestLocal();
    if (local && isFresh(local.exp)) return Promise.resolve(local.token);
    return refresh();
  }

  function buildHref(base, tk) {
    var ret = encodeURIComponent(location.href);
    var name = encodeURIComponent(displayName());
    return base + "?ft=" + encodeURIComponent(tk) + "&ret=" + ret + (name ? "&name=" + name : "");
  }

  function g1Links() {
    return Array.prototype.slice.call(document.querySelectorAll('a[href*="' + TARGET + '"]'));
  }

  // Passive pass: keep hrefs populated with the freshest token (refreshes only
  // when stale, guarded). Fire-and-forget.
  function enrich() {
    var links = g1Links();
    if (!links.length) return;
    freshToken().then(function (tk) {
      if (!tk) return;
      links.forEach(function (a) {
        a.href = buildHref(a.href.split("?")[0], tk);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      });
    });
  }

  // Click: guarantee a fresh token BEFORE opening. If current token is stale, hold
  // navigation, refresh, then open the freshest URL in a new tab.
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a || !a.href || a.href.indexOf(TARGET) === -1) return;
      var base = a.href.split("?")[0];
      var local = bestLocal();
      if (local && isFresh(local.exp)) {
        // token still good — make sure href carries it, then let the click proceed
        a.href = buildHref(base, local.token);
        return;
      }
      // stale/absent → hold, refresh, open fresh
      e.preventDefault();
      e.stopPropagation();
      freshToken().then(function (tk) {
        window.open(tk ? buildHref(base, tk) : base, "_blank", "noopener");
      });
    },
    true
  );

  enrich();
  // GHL portal is a SPA — re-scan as the member navigates between lessons.
  setInterval(enrich, 1000);
  console.log("[G1] DeepGap link enricher active (v2 auto-refresh)");
})();
