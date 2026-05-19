// Core types for the content-overlay system. Each ContentSection is a
// named JSON blob with a known shape; admin can edit the override which
// is stored under db key `content:<section.key>`. If no override exists,
// callers receive `defaults` (i.e. what's checked into git).

export type ContentSection<T = unknown> = {
  /** Unique stable key, e.g. "legal.privacy" or "about.page". */
  key: string;
  /** Human-friendly label shown in /admin/content. */
  label: string;
  /** Optional description for admins. */
  description?: string;
  /** Public route this section drives (for the "Preview" link). */
  previewHref?: string;
  /** Logical page grouping for the admin nav. */
  page: "legal" | "about" | "careers" | "press" | "affiliate" | "wholesale" | "app";
  /** Seed value: what's served when no override exists. */
  defaults: T;
};

/**
 * Existential wrapper so a heterogeneous list of sections can be passed
 * around without TS complaining about the generic.
 */
export type AnyContentSection = ContentSection<unknown>;
