import * as React from "react";
import {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {doLogin} from "../../service/restCalls";
import {setUserAction} from "../../redux/actions/userActions";
import {connect} from "react-redux";

interface ILoginProps{
    setUser: any,
    logout: any,
}

interface ILoginState {
    username: string,
    password: string,
}

class Login extends Component<ILoginProps, ILoginState>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    public handleSubmit(event: any){
        event.preventDefault();

        doLogin(this.state.username, this.state.password).then(response=>{
            if(response !== undefined && response !== null){
                const currentUser = response as IUserDto;
                this.props.setUser(currentUser);
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
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    public render(){

        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus={true}
                            type="username"
                            value={this.state.username}
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
                    <Button
                        block={true}
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
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

export default connect(null, mapDispatchToProps)(Login);