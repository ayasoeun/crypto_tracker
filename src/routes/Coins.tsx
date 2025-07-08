import styled from "styled-components"; //styled는 아래처럼 '스타일 컴포넌트'를 만들 때 쓰임

const Title = styled.h1`
    //h1 class={Title} 이렇게 한거랑 똑같음
    color: ${(props) =>
        props.theme
            .accentColor}; //App이 theme에 접근할 수 있으면 App에 들어있는 하위요소들도 마찬가지임(import 필요x)
`;

function Coins() {
    return <Title>코인</Title>;
} //styled components를 정의해주었으면 h1 태그가 아닌 스타일 컴포넌트 Title로 바꿔주기
export default Coins;
