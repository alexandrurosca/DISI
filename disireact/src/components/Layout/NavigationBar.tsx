import {Component} from "react";
import * as React from "react";
import {Nav, NavItem, NavLink, Button} from "reactstrap";
import * as NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import {Constants} from "../../constants/Constants";
import {Routes} from "../../constants/Routes";
import {doLogout} from "../../service/restCalls";

class NavigationBar extends Component{

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
                        <NavLink href={Routes.CREATE_SPENDING} disabled={!isUserLogged}>Create Spending</NavLink>
                    </NavItem>

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

export default NavigationBar;