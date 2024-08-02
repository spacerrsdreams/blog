export const TAGS = ["all", "ai", "finances", "crypto", "startups"] as const;

export type TagsT = (typeof TAGS)[number];
