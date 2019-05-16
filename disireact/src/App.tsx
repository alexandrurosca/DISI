import * as React from 'react';

import './App.css';
import PageLayout from "./components/Layout/PageLayout";
import {setUserAction} from "./redux/actions/userActions";
import {connect} from "react-redux";
import {Constants} from "./constants/Constants";


interface InterfaceProps {
    setUser: any
}

class App extends React.Component<InterfaceProps> {

    public componentDidMount(){
        const user = localStorage.getItem(Constants.USER_LOGGED);
        if(user !== null && user !== undefined){
            console.log("asdasdasdasd: " + user);
            this.props.setUser(JSON.parse(user) as IUserDto);
        }
    }

  public render() {
    return (
        <React.Fragment>
            <PageLayout/>
        </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: IUserDto) => dispatch(setUserAction(user)),
        // logout: () => dispatch(doLogoutAction()),
    };
};

export default connect(null, mapDispatchToProps)(App);
