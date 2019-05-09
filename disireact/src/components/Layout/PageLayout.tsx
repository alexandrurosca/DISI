import * as React from "react";
import {Routes} from "../../constants/Routes";
import {Route} from "react-router";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import CreateAccount from "../Login/CreateAccount";
import CreateSpending from "../Spending/CreateSpending";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import {Constants} from "../../constants/Constants";

const PageLayout = () => {
    const userLocalStorage = localStorage.getItem(Constants.USER_LOGGED);
    // const userLoggedStorage = localStorage.getItem(Constants.USER_LOGGED);

    const isUserLogged = userLocalStorage !== null;
    return (
        <div >
            <NavigationBar/>
            <Route exact={true} path={[Routes.LOGIN_PAGE, "/"]} component={LoginPage}/>
            <Route exact={true} path={Routes.CREATE_ACCOUNT} component={CreateAccount}/>
            <Route exact={true} path={Routes.HOME_PAGE} component={isUserLogged ? HomePage : LoginPage}/>
            <Route exact={true} path={Routes.CREATE_SPENDING} component={isUserLogged ? CreateSpending : LoginPage}/>
            <Footer/>
        </div>
    )
};
export default PageLayout;