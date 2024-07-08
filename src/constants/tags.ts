export const TAGS = ["AI", "Finances", "Crypto", "Startups"] as const;

export type Tags = (typeof TAGS)[number];
