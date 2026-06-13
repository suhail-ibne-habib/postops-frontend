/**
 * Authenticated API helper.
 * Wraps fetch with the Clerk session token so every request
 * to the Express backend is properly authenticated.
 *
 * Usage:
 *   const { getToken } = useAuth();          // from @clerk/nextjs
 *   const data = await apiFetch("/business", { method: "GET" }, getToken);
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * @param {string} path - API path (e.g. "/business")
 * @param {RequestInit} options - fetch options (method, body, etc.)
 * @param {() => Promise<string|null>} getToken - Clerk's getToken function
 * @returns {Promise<any>} - parsed JSON response body
 */
export async function apiFetch(path, options = {}, getToken) {
    const token = getToken ? await getToken() : null;

    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Don't set Content-Type for FormData — browser sets it with boundary
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
        const message = json?.message || `Request failed: ${response.status}`;
        throw new Error(message);
    }

    return json;
}
