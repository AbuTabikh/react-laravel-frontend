import React, { Component } from 'react';
import { Link } from "react-router-dom";

class GradeTable extends Component {
    constructor(props) {
        super(props);
    }
   
  remove = () => {
    this.props.remove(this.props.id);
  }
    render() {
      return (

        <tr className="hover:bg-grey-lighter">
        <td className="py-4 px-6 border-b border-grey-light">{this.props.studentId}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.student}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.module}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.semester}</td>
        <td className="py-4 px-6 border-b border-grey-light">{this.props.grade}</td>
        <td className="py-4 px-6 border-b border-grey-light">
       
          <Link to={"course/grade/edit/"+this.props.id}  className="p-2 border-gray-400  cursor-pointer bg-green-600 text-white  hover:bg-black">Edit</Link>
          <button  className="p-2 border-gray-400  cursor-pointer bg-red-600 text-white  hover:bg-black" onClick={this.remove}>Remove</button>
        </td>
      </tr>

         
      );
    }
  }

export default GradeTable;