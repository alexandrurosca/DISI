import * as React from "react";
import {Routes} from "../../constants/Routes";
import {Route} from "react-router";
import HomePage from "../Home/HomePage";
import LoginPage from "../LoginPage";
const PageLayout = () => {

    return (
        <div >
            <Route exact={true} path={Routes.LOGIN_PAGE} component={LoginPage}/>
            <Route exact={true} path={Routes.HOME_PAGE} component={HomePage}/>
        </div>
    )
};
export default PageLayout;