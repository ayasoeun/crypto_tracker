import { useParams } from "react-router-dom";

interface RouteParam {
    coinId: "string";
}
function Coin() {
    const { coinId } = useParams<RouteParam>();
    return <h1>Coin: {coinId}</h1>;
}
export default Coin;
