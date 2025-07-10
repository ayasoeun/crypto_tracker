const Base_URL = `https://api.coinpaprika.com/v1`
// `` 사용

export function fetchCoins() {
 // yes, we could make it as a normal async func. but here to make it shorter let's use promise
//fetch function. it should return promise of JSON data
    return fetch(`${Base_URL}/coins`).then((response) => response.json())
    
}
export function fetchCoinInfo(coinId:string){ // coinId:string 이렇게 해줘야 인식함
    return fetch(`${Base_URL}/coins/${coinId}`).then((response) => response.json())
}
export function fetchCoinTickers(coinId:string){ // coinId:string 이렇게 해줘야 인식함
    return fetch(`${Base_URL}/tickers/${coinId}`).then((response) => response.json())
}
