export async function HandleLoadPage(
  uri: string,
): Promise<{ response: Response; data: any }> {
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
      const data = await response.text();

      return { response: clone, data: data };
    } catch (err: any) {
      console.error(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt === maxRetries) throw err;
    }
  }
  throw new Error("Unreachable code - retries should throw");
}
