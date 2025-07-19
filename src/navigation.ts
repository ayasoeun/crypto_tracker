import {useHistory} from "react-router-dom";

export function Navigation(){
    const history = useHistory();
        const goHome = () => {
            history.push("/"); //go to the main page
        };
        const goBack = () => {
            history.goBack(); //go back to previous page
        };
    return {goHome, goBack}
}