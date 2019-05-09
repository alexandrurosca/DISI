import * as React from 'react';
import {getSpendings} from "../../service/restCalls";
import ListSpending from "../ListSpending/ListSpending";
import {connect} from "react-redux";


interface InterfaceState {
    spendings: ISpendingDto[]
}

interface InterfaceProps {
    userLogged: IUserDto
}

class HomePage extends React.Component<InterfaceProps,InterfaceState>{

    constructor(props: any) {
        super(props);
        this.state = {
            spendings: []
        }
    }
    public componentWillMount(){
        getSpendings().then(resp=>{
            console.log("response: " + JSON.stringify(resp));
            this.setState({
                spendings: resp as ISpendingDto[]
            })
        })

        console.log("user Logged: " + JSON.stringify(this.props.userLogged));
    }

    public render(){
        return(
            <React.Fragment>
                <h3>My Spendings</h3>
                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col">Budget</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <ListSpending spendings={this.state.spendings}/>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        userLogged: state.user.userDetails
    };
};

export default connect(mapStateToProps, null)(HomePage);