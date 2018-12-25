import React, {Component} from 'react'
import  helpers from '../helper'
//comited
class TimersDashboard extends React.Component {

  state = {
       timers: [
         {
          title: 'Pratice squat',
          project: 'Gym Chores',
          id: 0,
          elapsed: 54455,
          runningSince: Date.now()
        },
        {
          title: 'Pratice squat',
          project: 'Gym Chores',
          id: 1,
          elapsed: 45544,
          runningSince: Date.now()
        },
       ],
  };

    render(){
        return (
          <div className='ui three column centered grid'>
            <div className='column'>
            <EditableTimerList timers = {this.state.timers}/>
            <ToggleableTimerForm  isOpen={false} />
            </div>
          </div>  
        );
    }
 
}

export default TimersDashboard;

class EditableTimerList extends React.Component {
    render(){

      const timers = this.props.timers.map((timer) => (
        < EditableTimer 
           key = {timer.id}
           title = {timer.title}
           project = {timer.project}
           elapsed = {timer.elapsed}
           runningSince = {timer.runningSince}
        />
      ));

        return (
           <div id = 'timers'>
              {timers}
           </div>
          );
    }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: true
  };

  render(){

    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id = {this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          id = {this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}

class TimerForm  extends Component {
  render() { 
    const submitText = this.props.title ? 'Update' : 'Create';
    return  (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}
 
class ToggleableTimerForm  extends Component {
  state = {
     isOpen: true
  };

  handleFormOpen = () =>  {
    console.log(" --- wow " +this.state.isOpen);
    this.setState({isOpen: true});
  }

  render() {  
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button onClick= {this.handleFormOpen}
            className='ui basic button icon'>
            <i className='plus icon'></i>
          </button>
        </div>
      );
    }
  }
}
  
class Timer  extends Component {
 
  render() { 
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon'></i>
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon'></i>
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
} 

