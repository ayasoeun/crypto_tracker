import {
    Link,
    Switch,
    Route,
    useLocation,
    useParams,
    useRouteMatch,
    useHistory,
} from "react-router-dom";
import { Container, Header, Title, Loader } from "./Coins";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import { fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";
import NavigationBtn from "../navigationBtn";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const Taps = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0;
    gap: 10px;
`;
const Tap = styled.span<{ isActive: boolean }>`
    // <{ isActive: boolean }> -> This is how you set props to styled components! 'isActive' is props and its type is 'boolean'
    text-align: center;
    text-transform: uppercase;
    font-size: 0.725rem;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    // don't forget we should get props like this
    a {
        display: block;
    }
`;

const Overview = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

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
    quotes: Quotes;
}
export interface Quotes {
    USD: Usd;
}
export interface Usd {
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
}

interface ICoinProps {}
function Coin() {
    const { coinId } = useParams<RouteParam>(); //useParam variable that is typed
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch(`/${coinId}/price`); //true면 priceMatch는 object가 될거고 아니면 null 반환
    const chartMatch = useRouteMatch(`/${coinId}/chart`); //useRouteMatch checks whether you are in the url
    // react-router v6부터는 useRouteMatch가 사용되지 않고 useMatch로 대체된다.
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ["info", coinId], // make query key unique like this: ["info", coinId]
        () => fetchCoinInfo(coinId), // this is fetcher func(not the return value, should be func like this). fetchCoinInfo gets prameter.
        {
            // refetchInterval: 500, //every 5 secs, it'll refresh(refetch) coin prices in real-time on the background
            // but for the coinpaprika it will hit the maximum api usage so we're not using it
        }
    );
    const { isLoading: tickersLoading, data: tickersData } =
        useQuery<PriceData>(["ticker", coinId], () => fetchCoinTickers(coinId));
    const loading = infoLoading || tickersLoading;
    // console.log(tickersData?.quotes.USD.price);

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </title>
            </Helmet>

            <Header>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </Title>
                {/* This will only be true when users click through the homepage  */}
                {/* : is 'or'. This will if you can't get the state from url param then you get data from api */}
                {/* loading ? "Loading..." : info?.name -> This block will be excuted when user is not coming from hompage */}
                <NavigationBtn />
            </Header>
            {loading ? ( // {loading? a : b}
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>
                                ${tickersData?.quotes.USD.price.toFixed(2)}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Taps>
                        <Tap isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tap>
                        <Tap isActive={priceMatch !== null}>
                            {/* isActive is props that Tap has.. it's same as !(priceMatch == null) */}
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tap>
                    </Taps>

                    <Switch>
                        {/* 라우트 안에 또 다른 라우터를 렌더링하는 중 */}
                        <Route path={`/${coinId}/chart`}>
                            <Chart coinId={coinId} />
                        </Route>
                        <Route path={`/${coinId}/price`}>
                            {/* coinId에 실제 값이 있는 경우 사용자가 없는 값을 입력하면 에러가 나도록 정적 경로로 설정해야 한다. */}
                            <Price coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}
export default Coin;

// --Coin의 중요한 역할!--
// 1. Coin은..지금 <Route path="/:coinId"> 안에 쌓여 있어 Coins와는 다르게 동적 url을 받도록 설정되어있다.. (Route에서 이걸 해주어야 받을 수 있음)
// 2. Coins 파일에서 CoinList>Coin 로 구성되어 있고, Coin 안의 컨텐츠는 <Link to={"/${coin.id}"}>{coin.name} &rarr;</Link> 로 쌓여있다.
// 3. 여기서 /${coin.id} 형식의 동적 라우팅이 가능한 이유는 바로 1 때문이다! (이 상관관계를 알아야 한다!)
