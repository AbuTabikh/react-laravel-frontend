import React, {Component} from 'react'; 
import Error from "../Error";
import axios from "axios";


class UpdateGrade extends Component {
  constructor(props){
    super(props);
    this.state = {course: {}, grade : null , errors: {}};

  }

  
  componentDidMount(){
    let editUri = process.env.REACT_APP_SERVER_IP +  `/api/auth/courses/${this.props.match.params.id}`;
    axios.get(editUri)
    .then(response   => {
        
      this.setState({ course: response.data.data, grade:response.data.data.grade});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
 
  handleForm = e => {
    e.preventDefault();
    const grade = {
        grade: this.state.grade,
      }
    let uri = process.env.REACT_APP_SERVER_IP +  `/api/auth/courses/${this.props.match.params.id}`;

    axios
      .put(uri, grade)
      .then(res => {
        this.props.history.push("/search")
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };
 
  
  
  handleGrade = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
 

    render() {
      return (
        <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Update Mark</h1>
              <Error
                error={
                  this.state.errors["result"]
                    ? this.state.errors["result"]
                    : null
                }
              />
              <div className="mt-4">
                <label>Student Name</label>
                <input
                  type="text"
                  name="name"
                  disabled
                  value={this.state.course.student}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                
              </div>
              <div className="mt-4">
                <label>Student Id</label>
                <input
                  type="text"
                  name="studentId"
                  disabled
                  value={this.state.course.studentId}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                 
              </div>
              <div className="mt-4">
                <label>Module</label>
                <input
                  type="text"
                  name="course"
                  value={this.state.course.module}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                
              </div>
              <div className="mt-4">
                <label>Grade</label>
                
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.handleGrade}
                  className="mt-1 p-2 bg-green-200 rounded border border-gray-400 w-full"
                />
                
              </div>

              <div className="mt-4">
                <input
                  type="submit"
                  value="Update"
                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      )
    }
}
export default UpdateGrade;