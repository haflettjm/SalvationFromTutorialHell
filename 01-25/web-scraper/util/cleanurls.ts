export function normalizedUrls(raw: string[]): Set<string> {
  const clean: Set<string> = new Set(
    raw.map((url) => {
      if (!url.startsWith("https://www.")) {
        url = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
        url = `https://www.${url}`;
      }

      try {
        new URL(url);
        return url;
      } catch {
        return null;
      }
    })
      .filter((url): url is string => url != null),
  );
  return clean;
}
