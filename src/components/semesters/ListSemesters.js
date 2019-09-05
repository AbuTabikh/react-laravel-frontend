import React, {Component} from 'react'; 
import SemesterTable from "./SemesterTable";
import axios from "axios";
import Aside from "../../Aside";
import { Link } from "react-router-dom";


class ListSemesters extends Component {
  constructor(props){
    super(props);
    this.state = {value: '', semesters: '', errors: {}};

  }

  async componentDidMount(){
    const uri = process.env.REACT_APP_SERVER_IP + '/api/auth/semesters';

    axios.get(uri)
    .then(response => {
      this.setState({ semesters: response.data.data });
    })
    .catch(function (error) {
      console.log(error.response)
    })
    
  }

  productRow(){
    if(this.state.semesters instanceof Array){
      return this.state.semesters.map(function(object, i){
          return <SemesterTable obj={object} key={i} remove={this.remove} />;
      });
    }
  }

  
  handleRemoveProduct = (id) => {
    let uri = process.env.REACT_APP_SERVER_IP + `/api/auth/semesters/${id}`;
    axios.delete(uri);

    this.setState((prevState) => ({
      semesters: prevState.semesters.filter(item => item.id != id)
    }));
     
  }


    render() {
      return (
        <React.Fragment>
            <div className="flex w-full">
                <Aside/>
                <div className="flex flex-wrap  w-5/6">
                    <div className="w-full mt-5 mx-2 flex flex-col">
                        <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
                            <div className="border-b">
                                <div className="flex justify-between px-6 -mb-px">
                                    <h3 className="text-blue-dark py-4 font-normal text-lg">Semesters</h3>
                                    <Link to="/semesters/create" >
                                    <li className="bg-gray-900 py-1 px-3 mt-2 rounded text-white">Add Semesters</li>
                                    </Link>
                                </div>
                            </div>
                            <table className="text-left w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Start Date</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">End Date</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Year</th>
                                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(this.state.semesters).map(key => {
                                        const row = this.state.semesters[key];
                                        return <SemesterTable key={key} id={row.id} {...row}  remove={this.handleRemoveProduct} />
                                          })}
                              </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment>
      )
    }
}
export default ListSemesters;