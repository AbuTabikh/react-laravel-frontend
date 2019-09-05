import React, {Component} from 'react'; 
import Error from "../Error";
import axios from "axios";


class UpdateSemester extends Component {
  constructor(props){
    super(props);
    this.state = {name: '', startDate: '', endDate: '', year : '', errors: {}};
 

  }

  
  componentDidMount(){
    let editUri = process.env.REACT_APP_SERVER_IP +  `/api/auth/semesters/${this.props.match.params.id}`;
    axios.get(editUri)
    .then(response   => {
      this.setState({ 
              name: response.data.data.name, 
              startDate: response.data.data.start_date, 
              endDate: response.data.data.end_date, 
              year: response.data.data.year, 
            });
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
    const semesters = {
        name: this.state.name,
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        year: this.state.year
      }
    let uri = process.env.REACT_APP_SERVER_IP +  `/api/auth/semesters/${this.props.match.params.id}`;

    axios
      .put(uri, semesters)
      .then(res => {
        this.props.history.push("/semesters/list")
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };
 

    render() {
      return (
        <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Update Semester</h1>
              <Error
                error={
                  this.state.errors["result"]
                    ? this.state.errors["result"]
                    : null
                }
              />
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Title"
                  value={this.state.name}
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["name"]
                      ? this.state.errors["name"]
                      : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  placeholder="Product Title"
                  value={this.state.startDate}
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["start_date"]
                      ? this.state.errors["start_date"]
                      : null
                  }
                />
              </div>

              <div className="mt-4">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  placeholder="Product Title"
                  value={this.state.endDate}
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["name"]
                      ? this.state.errors["name"]
                      : null
                  }
                />
              </div>

              
              <div className="mt-4">
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  placeholder="Product Title"
                  value={this.state.year}
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["year"]
                      ? this.state.errors["year"]
                      : null
                  }
                />
              </div>

               <div className="mt-4">
                <input
                value = "Update"
                  type="submit"
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
export default UpdateSemester;