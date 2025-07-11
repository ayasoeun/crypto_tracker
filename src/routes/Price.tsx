import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { theme } from "../theme";
import Chart from "./Chart";

interface ChartProps {
    coinId: string;
}
export interface IHistory {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number; // 원래는 string이지만 바꿔주자
    volume: number;
    market_cap: number;
}

function Price({ coinId }: ChartProps) {
    //구조분해
    const { isLoading, data } = useQuery<IHistory[]>(["history", coinId], () =>
        fetchCoinHistory(coinId)
    );
    // console.log(data?.map((d) => new Date(d.time_close * 1000)));
    return <div>{isLoading ? "Loading..." : "Price"}</div>;
}
export default Price;
// Coin에서 이미 coinId를 알고 있다. 굳이 여기서 useParams를 쓸 필요가 없다
