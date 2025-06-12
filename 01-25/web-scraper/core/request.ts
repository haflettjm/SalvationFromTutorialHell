import WebPage from "../util/webpage.ts";

// Handles Loading the web-page from the internet
export async function HandleLoadPage(
  uri: string,
): Promise<{ response: Response; data: WebPage }> {
  const maxRetries = 3;
  const timeoutMs = 5000;
  const fetchWithTimeout = (
    url: string,
    timeout: number,
  ): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      fetch(url, { signal: controller.signal })
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(uri, timeoutMs);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const clone = response.clone();
      const text = await response.text();
      const data = new WebPage(uri, text);

      return { response: clone, data: data };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Attempt ${attempt} failed: ${err.message}`);
      } else {
        console.error(`Attempt ${attempt} failed:`, err);
      }
      if (attempt === maxRetries) throw err;
    }
  }
  throw new Error("Unreachable code - retries should throw");
}
