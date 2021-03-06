import * as React from "react";
import "../../App.css"



class Footer extends React.Component{
    constructor(props: any) {
        super(props);
    }


    public render(){
        return(
            <React.Fragment>
            <div className={"footer"}>
            <footer className="page-footer font-small bg-dark pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <form className="form-inline">
                                <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
                                    {/*<i className="fas fa-search" aria-hidden="true"/>*/}
                            </form>
                        </div>

                        <div className="col-md-6 mb-4">

                            <form className="input-group">
                                <input type="text" className="form-control form-control-sm" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2"/>
                                    {/*<div className="input-group-append">*/}
                                        {/*<button className="btn btn-sm btn-outline-white my-0" type="button">Sign up</button>*/}
                                    {/*</div>*/}
                            </form>
                        </div>
                    </div>
                </div>



                <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> alex.rosca1996@gmail.com</a>
                </div>


            </footer>
            </div>
            </React.Fragment>
        )
    }

}


export  default Footer;
