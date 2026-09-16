/**
 * Stub for `next/headers`, which only resolves inside a Next request.
 *
 * The tests here exercise pure logic that never reaches a cookie; anything
 * that actually calls these needs a request-level test instead, so they throw
 * rather than returning something plausible and wrong.
 */
export function cookies(): never {
  throw new Error("cookies() is not available outside a Next.js request");
}

export function headers(): never {
  throw new Error("headers() is not available outside a Next.js request");
}
