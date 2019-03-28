import * as React from 'react';
import './App.css';
import PageLayout from "./components/Layout/PageLayout";

class App extends React.Component {
  public render() {
    return (
        <React.Fragment>
            <PageLayout/>
        </React.Fragment>
    );
  }
}

export default App;
