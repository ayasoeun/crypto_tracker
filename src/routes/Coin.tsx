import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Title, Loader } from "./Coins";
import { useEffect, useState } from "react";

interface RouteParam {
    coinId: string;
}
interface RouteState {
    //interface 정의는 필수
    name: string; //state 자체는 object이고, 그 안의 name에 접근해야 하는데 name은 string
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
    // it's one of the convention style to put I in front when you use interface. but here we're not using
} // url: https://app.quicktype.io/?l=ts  => use this site to convert json to ts! way easier
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: Date;
    last_updated: Date;
    quotes: {
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_30m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_1y: number;
        ath_price: number;
        ath_date: Date;
        percent_from_price_ath: number;
    };
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParam>(); //useParam variable that is typed
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>(); //이제 fetch로 받아온 infoData, priceData를 사용하기 위해 state로 정의해준다
    const [priceInfo, setPriceInfo] = useState<PriceData>(); //interface를 정의해주었으므로 {}는 필요없다

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json(); // 이 방식은 await response.json()과 같다
            console.log(infoData);
            // infoData는 object type
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json(); // ticker api, price info
            console.log(priceData);
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "loading..."}</Title>
                {/* if the state exist, show me the name. if not, show me "loading..." */}
            </Header>
            {loading ? ( // {loading? a : b}
                <Loader>Loading...</Loader>
            ) : (
                <span>{info?.description}</span>
            )}
        </Container>
    );
}
export default Coin;

// --Coin의 중요한 역할!--
// 1. Coin은..지금 <Route path="/:coinId"> 안에 쌓여 있어 Coins와는 다르게 동적 url을 받도록 설정되어있다.. (Route에서 이걸 해주어야 받을 수 있음)
// 2. Coins 파일에서 CoinList>Coin 로 구성되어 있고, Coin 안의 컨텐츠는 <Link to={"/${coin.id}"}>{coin.name} &rarr;</Link> 로 쌓여있다.
// 3. 여기서 /${coin.id} 형식의 동적 라우팅이 가능한 이유는 바로 1 때문이다! (이 상관관계를 알아야 한다!)
