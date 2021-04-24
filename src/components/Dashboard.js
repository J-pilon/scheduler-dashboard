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

// An empty array of days
// An empty object for appointments
// An empty object for interviewers
// Change loading to true

class Dashboard extends Component {

  state = {
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {}
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  selectPanel(id) {
   this.setState(prev => ({
     focused: prev.focused !== null ? null : id 
   }))
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
     onSelect={event => this.selectPanel(panel.id)}    />
   ));

    return (
    <main className={dashboardClasses} >
    {panels}
    </main>
    );
  }
}

export default Dashboard;
