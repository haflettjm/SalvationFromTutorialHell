export function normalizedUrls(raw: string[]): Set<string> {
  const clean: Set<string> = new Set<string>();
  for (const url of raw) {
    let u = url.trim();

    // Remove accidental leading dots
    u = u.replace(/^\.*/, "");

    // Remove protocol and www, if present
    u = u.replace(/^https?:\/\//, "").replace(/^www\./, "");

    // Reconstruct
    const finalUrl = `https://${u}`;

    // Validate
    try {
      new URL(finalUrl);
      clean.add(finalUrl);
    } catch {
      console.warn(`❌ Invalid URL skipped: ${finalUrl}`);
    }
  }
  return clean;
}
