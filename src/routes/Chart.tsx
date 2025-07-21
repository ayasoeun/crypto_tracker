import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { theme } from "../theme";

interface ChartProps {
    coinId: string;
    isDark: boolean;
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

function Chart({ coinId, isDark }: ChartProps) {
    //구조분해
    const { isLoading, data } = useQuery<IHistory[]>(["history", coinId], () =>
        fetchCoinHistory(coinId)
    );
    // console.log(data?.map((d) => new Date(d.time_close * 1000)));
    return (
        <div>
            {isLoading ? (
                "Loading..."
            ) : (
                <>
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "Price",
                                data: data?.map((d) => d.close) as number[], //number 타입 배열이라고 타입을 이렇게 명시하지 않으면 에러난다..
                            },
                        ]}
                        options={{
                            chart: {
                                height: 500,
                                width: 500,
                                background: "transparent",
                                toolbar: {
                                    show: false,
                                },
                            },
                            grid: { show: false },
                            xaxis: {
                                labels: {
                                    show: false, // ❌ X축 숫자 숨기기
                                },
                                axisTicks: {
                                    show: false,
                                },
                                axisBorder: {
                                    show: false,
                                },
                                type: "datetime",
                                categories: data?.map((d) =>
                                    new Date(d.time_close * 1000).toUTCString()
                                ),
                            },
                            yaxis: {
                                labels: {
                                    show: false, // ❌ X축 숫자 숨기기
                                },
                            },
                            theme: {
                                mode: isDark ? "dark" : "light",
                                palette: theme.bgColor,
                            },
                            tooltip: {
                                y: {
                                    formatter: (value) =>
                                        `$ ${value.toFixed(2)}`,
                                },
                            },
                        }}
                    />
                </>
            )}
        </div>
    );
}
export default Chart;
// Coin에서 이미 coinId를 알고 있다. 굳이 여기서 useParams를 쓸 필요가 없다
