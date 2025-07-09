import styled from "styled-components"; //styled는 아래처럼 '스타일 컴포넌트'를 만들 때 쓰임
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px; // container 필수 작업! max-width와 margin auto 설정으로 보기 좋게
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    height: 10vh;
    align-items: center;
    justify-content: center;
`;
const CoinsList = styled.ul`
    /* display: grid;
    align-items: center;
    justify-content: start; */
`;
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    /* padding: 20px; */
    border-radius: 0.985rem;
    margin-bottom: 10px;
    a {
        transition: color 0.2s ease-in; // transition(애니메이션) 기능으로 태그에 변화가 생길 때 부드럽게 변함. 0.2s 라고 second를 써줘야함. 0.2초동안 부드럽게 변화.
        display: block; // 카드 전체를 링크로 만듬. 이제 글씨 뿐만 아니라 카드의 어느곳을 눌러도 스타일 적용됨
        padding: 20px; // 패딩을 li에 적용하든 a에 적용하든 상관없지만 a에 적용하면 a 태그 자체에 padding을 줌으로써 태그에 마우스를 올렸을때 인식이 되는 공간이 넓어짐.
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
    // <Link> 컴포넌트는 실제로 렌더링되면 <a> 태그처럼 동작하고, <a> 태그처럼 스타일이 적용된다.(모든 리액트 링크->anchor로 바뀜)
    // App.tsx의 a 태그 부분에 가서 color:inherit으로 바꿔줘야 함
`;

const Title = styled.h1`
    //h1 class={Title} 이렇게 한거랑 똑같음
    color: ${(props) =>
        props.theme
            .accentColor}; //App이 theme에 접근할 수 있으면 App에 들어있는 하위요소들도 마찬가지임(import 필요x)
    font-size: 3rem;
`;

const Loader = styled.span`
    // loading text를 가운데에 띄우는 스타일 적용
    text-align: center;
`;

interface CoinInterface {
    // defining interface for coins data
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]); //객체들을 담은 배열일 때는 []를 뒤에 써주어야함. 초깃값으로 [] 할당하여 배열임을 알려줌
    // coins에 아무값이 없어도 초깃값으로 빈 array가 렌더링되므로 에러가 나지 않는다.
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //useEffect to occur side effect (this time it happend only once when it's mounted because of dependencies array '[]')
        (async () => {
            // async is a "keyword" saying IT IS asynchronous function ! (saying this: () => {} is asynchronous)
            //'asynchronous func' always returns PROMISE.
            const response = await fetch(
                // await IS a "KEYWORD" and it WAITS until it gets the values(&can put the value in variables)
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            // console.log(json);
            setCoins(json.slice(0, 100)); //Since the value has a large data, we decided to use only 100 datas
            setLoading(false); //set loading state as false when we get promise(data) successfully
        })(); //는 (함수)() 바로 실행 코드. 정의만 하는게 아닌 실행도 즉시 같이 됨.
    }, []);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? ( // {loading? a : b}
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                        </Coin> //&rarr; 는 화살표 이모지.
                        // CoinList>Coin 의 형태. `/${coin.id}`(백틱으로 감싼) 형태로 to에 값을 넣는다(동적 라우팅). {coin.name} 부분이 링크처럼 작동함
                        // Coin이 동적 url 받을 수 있도록 라우터 설정이 전제되어서 이 방식이 가능한 것임
                    ))}
                </CoinsList>
            )}
        </Container>
    );
} //styled components를 정의해주었으면 h1 태그가 아닌 스타일 컴포넌트 Title로 바꿔주기
export default Coins;
