const baseURL = "https://games-test-api-81e9fb0d564a.herokuapp.com/api";

export const api = {
  getAllData: async () => {
    let response = await fetch(`${baseURL}/data`, {
      signal: AbortSignal.timeout(5000),
      headers: { "dev-email-address": "lucas@appmasters.io" }
    })
    let json = await response.json();
    return json;
  }
}