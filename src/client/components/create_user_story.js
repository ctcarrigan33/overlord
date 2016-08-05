import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUserStory, fetchUserStories } from '../actions/index';

class StoryCreate extends Component {
  constructor(props){
    super(props);
    
    this.state = { title: '',
                   proj_id: '',
                   description: '',
                   status: ''
                  };
  
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onUserStory = this.onUserStory.bind(this);

  }

  onInputChange(e) {
      this.setState({ proj_id: e.target.value });
  }

  onUserStory(e) {
      this.setState({ description: e.target.value });
  }

  onTitle(e) {
      this.setState({ title: e.target.value });
  }

  onStatus(e) {
      this.setState({ status: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    let projectName = this.state.storyName;
    let proj_id = this.state.proj_id;
    let description = this.state.description;
    let status = this.state.status;

    console.log 
    this.props.createUserStory({ title, proj_id, description, status });
    this.setState({ title: '',
                    proj_id: '',
                    description: '',
                    status: ''
                  });
    this.props.closeUserStoryModal();
  }

  render() {
    return (
      <div>Create User Story
        <form className="user-story-input-group" onSubmit={this.onFormSubmit}>
          Project Name:<br />
          <input className="user-story-name-input" type="text" value={this.state.proj_id}
          onChange={this.onInputChange} /><br />
          Title:<br />
          <input className="user-story-input" type="text" value={this.state.title}
          onChange={this.onTitle} /><br />
          User Story:<br />
          <input className="user-story-input" type="text" value={this.state.description}
          onChange={this.onUserStory} /><br />
          Status:<br />
          <input className="user-story-input" type="text" value={this.state.status}
          onChange={this.onStatus} /><br />
          <span className="user-story-submit-btn">
            <input id="userStorySubmit" type="submit" value="Submit" />
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUserStory, fetchUserStories }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoryCreate);


