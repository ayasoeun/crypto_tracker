import { useHistory } from "react-router-dom";
import { Navigation } from "./navigation";

const NavigationBtn: React.FC = () => {
    const { goHome, goBack } = Navigation();

    return (
        <div style={{ display: "flex" }}>
            <button onClick={goBack} style={{ marginRight: 10 }}>
                Back
            </button>
            <button onClick={goHome}>goHome</button>
        </div>
    );
};
export default NavigationBtn;
