import * as React from "react";
import {Component} from "react";



interface IListSPendingProps {
    spendings: ISpendingDto[]
}

class ListSpending extends Component<IListSPendingProps>{
    constructor(props: any) {
        super(props);

    }

    public  render(){
        let list = null;
        if(this.props.spendings !== null && this.props.spendings !== undefined) {
            list = this.props.spendings.map((item, index) => {
                return (
                    <tr key={index}>
                        <td><b> {item.amount}</b> <i>RON</i></td>
                        <td>{item.reason}</td>
                        <td>{item.date}</td>
                    </tr>
                )
            });
        }

        return(
            <React.Fragment>
                <table className="table align-content-center">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }

    }


export default ListSpending;