import * as React from "react";
import {Bar, Doughnut} from "react-chartjs-2";
import "../../App.css";

interface IGraphProps{
    labels: string[],
    data: any[],
    title: string,
    labelAxisY: string,
    label: string,
    showAsPie: boolean
}


class Graphs extends React.Component<IGraphProps>{
    public render(){
        // const randomColor = getRandomColor();
        const colors: any[] = [];
        this.props.labels.forEach(item=>{
            colors.push(getRandomColor());
        });

        const data1 = {
            labels: this.props.labels,
            datasets: [
                {
                    // label: this.props.labels,
                    backgroundColor: colors,
                    hoverBackgroundColor: getRandomColor(),
                    hoverBorderColor: getRandomColor(),
                    data: this.props.data
                }
            ]
        };

        const myOptions = {
            scales:{
                yAxes:[{
                    ticks: {
                        beginAtZero: true,
                        callback: (value: any, index: any, values: any) => value + " " + this.props.labelAxisY
                    }
                }]
            },

            legend:{
                display: false
            }
        }

        return (
            <React.Fragment>
            <div className={"myBar"}>
                <h2>{this.props.title}</h2>
                {
                    this.props.showAsPie &&
                    <Doughnut  data={data1}
                               width={400}
                               height={300}/>
                }

                {
                    !this.props.showAsPie &&
                    <Bar data={data1}
                         options={myOptions}
                         width={400}
                         height={300}/>
                }

            </div>
            </React.Fragment>
        );
    }

    // private generateColor(){
    //     return '#' +
    // }
}

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default Graphs