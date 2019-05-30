import * as React from "react";
import {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {IGraphData} from "../../model/GraphData";
import {getGraphData} from "../../service/restCalls";
import Graphs from "./Graphs";

interface IGraphSpendingProps{
    data?: any
}

interface IGraphSpending {
    startDate: string,
    endDate: string,
    showGraph: boolean
    dataGraph: IGraphData[]
}


class GraphSpending extends Component<IGraphSpendingProps, IGraphSpending>{
    public constructor(props: IGraphSpendingProps){
        super(props);
        this.state = {
            endDate: new Date(Date.now()).toISOString(),
            startDate: new Date(Date.now()).toISOString(),
            showGraph: false,
            dataGraph: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    public handleSubmit(event: any){
        event.preventDefault();
        getGraphData(this.state.startDate, this.state.endDate).then(resp=>{
            if(resp.status === 200){
                this.setState({
                    dataGraph: resp.data as IGraphData[],
                    showGraph: true,
                })
            }
        })
    }

    public handleChange (event: any){

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })

    }

    public render(){
        return(
            <React.Fragment>

                <div className="row">
                    <div className="col">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="startDate" bsSize="large" >
                                <ControlLabel>From:</ControlLabel>
                                <FormControl
                                    value={this.state.startDate}
                                    onChange={this.handleChange}
                                    type="date"
                                />
                            </FormGroup>
                            <FormGroup controlId="endDate" bsSize="large" >
                                <ControlLabel>To:</ControlLabel>
                                <FormControl
                                    value={this.state.endDate}
                                    onChange={this.handleChange}
                                    type="date"
                                />
                            </FormGroup>
                            <Button
                                block={true}
                                bsSize="large"
                                type="submit">
                                Show data
                            </Button>
                        </form>

                    </div>
                    <div className="col">
                        {this.state.showGraph &&
                            <Graphs labels={this.state.dataGraph.map(item=>item.reason.toString())}
                                    data={this.state.dataGraph.map(item=>item.amount.toString())}
                                    title={"Total spending each category"}
                                    labelAxisY={"RON"}
                                    label={"total"}
                                    showAsPie={true}
                            />
                        }
                    </div>
                    <div className="col">
                        {this.state.showGraph &&
                        <Graphs labels={this.state.dataGraph.map(item=>item.reason.toString())}
                                data={this.state.dataGraph.map(item=>item.quantity.toString())}
                                title={"Number of spending per category"}
                                labelAxisY={""}
                                label={"quantity"}
                                showAsPie={false}
                        />
                        }
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default GraphSpending