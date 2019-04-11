import * as React from "react";
import {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {setUserAction} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import "../Login/Login.css";
import {createSpending} from "../../service/restCalls";

interface ICreateSpendingProps{
    setUser: any,
    logout: any,
}

interface ICreateSPendingState {
    reason: string,
    amount: string,
    date: string,
}

class CreateSpending extends Component<ICreateSpendingProps, ICreateSPendingState>{
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
        } as ICreateSpendingDtoUser;
       createSpending(newSpending).then(response=>{
            if(response !== undefined && response !== null){
                const currentSpending = response as ICreateSpendingDtoUser;
                this.props.setUser(currentSpending);
            }else{
                alert("Bad credentials!");
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
        return this.state.reason.length > 0 && this.state.amount.length > 0;
    }

    public render(){

        return(
            <div className="CreateSpending">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="reason" bsSize="large">
                        <ControlLabel>Reason</ControlLabel>
                        <FormControl
                            autoFocus={true}
                            type="text"
                            value={this.state.reason}
                            onChange={this.handleChange}
                        />
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: IUserDto) => dispatch(setUserAction(user)),
        // logout: () => dispatch(doLogoutAction()),
    };
};

export default connect(null, mapDispatchToProps)(CreateSpending);