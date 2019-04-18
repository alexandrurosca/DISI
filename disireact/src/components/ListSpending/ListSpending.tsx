import * as React from "react";
import {Component} from "react";
import "./CreateSpending.css";



interface IListSPendingState {
    reason: string,
    amount: string,
    date: string,
}

class ListSpending extends Component<{}, IListSPendingState>{
    constructor(props: any) {
        super(props);

    }

    public  render(){
        return(
            <React.Fragment>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#Spending</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }

    }


export default ListSpending;