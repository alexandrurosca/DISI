import * as React from "react";
import {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import "./Login.css";
import {createAccount} from "../../service/restCalls";
import {connect} from "react-redux";
import {userCreatedSuccess} from "../../redux/actions/userActions";


interface ICreateAccountProps{
    userCreatedSuccess: any
    // logout: any,
}

interface ICreateAccountState {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    budget: string
}

class CreateAccount extends Component<ICreateAccountProps, ICreateAccountState>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            username: "",
            budget: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    public handleSubmit(event: any){
        event.preventDefault();

        const newUser ={
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            amount: this.state.budget,
            username: this.state.username
        } as ICreateAccountDtoUser;

        createAccount(newUser).then(response=>{
            if(response.status === 200){
                this.props.userCreatedSuccess();
                alert("User create")
            }else{
                alert("Can't create user");
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
        return this.state.username.length > 0
            && this.state.password.length > 0
            && this.state.firstName.length > 0
            && this.state.lastName.length > 0
            &&  !isNaN(Number(this.state.budget)) && Number(this.state.budget) >= 0;
    }

    public render(){

        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username:</ControlLabel>
                        <FormControl
                            autoFocus={true}
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus={true}
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="firstName" bsSize="large">
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>


                    <FormGroup controlId="lastName" bsSize="large">
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>

                    <FormGroup controlId="budget" bsSize="large">
                        <ControlLabel>Budget</ControlLabel>
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
                        Create Account
                    </Button>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch: any) => {
    return {
        userCreatedSuccess: () => dispatch(userCreatedSuccess()),
    };
};

export default connect(null, mapDispatchToProps)(CreateAccount);