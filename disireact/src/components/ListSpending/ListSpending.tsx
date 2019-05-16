import * as React from "react";
import {Component} from "react";
import {Button} from "reactstrap";
import {deleteSpending} from "../../service/restCalls";



interface IListSPendingProps {
    spendings: ISpendingDto[]
    updateHome: ()=> any
}

class ListSpending extends Component<IListSPendingProps>{
    constructor(props: any) {
        super(props);
    }

    public deleteSpending(id: any){
        console.log("delete: " + id);
        deleteSpending(id).then(resp=>{
            if(resp.status === 200){
                alert("Spending deleted");
                this.props.updateHome();
            }
        })
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
                        <td><Button onClick={()=>this.deleteSpending(item.spendingId)}>Delete</Button></td>
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
                        <th scope="col">Delete</th>
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