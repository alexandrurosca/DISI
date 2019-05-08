import * as React from 'react';
import {getSpendings} from "../../service/restCalls";
import ListSpending from "../ListSpending/ListSpending";


interface InterfaceState {
    spendings: ISpendingDto[]
}

class HomePage extends React.Component<{},InterfaceState>{

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
    }

    public render(){
        return(
            <React.Fragment>
                <h3>My Spendings</h3>
                <ListSpending spendings={this.state.spendings}/>
            </React.Fragment>
        )
    }
}


export default HomePage;