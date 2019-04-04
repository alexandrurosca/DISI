import * as React from "react";
import {Routes} from "../../constants/Routes";
import {Route} from "react-router";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import CreateAccount from "../Login/CreateAccount";
import CreateSpending from "../Spending/CreateSpending";

const PageLayout = () => {

    return (
        <div >
            <Route exact={true} path={Routes.LOGIN_PAGE} component={LoginPage}/>
            <Route exact={true} path={Routes.CREATE_ACCOUNT} component={CreateAccount}/>
            <Route exact={true} path={Routes.HOME_PAGE} component={HomePage}/>
            <Route exact={true} path={Routes.CREATE_SPENDING} component={CreateSpending}/>
        </div>
    )
};
export default PageLayout;