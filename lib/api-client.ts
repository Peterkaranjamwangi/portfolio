/**
 * The single HTTP client. Everything the browser sends to this app's JSON API
 * goes through `request` — services call these helpers, components call
 * services, and nothing calls `fetch` directly.
 *
 * Its job is to turn every failure — network, HTTP status, validation — into
 * one `ApiError` shape, so callers never branch on `response.ok`, `error`,
 * `details` and `message` separately.
 */

export interface ApiFieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    /** Per-field messages, ready to hand to react-hook-form's `setError`. */
    readonly fieldErrors: ApiFieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  signal?: AbortSignal;
  /** Appended as a query string; `undefined` and `null` values are dropped. */
  query?: Record<string, string | number | boolean | undefined | null>;
}

async function request<T>(
  method: Method,
  path: string,
  body?: unknown,
  { signal, query }: RequestOptions = {},
): Promise<T> {
  const url = withQuery(path, query);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    // An abort is the caller replacing this request with a newer one, not a
    // failure. Rethrowing it unchanged lets `useResource` recognise and ignore
    // it instead of painting an error the visitor never caused.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(
      "Could not reach the server. Check your connection and try again.",
      0,
    );
  }

  // 204 and friends have no body to parse.
  if (response.status === 204) {
    if (!response.ok) throw new ApiError("Request failed", response.status);
    return undefined as T;
  }

  const payload = await readJson(response);

  if (!response.ok) {
    throw new ApiError(
      typeof payload?.error === "string"
        ? payload.error
        : `Request failed (${response.status})`,
      response.status,
      normaliseFieldErrors(payload?.details),
    );
  }

  return payload as T;
}

export const apiGet = <T>(path: string, options?: RequestOptions) =>
  request<T>("GET", path, undefined, options);

export const apiPost = <T>(path: string, body?: unknown, signal?: AbortSignal) =>
  request<T>("POST", path, body, { signal });

export const apiPut = <T>(path: string, body?: unknown, signal?: AbortSignal) =>
  request<T>("PUT", path, body, { signal });

export const apiPatch = <T>(path: string, body?: unknown, signal?: AbortSignal) =>
  request<T>("PATCH", path, body, { signal });

export const apiDelete = <T>(path: string, signal?: AbortSignal) =>
  request<T>("DELETE", path, undefined, { signal });

/* ------------------------------------------------------------------ internals */

function withQuery(
  path: string,
  query?: RequestOptions["query"],
): string {
  if (!query) return path;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }

  const search = params.toString();
  return search ? `${path}?${search}` : path;
}

async function readJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    return await response.json();
  } catch {
    // A proxy or an error page can answer with HTML; treat it as an empty body
    // and let the status code carry the meaning.
    return null;
  }
}

/**
 * The API's existing routes answer validation failures with
 * `details: [{ field, message }]`. Anything else is discarded rather than
 * guessed at, so a malformed body can never be written onto a form field.
 */
export function normaliseFieldErrors(details: unknown): ApiFieldError[] {
  if (!Array.isArray(details)) return [];

  return details.flatMap((detail) => {
    if (!detail || typeof detail !== "object") return [];
    const { field, message } = detail as Record<string, unknown>;
    if (typeof field !== "string" || typeof message !== "string") return [];
    return [{ field, message }];
  });
}
