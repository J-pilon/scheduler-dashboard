import React, { Component } from "react";

import classnames from "classnames";

import Loading from 'components/Loading';
import Panel from 'components/Panel';

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

// Add a new function to the Dashboard component class that can take an id and set the state of focused to the value of id.
// Pass the function to the Panel component so that it can call it with the id of the Panel that we click.
// Call the function with the id in an onClick event handler on the root element of the Panel 
// component.

class Dashboard extends Component {

  state = {
    loading: false,
    focused: null
  }

  selectPanel(id) {
    this.setState({
     focused: id
    });
   }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });

    if (this.state.loading) {
      return <Loading />;
    }

    const panels = data
   .filter(
    panel => this.state.focused === null || this.state.focused === panel.id
   )
   .map(panel => (
    <Panel
     key={panel.id}
     id={panel.id}
     label={panel.label}
     value={panel.value}
     onSelect={this.selectPanel}
    />
   ));

    return (
    <main className={dashboardClasses} >
    {panels}
    </main>
    );
  }
}

export default Dashboard;
