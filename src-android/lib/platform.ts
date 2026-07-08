function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

function userAgent(): string {
  return (navigator.userAgent || "").toLowerCase();
}

export function isWeb(): boolean {
  return typeof window !== "undefined" && !("__TAURI_INTERNALS__" in window);
}

export function isLinuxDesktop(): boolean {
  if (!isTauri()) return false;
  const ua = userAgent();
  const plat = (navigator.platform || "").toLowerCase();
  if (ua.includes("android")) return false;
  if (ua.includes("windows") || ua.includes("macintosh") || ua.includes("mac os")) return false;
  return ua.includes("linux") || plat.includes("linux");
}

export function isMacDesktop(): boolean {
  if (!isTauri()) return false;
  const ua = userAgent();
  const plat = (navigator.platform || "").toLowerCase();
  return ua.includes("macintosh") || ua.includes("mac os") || plat.includes("mac");
}

export function isWindowsDesktop(): boolean {
  if (!isTauri()) return false;
  return userAgent().includes("windows");
}

export function isAndroid(): boolean {
  return navigator.userAgent.toLowerCase().includes("android");
}

export function isAndroidTV(): boolean {
  if (!isAndroid()) return false;

  const ua = userAgent();
  const platform = (navigator.platform || "").toLowerCase();
  const appVersion = (navigator.appVersion || "").toLowerCase();

  return [ua, platform, appVersion].some((value) =>
    /tv|leanback|android tv|androidtv|aft|bravia|firetv|google tv|samsungtv|tizen/.test(value),
  );
}

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  // Android TV is not a mobile device
  if (isAndroidTV()) {
    return false;
  }

  const ua = userAgent();

  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|iPad/i.test(ua)) {
    return true;
  }

  if ( /Macintosh/i.test(ua) && (navigator.maxTouchPoints ?? 0) > 1) {
    return true;
  }

  if ((navigator.maxTouchPoints ?? 0) > 0 && Math.min(window.innerWidth, window.innerHeight) < 640) {
    return true;
  }

  return false;
}