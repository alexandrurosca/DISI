import * as React from "react";
import {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
// import "./CreateSpending.css";
import {addNewBudget} from "../../service/restCalls";


interface ICreateBudgetState {
    budget: string,
}


class CreateBudget extends Component<{},ICreateBudgetState>{
    constructor(props: any) {
        super(props);
        this.state = {
            budget: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    public handleSubmit(event: any){
        event.preventDefault();
        const newBudget = {
            amount: this.state.budget,
        };
        addNewBudget(newBudget).then(response=>{
            if(response.status === 200) {
                alert("Budget updated!");
            }else{
                alert("Fail to updated!");
            }

        })
    }

    public handleChange (event: any){

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })

    }

    public validateForm() {
        return this.state.budget.length > 0
            && !isNaN(Number(this.state.budget)) && Number(this.state.budget) >= 0;
    }

    public render(){
        return(
            <div className="CreateSpending">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="budget" bsSize="large">
                        <ControlLabel>Amount</ControlLabel>
                        <FormControl
                            value={this.state.budget}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <Button
                        block={true}
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Update budget
                    </Button>
                </form>
            </div>
        )
    }

}



export default CreateBudget;