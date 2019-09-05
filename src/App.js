import React from "react";
import "./css/tailwind.css";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
 
// Semester
import ListSemesters from './components/semesters/ListSemesters';
import CreateSemester from './components/semesters/CreateSemester';
import UpdateSemester from './components/semesters/UpdateSemester';

// search
import Search from "./components/Search";
import UpdateGrade from "./components/course/UpdateGrade";

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthRoute  role='' path="/profile" component={Profile} />
         
           
          <AuthRoute role='1' path="/semesters/list" component={ListSemesters} />
          <AuthRoute role='1' path="/semesters/create" component={CreateSemester} />
          <AuthRoute role='1' path="/semesters/edit/:id" component={UpdateSemester} />



          <AuthRoute role='1' path="/search" component={Search} />
          <AuthRoute role='1' path="/course/grade/edit/:id" component={UpdateGrade} />
        </div>
      </Layout>
    </Router>
  );
}

export default App;