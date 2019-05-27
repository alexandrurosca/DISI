import * as React from "react";
import {Routes} from "../../constants/Routes";
import {Route, Switch} from "react-router";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import CreateAccount from "../Login/CreateAccount";
import CreateSpending from "../Spending/CreateSpending";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import CreateBudget from "../ListSpending/CreateBudget";
import {Constants} from "../../constants/Constants";
import EditSpending from "../Spending/EditSpending";


class PageLayout extends React.Component{
    // const userLocalStorage = localStorage.getItem(Constants.USER_LOGGED);



    public render() {
        const userLoggedStorage = localStorage.getItem(Constants.USER_LOGGED);

        const isUserLogged = userLoggedStorage !== null;
        return (
            <div>
                <NavigationBar/>
                <Switch>
                    <Route exact={true} path={[Routes.LOGIN_PAGE, "/"]} component={LoginPage}/>
                    <Route exact={true} path={Routes.HOME_PAGE} component={isUserLogged ? HomePage : LoginPage}/>
                    <Route exact={true} path={Routes.ADD_NEW_BUDGET} component={isUserLogged ? CreateBudget : LoginPage}/>
                    <Route exact={true} path={Routes.CREATE_SPENDING} component={isUserLogged ? CreateSpending : LoginPage}/>
                    <Route exact={true} path={Routes.CREATE_ACCOUNT} component={CreateAccount}/>
                    <Route exact={true} path={Routes.EDIT_SPENDING + "/:orderId"} component={EditSpending}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
};

// export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
export default PageLayout;