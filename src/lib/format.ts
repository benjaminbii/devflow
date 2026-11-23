/** "Bennie Kipngetich" -> "BK". Used for avatars, which show initials instead of a photo. */

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
