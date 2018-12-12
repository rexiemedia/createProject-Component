import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../store/actions/projectActions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Redirect } from 'react-router-dom'
import Switch from 'react-switch'
import firebase from './fbConfig'
import FileUploader from 'react-firebase-file-uploader'


class CreateProject extends Component {

  state = {
    title: '',
    content: '',
    crimeWatch: false,
    entertainment: false,
    politics: false,
    sports: false,
    picture: '',
    pictureUrl: null,
    progress: 0,
  }
 
  handleUploadStart = () => this.setState({ progress: 0 });
  
  handleProgress = progress => this.setState({ progress });
  
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  
  handleUploadSuccess = filename => {
    this.setState({ picture: filename, progress: 100 });
    firebase.storage().ref("projectspics").child(filename).getDownloadURL()
      .then(url => this.setState({ pictureUrl: url }));
  };

  onHandleChange = (e) => {
    this.setState({ content: e });
   }

  onHandleChanges = (e) => {
    this.setState({ picture: e.target.value });  
  }
  
  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/');

    this.setState({
      title: '',
      content: '',
      crimeWatch: false,
      entertainment: false,
      politics: false,
      sports: false,
      picture: '',
      pictureUrl: null,
      progress: 0,
    });
  }

  render() {
    const { auth } = this.props;

    if (auth.uid !== 'OPMwH4QrCcc0oWMP') return <Redirect to='/signin' /> 
    return ( 
            <div className="container mt-2 mb-4 project-details">

                <form onSubmit={this.onHandleSubmit} className="bg-white rounded">
                    <div className="form-group">
                        <input
                        value={this.state.title}
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={e => {
                            this.setState({ title: e.target.value });
                        }}
                        ref="title"
                        className="form-control"
                        />
                    </div>
                    
                    <span className="category-title">Choose one Category</span>
                    <div className="row align-items-center mx-auto mt-4">
                    <div className="col">
                      <label htmlFor="normal-switch">
                        <span>Sports Category</span>
                        <Switch
                          onChange={e => {
                            this.setState({ sports: true });
                        }}
                          checked={this.state.sports}
                          className="react-switch"
                          id="normal-switch"
                        />
                      </label>
                      <span> {this.state.sports ? 'on' : 'off'}</span>
                    </div>
                    <div className="col">
                      <label htmlFor="normal-switch">
                        <span>Crime Category</span>
                        <Switch
                          onChange={e => {
                            this.setState({ crimeWatch: true });
                        }}
                          checked={this.state.crimeWatch}
                          className="react-switch"
                          id="normal-switch"
                        />
                      </label>
                      <span> {this.state.crimeWatch ? 'on' : 'off'}</span>
                      </div>
                      <div className="col">
                      <label htmlFor="normal-switch">
                        <span>Entertainment Cat.</span>
                        <Switch
                          onChange={e => {
                            this.setState({ entertainment: true });
                        }}
                          checked={this.state.entertainment}
                          className="react-switch"
                          id="normal-switch"
                        />
                      </label>
                      <span> {this.state.entertainment ? 'on' : 'off'}</span>
                      {/* <p>The switch is <span>{this.state.entertainment ? 'on' : 'off'}</span>.</p> */}
                      </div>
                      <div className="col">
                      <label htmlFor="normal-switch">
                        <span>Politics Category</span>
                        <Switch
                          onChange={e => {
                            this.setState({ politics: true });
                        }}
                          checked={this.state.politics}
                          className="react-switch"
                          id="normal-switch"
                        />
                      </label>
                      <span> {this.state.politics ? 'on' : 'off'}</span>
                      {/* <p>The switch is <span>{this.state.politics ? 'on' : 'off'}</span>.</p> */}
                      </div>
                    </div>
//This where the problem lies=====================================================================
                    <div className="form-group">
                      <label>Avatar:</label>
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        {this.state.pictureURL && <img src={this.state.pictureURL} />}
                        <FileUploader
                          accept="image/*"
                          name="avatar"
                          randomizeFilename
                          storageRef={firebase.storage().ref("projectspics")}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                        />
                    </div>                
//Ends here ==========================================================================================
               /*   I want to replace this below with the above.  
                    
                    <div className="form-group">
                        <ReactQuill
                        modules={CreateProject.mediaModules}
                        formats={CreateProject.mediaFormats}
                        value={this.state.imageUrl}
                        placeholder="image or Video"
                        onChange={this.onHandleChanges}
                        />
                    </div>
                 */
                    <div className="form-group">
                        <ReactQuill
                        modules={CreateProject.modules}
                        formats={CreateProject.formats}
                        value={this.state.content}
                        placeholder="Enter Content"
                        onChange={this.onHandleChange}
                        />
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
           </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      createProject: (project) => dispatch(createProject(project))
    }
}
  
  CreateProject.modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['code-block'],
      [{ 'color': [] }, { 'background': [] }],   
      [{ 'font': [] }],
      [{ 'align': [] }],
    ]
  };
  
  CreateProject.formats = [
    'header', 'bold', 'italic', 'underline',
    'strike', 'blockquote', 'list', 'bullet',
    'code-block', 'color', 'font', 'align'
  ];

  CreateProject.mediaModules = {
    toolbar: [
       ['link', 'image', 'video'],
    ]
  };
  
  CreateProject.mediaFormats = [
    'link', 'image', 'video'
  ];
  export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
