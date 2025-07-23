import styled from "styled-components"; //styled는 아래처럼 '스타일 컴포넌트'를 만들 때 쓰임
import { Link, useHistory } from "react-router-dom"; //Don't forget to import Link from router dom!
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async"; //Helmet lets you change the title of the tap
import NavigationBtn from "../navigationBtn";
import { useRecoilValue } from "recoil";

export const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px; // container 필수 작업! max-width와 margin auto setting to look nice and ordered
    margin: 0 auto;
`;

export const Header = styled.header`
    display: flex;
    height: 10vh;
    align-items: center;
    justify-content: center;
`;
export const CoinsList = styled.ul`
    /* display: grid;
    align-items: center;
    justify-content: start; */
`;

export const Button = styled.button`
    padding: 0.275rem 0.725rem;
    border-radius: 2rem;
    &:hover {
        color: ${(props) => props.theme.accentColor};
    }
`;
export const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    /* padding: 20px; */
    border-radius: 0.985rem;
    margin-bottom: 10px;
    a {
        transition: color 0.2s ease-in; // transition(애니메이션) 기능으로 태그에 변화가 생길 때 부드럽게 변함. 0.2s 라고 second를 써줘야함. 0.2초동안 부드럽게 변화.
        padding: 20px; // 패딩을 li에 적용하든 a에 적용하든 상관없지만 a에 적용하면 a 태그 자체에 padding을 줌으로써 태그에 마우스를 올렸을때 인식이 되는 공간이 넓어짐.
        display: flex; // make it flex to look everything in the contents put together and nicly ordered
        gap: 0.825rem;
        align-items: center; // to make everything in the contents put together and nicly ordered
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
    // <Link> 컴포넌트는 실제로 렌더링되면 <a> 태그처럼 동작하고, <a> 태그처럼 스타일이 적용된다.(모든 리액트 링크->anchor로 바뀜)
    // App.tsx의 a 태그 부분에 가서 color:inherit으로 바꿔줘야 함
`;

export const Title = styled.h1`
    //h1 class={Title} 이렇게 한거랑 똑같음
    color: ${(props) =>
        props.theme
            .accentColor}; //App이 theme에 접근할 수 있으면 App에 들어있는 하위요소들도 마찬가지임(import 필요x)
    font-size: 3rem;
`;

export const Loader = styled.span`
    // loading text를 가운데에 띄우는 스타일 적용
    text-align: center;
`;

export const Img = styled.img`
    //since original Images are so big & not really ordered. we need to resize them
    height: 35px;
    width: 35px;
`;

interface ICoin {
    // defining interface for coins data
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
interface ItoggleDark {}
function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>🌎 Coin trading</title>
            </Helmet>
            <Header>
                <Title>Coin trading</Title>
                {/* Button comes here */}
                <NavigationBtn />
                <button>toggle mode</button>
            </Header>
            {isLoading ? ( // {loading? a : b}
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map(
                        //data.map -> error. it's because data might be undefined.. so we fix to data?.map
                        (coin) => (
                            <Coin>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`, //pathname, state are properties of Link object. You can put object here like this
                                        state: { name: coin.name }, //path로 쓸 때랑 js 값으로 쓸 때랑 입력 형식이 다름! \${} vs {}
                                    }}
                                >
                                    <Img
                                        src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} // symbol has to converted to lowercase
                                        // in this case, we use 'img' tag! this api shows 'each coins' logo'
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin> //&rarr; 는 화살표 이모지.
                            // CoinList>Coin 의 형태. `/${coin.id}`(백틱으로 감싼) 형태로 to에 값을 넣는다(동적 라우팅). {coin.name} 부분이 링크처럼 작동함
                            // Coin이 동적 url 받을 수 있도록 라우터 설정이 전제되어서 이 방식이 가능한 것임
                        )
                    )}
                </CoinsList>
            )}
        </Container>
    );
} //styled components를 정의해주었으면 h1 태그가 아닌 스타일 컴포넌트 Title로 바꿔주기
export default Coins;
