import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "./Aside";
import Alert from "./components/Alert";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { email: props.email, name: props.name, errors: {}, isUpdated : false };
  }

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleForm = e => {
    e.preventDefault();
    const data = { email: this.state.email, name: this.state.name };
    console.log(data)
    axios
      .patch("http://localhost:8000/api/auth/update", data)
      .then(res => {
        console.log(res.data);
        this.setState({ isUpdated: true })
      })
      .catch(e => this.setState({ errors: e.response.data }));
  };

  render() {
    return (
      <React.Fragment>
            <div className="flex w-full">
                <Aside/>
                <div className="flex flex-wrap  bg-white mt-5 ml-5 w-2/6">
                    <div className="w-full mt-5 mx-2 flex flex-col">
                    {this.state.isUpdated && <Alert /> }
             
              <form className="" onSubmit={this.handleForm}>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Username
                      </label>
                      <input type="text" name="name" id="name" placeholder="Your great name" onChange={this.handleInput} value={this.state.name} className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full" />
                  </div>
                  <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          email
                      </label>
                      <input type="email" name="email" id="email"  placeholder="Lovely Email" onChange={this.handleInput} value={this.state.email} className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full" />
                  </div>
  
              <p className="text-center">
              <input
                  type="submit"
                  value="Update"
                  className="p-2 rounded border border-gray-400 w-full rounded cursor-pointer text-white bg-purple-600"
                />

              </p>
              </form>

          </div>
  
      </div>
      </div>
  
    </React.Fragment>

      
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email
  };
};
export default connect(
  mapStateToProps,
  null
)(Profile);