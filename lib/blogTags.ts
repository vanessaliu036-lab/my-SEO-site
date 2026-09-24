import type { BlogPost } from "@/lib/airtable"

const GENERIC_DISPLAY_TAGS = new Set([
  "fine robusta cambodia",
  "specialty robusta coffee",
  "cambodia robusta coffee",
  "cambodia coffee supplier",
  "cambodia coffee origin",
  "fine robusta",
  "cambodia robusta",
])

export function blogTagSlug(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

export function visibleTagsForPost(
  post: Pick<BlogPost, "primary_keyword" | "category" | "keywords">
): string[] {
  const primary = post.primary_keyword?.trim() || ""
  const category = post.category?.trim() || ""
  const secondary = post.keywords
    ? post.keywords.split(/[;,]/).map((value) => value.trim()).filter(Boolean)
    : []

  const candidates = [primary, category, ...secondary]
  const seen = new Set<string>()
  const result: string[] = []

  for (const tag of candidates) {
    const key = tag.toLowerCase().replace(/\s+/g, " ").trim()
    if (!key || seen.has(key)) continue

    const isPrimary =
      primary && key === primary.toLowerCase().replace(/\s+/g, " ").trim()
    const isCategory =
      category && key === category.toLowerCase().replace(/\s+/g, " ").trim()

    if (!isPrimary && !isCategory && GENERIC_DISPLAY_TAGS.has(key)) continue

    seen.add(key)
    result.push(tag)
    if (result.length >= 4) break
  }

  if (!result.length && secondary.length) return secondary.slice(0, 2)
  return result
}

export function postMatchesVisibleTag(post: BlogPost, tagSlug: string): boolean {
  return visibleTagsForPost(post).some((tag) => blogTagSlug(tag) === tagSlug)
}

export function displayNameForTag(posts: BlogPost[], tagSlug: string): string {
  for (const post of posts) {
    const match = visibleTagsForPost(post).find((tag) => blogTagSlug(tag) === tagSlug)
    if (match) return match
  }

  return tagSlug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
