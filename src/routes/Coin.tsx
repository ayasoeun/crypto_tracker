import { useParams } from "react-router-dom";

interface RouteParam {
    coinId: "string";
} //coinId의 타입을 정의해주고, <RouteParam>을 usePrams 뒤에 붙여준다
// usePrams: URL 경로에서 :param 값을 가져오는 훅
function Coin() {
    const { coinId } = useParams<RouteParam>(); // usePrams의 값을 가져오는 법
    return <h1>Coin: {coinId}</h1>;
}
export default Coin;
