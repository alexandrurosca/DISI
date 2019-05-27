import {Component} from "react";
import * as React from "react";
import {Nav, NavItem, NavLink, Button} from "reactstrap";
import * as NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import {Constants} from "../../constants/Constants";
import {Routes} from "../../constants/Routes";
import {doLogout} from "../../service/restCalls";
import {connect} from "react-redux";

interface INavigationProps {
    userLogged: IUserDto
}


class NavigationBar extends Component<INavigationProps>{

    constructor(props: any){
        super(props);
    }


    public doLogout(){
        doLogout().then(response =>{
            console.log("logout status: " + response.status);
            localStorage.removeItem(Constants.USER_LOGGED);
            window.location.href = Routes.LOGIN_PAGE;
        });
        console.log("ceva");
    }

    public render(){
        const isUserLogged = localStorage.getItem(Constants.USER_LOGGED) !== null;

        return(
            <React.Fragment>
            <div>
                <Nav variant="tabs" className={"navbar navbar-expand-md navbar-dark bg-dark"}>
                    <NavItem>
                        <NavLink href={Routes.HOME_PAGE} disabled={!isUserLogged}>Home</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href={Routes.CREATE_SPENDING} disabled={!isUserLogged || this.props.userLogged.budgetExpired}>Create Spending</NavLink>
                    </NavItem>

                    {
                        this.props.userLogged.budgetExpired &&
                        <NavItem>
                            <NavLink href={Routes.ADD_NEW_BUDGET} disabled={!isUserLogged}>Update budget</NavLink>
                        </NavItem>
                    }

                    {/*<NavItem>*/}
                        {/*<NavLink href={Routes.MY_ACCOUNT} disabled={!isUserLogged}>{getMessageResource("nav.account")}</NavLink>*/}
                    {/*</NavItem>*/}


                    <NavbarCollapse className="justify-content-end">
                        {/*<NavItem className={"navbar-nav mr-auto"}>*/}
                        {   isUserLogged &&
                                 <Button onClick={this.doLogout}>Log out</Button>
                        }
                        {
                            !isUserLogged &&
                            <NavLink href={Routes.LOGIN_PAGE} >Log in</NavLink>
                        }

                        {/*</NavItem>*/}
                    </NavbarCollapse>

                </Nav>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        userLogged: state.user.userDetails
    };
};
export default connect(mapStateToProps, {})(NavigationBar);
