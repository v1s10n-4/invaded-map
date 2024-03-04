export const FlashInvaderBaseUrl = "https://space-invaders.com";

export const requestInit: RequestInit = {
  headers: {
    "sec-ch-ua": '"Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
  },
  // referrer: "https://www.invaded-map.com/",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "omit",
};
export const FlashInvadersAPI = {
  fetchOptions: requestInit,
  highscores: new URL("/api/highscore/?uid=false", FlashInvaderBaseUrl),
  userSearch: (searchValue: string | null) =>
    new URL(
      `/api/search_player/?uid=&search_name=${searchValue}`,
      FlashInvaderBaseUrl
    ),
};
