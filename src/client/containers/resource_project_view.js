
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../actions/project_actions';
import { fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/story_actions';
import { assignResource } from '../actions/resources_actions';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { Link } from 'react-router';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';
import StoryCreate from '../components/create_user_story';
import Dragula from 'react-dragula';

class ResourceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProjectModal: false,
      createStoryModal: false,
      selectedProjID: 0
    };
    this.showEditProjectModal = this.showEditProjectModal.bind(this);
    this.hideEditProjectModal = this.hideEditProjectModal.bind(this);
    this.showCreateStoryModal = this.showCreateStoryModal.bind(this);
    this.hideCreateStoryModal = this.hideCreateStoryModal.bind(this);
    // need to provide this component to the dragulaDecorator
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }

  showEditProjectModal(){
    this.setState({ editProjectModal: true });
  }

  hideEditProjectModal(){
    this.setState({ editProjectModal: false });
  }

  showCreateStoryModal(projectId){
    this.setState({ createStoryModal: true,
      selectedProjID: projectId
     });
  }

  hideCreateStoryModal(){
    this.setState({ createStoryModal: false });
  }

  remainingDays(dueDate){
   var today = new Date()
   var dueFormatted = new Date(dueDate)
   var remainingMS = dueFormatted - today
   var remainingDays = Math.ceil(remainingMS / (1000*60*60*24))
   return remainingDays
  }
   dragulaDecorator(componentBackingInstance){
    console.log(this)
    let assignResource = this.props.assignResource;

    if (componentBackingInstance) {

      Dragula([componentBackingInstance, document.querySelector('.left')])
      .on('drop', function(el, target){
        if(target !== document.querySelector('.fire')){
          console.log('inprojects this is also not in fire bro')
        assignResource(el.id, target.id)
        }
      })
    }
  };
    onDelete(projectId){
    this.props.deleteProject(projectId)
    .then(()=> {
      this.props.fetchProjects();
    })
  }
  render() {
    return (
      <div id="projects-resources">
      <h3 className="title">Projects</h3>

      { this.props.projectList[0] ? this.props.projectList[0].map( project => {

        return (
          <div key={project.proj_name}>
            <Link to={"/project_view"+project.project_id} className="proj-name">{project.proj_name}</Link>
            <button className="button proj-edit" onClick={this.showEditProjectModal}>Edit</button>
            <p className="">{this.remainingDays(project.due)} DAYS LEFT!</p>
            <button className="delete-btn" onClick={() => this.onDelete(project.project_id)}>Delete</button>
            <div>
            <div id={project.project_id} key={project.project_id} className='right container' ref={this.dragulaDecorator}>
                <div className="item"> Drag resources here </div>
                 { project.resources ? project.resources.filter(r => r.res_name !== '').map( r => {
            return (
            <div id={r.res_id} className="item image-thing" key={r.res_name}><img src= {`/images/${r.res_img}`}></img> <br/> {r.res_name}
            </div>
          );
        } ) : null }
            </div>
            </div>
          </div>
        );
      } ) : null }


      </div>
    )
  }
}

export default connect(null, { assignResource, fetchProjects, deleteProject, fetchUserStories, createUserStory, deleteStory, updateStatus })(ResourceView);
