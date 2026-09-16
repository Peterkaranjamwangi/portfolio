/**
 * `server-only` exists purely to make a build fail if a server module is
 * imported from client code. Under vitest there is no such boundary to
 * protect, and the real package throws on import, so it is aliased to this.
 */
export {};
