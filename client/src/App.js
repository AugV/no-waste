
// import * as bs from 'bootstrap/dist/css/bootstrap.css';
// import * as bst from 'bootstrap/dist/css/bootstrap-theme.css';
import React, { Component } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import {Button} from 'react-bootstrap';


class App extends Component {
  // initialize our state 
  state = {
    products: [],
    userEmail:"mock@email.com",
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };


  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 50000);
    }
    // this.setState({ intervalIsSet: null });
  }

  
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }



 
  getDataFromDb = () => {
    axios.get('http://localhost:3001/api/userData',
      { params: { userEmail: this.state.userEmail } })
      .then((res) => {
        this.setState({ products: res.data.data.products });
        console.log(this.state.products);
      }
      );



    // fetch("http://localhost:3001/api/userData")
    //   .then(data => data.json())
    //   .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  // putDataToDB = message => {
  //   let currentIds = this.state.data.map(data => data.id);
  //   let idToBeAdded = 0;
  //   while (currentIds.includes(idToBeAdded)) {
  //     ++idToBeAdded;
  //   }

  //   axios.post("http://localhost:3001/api/putData", {
  //     id: idToBeAdded,
  //     message: message
  //   });
  // };


  // our delete method that uses our backend api 
  // to remove existing database information
  // deleteFromDB = idTodelete => {
  //   let objIdToDelete = null;
  //   this.state.data.forEach(dat => {
  //     if (dat.id == idTodelete) {
  //       objIdToDelete = dat._id;
  //     }
  //   });

  //   axios.delete("http://localhost:3001/api/deleteData", {
  //     data: {
  //       id: objIdToDelete
  //     }
  //   });
  // };


  // // our update method that uses our backend api
  // // to overwrite existing data base information
  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   this.state.data.forEach(dat => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post("http://localhost:3001/api/updateData", {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply }
  //   });
  // };


  render() {
    const products = this.state.products;
    const listItems = products.map((d) => <li key={d.productId}>{d.productName}</li>);
    return (
      <div>
   <Button variant="success">Success</Button>
</div>
     );
  }
}

export default App;