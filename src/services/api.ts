const productsApiUrl =
  process.env.GOOGLE_PRODUCTS_API_URL ??
  "https://script.google.com/macros/s/AKfycbwV83JCBIZ6cwYK8oXSkQKf_mXkYfcCaC0UJ1Xj6Vr0CgD2WcsQhnHJRDLhrXW6qGtg/exec";
const productsApiFunction =
  process.env.GOOGLE_PRODUCTS_API_FUNCTION ?? "doGet";
const productsApiAccessToken = process.env.GOOGLE_APPS_SCRIPT_ACCESS_TOKEN;
const revalidateSeconds = 300;

export async function getProductsJson(): Promise<unknown | null> {
  if (!productsApiUrl) return null;

  const usesAppsScriptRun = productsApiUrl.includes("/v1/scripts/");
  if (usesAppsScriptRun && !productsApiAccessToken) return null;

  const response = await fetch(productsApiUrl, {
    method: usesAppsScriptRun ? "POST" : "GET",
    headers: {
      ...(usesAppsScriptRun ? { "Content-Type": "application/json" } : {}),
      ...(productsApiAccessToken
        ? { Authorization: `Bearer ${productsApiAccessToken}` }
        : {}),
    },
    body: usesAppsScriptRun
      ? JSON.stringify({ function: productsApiFunction })
      : undefined,
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`Products API responded with ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const body = await response.text();
    const preview = body.replace(/\s+/g, " ").trim().slice(0, 120);

    throw new Error(
      `Products API did not return JSON. Content-Type: ${contentType || "unknown"}. Body: ${preview}`,
    );
  }

  return response.json();
}
