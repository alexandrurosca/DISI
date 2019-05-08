import * as React from "react";
import {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import "./CreateSpending.css";
import {createSpending} from "../../service/restCalls";
import {Reasons} from "../../constants/Constants";


interface ICreateSPendingState {
    reason: string,
    amount: string,
    date: string,
}


class CreateSpending extends Component<{},ICreateSPendingState>{
    constructor(props: any) {
        super(props);
        this.state = {
            reason: "",
            amount: "",
            date: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    public handleSubmit(event: any){
        event.preventDefault();
        const newSpending = {
            reason: this.state.reason,
            amount: this.state.amount,
            date: this.state.date
            // userID: localStorage.getItem(Constants)
        } as ISpendingDto;
       createSpending(newSpending).then(response=>{
           alert("Success to add spending!");

       })
    }

    public handleChange (event: any){

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })

    }

    public validateForm() {
        const now = new Date();
        const mydate = new Date(this.state.date);
        return this.state.reason.length > 0 && this.state.amount.length > 0
            && !isNaN(Number(this.state.amount)) && Number(this.state.amount) >= 0
            && (now.getDate() - mydate.getDate() > 0);
    }

    public render(){
        const  reasons= Object.keys(Reasons).map((item, index) => {
            return (
                <option value={Reasons[item]} key={index}>
                    {Reasons[item]}
                </option>
            )
        });


        return(
            <div className="CreateSpending">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="reason" bsSize="large">
                        <ControlLabel>Reason</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={this.handleChange}
                                     value={this.state.reason}>
                            {reasons}
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="amount" bsSize="large">
                        <ControlLabel>Amount</ControlLabel>
                        <FormControl
                            value={this.state.amount}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="date" bsSize="large">
                        <ControlLabel>Date</ControlLabel>
                        <FormControl
                            value={this.state.date}
                            onChange={this.handleChange}
                            type="date"
                        />
                    </FormGroup>
                    <Button
                        block={true}
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Add new spending
                    </Button>
                </form>
            </div>
        )
    }

}



export default CreateSpending;