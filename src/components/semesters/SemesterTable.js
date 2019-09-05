import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SemesterTable extends Component {
    constructor(props) {
        super(props);
       // this.handleSubmit = this.handleSubmit.bind(this);
    }
   
  remove = () => {
    this.props.remove(this.props.id);
  }
    render() {
      return (

        <tr className="hover:bg-grey-lighter">
        <td className="py-4 px-6 border-b border-grey-light">{this.props.name}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.start_date}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.end_date}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.year}</td>
        <td className="py-4 px-6 border-b border-grey-light">
          <Link to={"edit/"+this.props.id}  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</Link>
          <button  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark" onClick={this.remove}>Remove</button>
        </td>
      </tr>

         
      );
    }
  }

export default SemesterTable;