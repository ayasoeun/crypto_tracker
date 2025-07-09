import { useParams } from "react-router-dom";

interface RouteParam {
    coinId: "string";
}
function Coin() {
    const { coinId } = useParams<RouteParam>();
    return <h1>Coin: {coinId}</h1>;
}
export default Coin;

// --Coin의 중요한 역할!--
// 1. Coin은..지금 <Route path="/:coinId"> 안에 쌓여 있어 Coins와는 다르게 동적 url을 받도록 설정되어있다.. (Route에서 이걸 해주어야 받을 수 있음)
// 2. Coins 파일에서 CoinList>Coin 로 구성되어 있고, Coin 안의 컨텐츠는 <Link to={"/${coin.id}"}>{coin.name} &rarr;</Link> 로 쌓여있다.
// 3. 여기서 /${coin.id} 형식의 동적 라우팅이 가능한 이유는 바로 1 때문이다! (이 상관관계를 알아야 한다!)
