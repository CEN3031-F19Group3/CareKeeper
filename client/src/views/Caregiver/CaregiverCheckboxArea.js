import React from 'react';
import TaskList from './tasks.js';
import axios from "axios";
const { baseURL } = process.env;

class CaregiverCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskComplete: false,
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let visit = this.props.visit;
    visit.caregiverNotes = value;
    axios.put(baseURL + '/api/visits/' + this.props.visit._id,visit);

    this.setState({
      [name]: value
    });
  }


  render() {
    if (this.props.visit == null)
      return("No Visit Displayed");
    return (
      <div align="left">
        <h2>Visit Details:</h2>
        <h4>Manager's Notes:</h4>
        <div align="left">{this.props.visit.managerNotes}</div>
        <form className="form" onSubmit={this.handleSubmit}>

        <TaskList
        data={this.props.data}
        visit={this.props.visit} />


          <div className="form-group">
            <div><br />
              <h4>Caregiver Notes:</h4>
            </div>
            <div>
              <textarea
                className="textarea"
                name="message"
                value={this.props.visit.caregiverNotes == null ? "" : this.props.visit.caregiverNotes}
                onChange={this.handleChange}
              />
              </div>
            </div>

          </form>
        </div>
    );
  }
}


export default CaregiverCheckbox;

/*
{this.state.adls.map((task,key) =>
  <Tasks task={task} key={task.id} />
)}
*/
