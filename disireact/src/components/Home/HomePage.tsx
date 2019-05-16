import * as React from 'react';
import {getBudget, getSpendings} from "../../service/restCalls";
import ListSpending from "../ListSpending/ListSpending";
import {connect} from "react-redux";
import {updateUserBudget} from "../../redux/actions/userActions";


interface InterfaceState {
    spendings: ISpendingDto[]
    userLocalStorage: IUserDto | null
}

interface InterfaceProps {
    userLogged: IUserDto
    updateBudgetUser: any
}



class HomePage extends React.Component<InterfaceProps,InterfaceState>{

    constructor(props: any) {
        super(props);
        this.state = {
            spendings: [],
            userLocalStorage: null
        }

        this.updateHome = this.updateHome.bind(this);
    }

    public updateHome(): void{
        this.update();
    }



    public componentWillMount(){

       this.update();
       //  getBudget().then(resp=>{
       //      if(resp.status === 200){
       //          console.log("new budget: " + resp.data.amount);
       //          this.props.updateBudgetUser(resp.data.amount);
       //      }
       //  });
       //
       //  getSpendings().then(resp=>{
       //      this.setState({
       //          spendings: resp as ISpendingDto[]
       //      })
       //  })
    }

    public render(){
        return(
            <React.Fragment>
                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col">Available Budget</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.userLogged.amount}</td>
                        <td>{this.props.userLogged.startDate}</td>
                        <td>{this.props.userLogged.endDate}</td>
                    </tr>
                    </tbody>
                </table>
                <h3>My Spendings</h3>
                <ListSpending spendings={this.state.spendings} updateHome={()=>this.updateHome}/>
            </React.Fragment>
        )
    }

    public update(){
        getBudget().then(resp=>{
            if(resp.status === 200){
                console.log("new budget: " + resp.data.amount);
                if(resp.data.amount !== this.props.userLogged.amount) {
                    this.props.updateBudgetUser(resp.data.amount);
                }
            }
        });

        getSpendings().then(resp=>{
            const newSpendings = resp as ISpendingDto[]
            if(newSpendings.length !== this.state.spendings.length) {
                this.setState({
                    spendings: resp as ISpendingDto[]
                })
            }
        })

        // this.render();
    }
}


const mapStateToProps = (state: any) => {
    return {
        userLogged: state.user.userDetails
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        updateBudgetUser: (budget: number) => dispatch(updateUserBudget(budget)),
        // logout: () => dispatch(doLogoutAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);