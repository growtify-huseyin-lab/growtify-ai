/**
 * Simple in-memory rate limiter for serverless API routes.
 * Tracks requests by IP with a sliding window.
 *
 * Note: In serverless (Vercel), each function instance has its own memory,
 * so this is per-instance, not global. Still effective against burst abuse.
 */

const store = new Map<string, { count: number; resetAt: number }>();

// Cleanup stale entries every 60s
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key);
  }
}, 60_000);

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  ip: string,
  maxRequests = 10,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const key = ip;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { ok: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * Extract client IP from request headers (Vercel forwards via x-forwarded-for).
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
