const baseURL = "https://games-test-api-81e9fb0d564a.herokuapp.com/api";

export const JogosService = {
  getJogosData: async () => {
    try {
      let response = await fetch(`${baseURL}/data`, {
        signal: AbortSignal.timeout(5000),
        headers: { "dev-email-address": "lucas@appmasters.io" }
      })
      let json = await response.json();
      return json;
    } catch (error) {
      alert("Deu erro, recarregue a página novamente!!!")
    }
  }
}