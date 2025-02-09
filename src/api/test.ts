import axios from "axios";

const API_ENDPOINT = "https://67a7d9fe203008941f68a972.mockapi.io";

const testApi = axios.create({
  baseURL: API_ENDPOINT,
});

export { testApi };
