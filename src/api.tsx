export function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
      response.json()
    );
  }
export function fetchRoads() {
    return fetch("https://file.notion.so/f/s/f5968735-cc9c-4b98-a3e7-31978c296343/Route_API.json?id=2c807151-f006-4ffe-b34a-50cefd1be827&table=block&spaceId=7637fe22-3b9f-4018-a243-1b012a24ab02&expirationTimestamp=1690848000000&signature=OK7QPD3FfpIqKC_oBHTX_p817hx_qZBzZC_Xk7DqdJM&downloadName=Route_API.json")
    .then((response) =>
      response.json()
    );
  }