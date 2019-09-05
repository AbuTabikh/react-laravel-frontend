import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Aside =  ({ component: Component, ...rest }) => {
      return (
        <aside className={(rest.userRole == 1) ? "w-1/6 bg-black h-screen" : "w-1/6 bg-orange-600 h-screen"}  >
        <ul className="text-white p-4">
          <Link to="/profile">
            <li className="bg-gray-900 py-1 px-3 rounded">Profile</li>
          </Link>
          {
            (rest.userRole == 1) &&
            <React.Fragment>
            <Link to="/search" >
            <li className="bg-gray-900 py-1 px-3 mt-2 rounded">Search</li>
            </Link>
            <Link to="/semesters/list" >
            <li className="bg-gray-900 py-1 px-3 mt-2 rounded">Manage Semesters</li>
            </Link>
             </React.Fragment>
          }
        </ul>
      </aside>
      );
    }

  
const mapStateToProps = state => {
  return {
    userRole: state.auth.user.role,
  };
};

export default connect(mapStateToProps)(Aside);
