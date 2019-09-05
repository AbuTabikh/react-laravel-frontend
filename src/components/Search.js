import React, {Component} from 'react'; 
import axios from "axios";
import Select from 'react-select';
import Aside from "../Aside";
import GradeTable from "./course/GradeTable";

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
        programmes : {},
        semesters : {},
        modules : {},
        grades : {},
        programmeSelectedOption : null,
        semesterSelectedOption : null,
        moduleSelectedOption : null
    };
 
  }
 

    //   Get Modules
  handleSemesterChange = semesterSelectedOption => {
    this.setState({ semesterSelectedOption, moduleSelectedOption:null });
    const uri = process.env.REACT_APP_SERVER_IP + `/api/auth/semesters/modules/${semesterSelectedOption.value}`;

    axios.get(uri)
    .then(response => {
      const content = response.data.data.map((value) => {
        return (
            { label: value.name, value: value.id }
        );
      });
      this.setState({ modules: content });
    })
    .catch(function (error) {
      console.log(error.response)
    })
    
    console.log(`Option selected:`, semesterSelectedOption.value);
  };
  

    //   Get Modules
    handleModuleChange = moduleSelectedOption => {
    this.setState({ moduleSelectedOption });
  };
  
  handleProgrammeChange = programmeSelectedOption => {
    this.setState({ programmeSelectedOption });
  };
  
  
  async componentDidMount(){
    const uri = process.env.REACT_APP_SERVER_IP + '/api/auth/semesters';
    axios.get(uri)
    .then(response => {
      const content1 = response.data.data.map((value) => {
        return (
            { label: value.name, value: value.id }
        );
      });
      this.setState({ semesters: content1 });
    })
    .catch(function (error) {
      console.log(error.response)
    })
    
    
    const programmeUri = process.env.REACT_APP_SERVER_IP + '/api/auth/programmes';
    axios.get(programmeUri)
    .then(response => {
      const content1 = response.data.data.map((value) => {
        return (
            { label: value.name, value: value.id }
        );
      });
      this.setState({ programmes: content1 });
    })
    .catch(function (error) {
      console.log(error.response)
    })
    

  }

   
  handleForm = e => {
    e.preventDefault();
    if(this.state.semesterSelectedOption == null || this.state.moduleSelectedOption == null  ){

      alert('Please select semetser and module ');
      return false
    }
    const filters = {
        semester: this.state.semesterSelectedOption.value,
        module: this.state.moduleSelectedOption.value
      }
    let uri = process.env.REACT_APP_SERVER_IP + '/api/auth/grades';

    axios
      .post(uri, filters)
      .then(response => {
        this.setState({ grades: response.data.data });
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };
 

  
  handleRemoveMark = (id) => {
    // let uri = process.env.REACT_APP_SERVER_IP + `/api/auth/products/${id}`;
    // axios.delete(uri);

    this.setState((prevState) => ({
      grades: prevState.grades.filter(item => item.id != id)
    }));
     
  }

    render() {

      return (
        
        <div className="flex w-full">
        <Aside/>
        

        <div className="flex flex-wrap  w-5/6">
            <div className="w-full mt-5 mx-2 flex flex-col">
                <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
                    <div className="border-b">
                        <div className="flex justify-between px-6 -mb-px">
                            <h3 className="text-blue-dark py-4 font-normal text-lg">Search</h3>
                        </div>
                    </div>
                    <form onSubmit={this.handleForm}>
                    <div className="flex flex-wrap   mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                              Programme
                            </label>
                            <div className="relative">
    
                                <Select className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full" 
                                options={this.state.programmes && Object.keys(this.state.programmes).length> 0 ? this.state.programmes : []} 
                                value={this.state.programmeSelectedOption} 
                                onChange={this.handleProgrammeChange} />
    
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Semester
                            </label>
                            <div className="relative">
    
                                <Select className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full" 
                                options={this.state.semesters && Object.keys(this.state.semesters).length> 0 ? this.state.semesters : []} 
                                value={this.state.semesterSelectedOption} 
                                onChange={this.handleSemesterChange} />
    
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Module
                            </label>
                            <div className="relative">
                                <Select className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full" 
                                options={this.state.modules && Object.keys(this.state.modules).length> 0 ? this.state.modules : []} 
                                value={this.state.moduleSelectedOption} 
                                onChange={this.handleModuleChange} />
    
                            </div>
                        </div>
                        </div>
                        <div className="flex md:flex-row-reverse flex-wrap">

                        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                            
                            <input 
                            type="submit" value="Search"
                            className="p-2  w-full border border-gray-400 rounded cursor-pointer bg-purple-600 hover:bg-purple-500 text-white  "
                            />
                        </div>
                        
                        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                          { Object.keys(this.state.grades).length>0 && 
                            <input 
                            type="button" value="Add new"
                            className="p-2  w-full border border-gray-400 rounded cursor-pointer bg-green-600 hover:bg-green-500 text-white  "
                            />
                          }
                            
                        </div>
                        
    
                    </div>
                    <div className="flex md:flex-row-reverse flex-wrap">
                    <table className="text-left w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Student Id</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Student Name</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Couse</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Semester</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Grade</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(this.state.grades).map(key => {
                                        const row = this.state.grades[key];
                                        return <GradeTable key={key} id={row.id} {...row}  remove={this.handleRemoveMark} />
                                          })}
                              </tbody>
                            </table>
                            
                    </div>
                   
                    </form>
                </div>
            </div>
        </div>
        
    </div>
      )
    }
}
export default Search;