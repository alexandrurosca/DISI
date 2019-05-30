import * as React from "react";
import {Component} from "react";
import {Button, NavLink} from "reactstrap";
import {deleteSpending} from "../../service/restCalls";
import {Routes} from "../../constants/Routes";



interface IListSPendingProps {
    spendings: ISpendingDto[]
    updateHome: () => any,
    myUser: IUserDto;
}

class ListSpending extends Component<IListSPendingProps>{
    constructor(props: any) {
        super(props);
        this.inNotInteval = this.inNotInteval.bind(this);
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


    public inNotInteval(check: string) {
        const ceva = ((new Date(check).getTime() <= new Date(this.props.myUser.endDate).getTime() && new Date(check).getTime() >= new Date(this.props.myUser.startDate).getTime()));
        console.log(check + " " + ceva);
        return ceva;
    }

    public  render(){
        let list = null;
        if(this.props.spendings !== null && this.props.spendings !== undefined) {
            list = this.props.spendings.map((item, index) => {
                const ceva = this.inNotInteval(item.date);
                return (
                    <tr key={index}>
                        <td><b> {item.amount}</b> <i>RON</i></td>
                        <td>{item.reason}</td>
                        <td>{item.date}</td>
                        <td><NavLink disabled={!ceva} href={Routes.EDIT_SPENDING + "/" + item.spendingId}>Edit</NavLink></td>
                        <td><Button disabled={!ceva} onClick={()=>this.deleteSpending(item.spendingId)}>Delete</Button></td>
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
                        <th scope="col">Update</th>
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