import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    {/* : 뒤는 url의 param값으로, 뭐든 입력될 수 있음.
                  사용자가 입력한 해당 값을 object인 { param: btc } 형태로 입력된다 */}
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
