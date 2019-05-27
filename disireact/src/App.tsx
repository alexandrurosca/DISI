import * as React from 'react';

import './App.css';
import PageLayout from "./components/Layout/PageLayout";


class App extends React.Component{


  public render() {
    return (
        <React.Fragment>
            <PageLayout/>
        </React.Fragment>
    );
  }
}


// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         setUser: (user: IUserDto) => dispatch(setUserAction(user)),
//         // logout: () => dispatch(doLogoutAction()),
//     };
// };
//
// const mapStateToProps = (state: any) => {
//     return {
//         userLogged: state.user.userDetails
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
