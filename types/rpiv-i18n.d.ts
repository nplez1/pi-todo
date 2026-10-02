/**
 * Typecheck-only shims for the optional `@juicesharp/rpiv-i18n` peer.
 *
 * The package is not installed here — the host has no copy either, so the
 * extension's two dynamic imports (`./state/i18n-bridge.ts`,
 * `./index.ts`) reject at runtime and fall through to the English fallback.
 * These declarations exist solely so `tsc --noEmit` reports no missing-module
 * errors without pulling the optional peer into `node_modules` (installing it
 * would make the fork resolve its own copy at runtime instead of the host's,
 * which is exactly the duplicate-module situation pi warns about).
 *
 * If `@juicesharp/rpiv-i18n` is ever installed alongside this fork, this file
 * becomes type-shadowing and should be deleted.
 */

declare module "@juicesharp/rpiv-i18n" {
	export function scope(namespace: string): (key: string, fallback: string) => string;
}

declare module "@juicesharp/rpiv-i18n/loader" {
	export function registerLocalesFromDir(
		namespace: string,
		packageUrl: string,
		options?: { label?: string },
	): void;
}
