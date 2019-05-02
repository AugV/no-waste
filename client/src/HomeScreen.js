import React, { Component } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';

class HomeScreen extends Component {
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }
    // initialize our state 
    state = {
        products: [],
        userEmail: "mock@email.com",
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    };


    routeChange() {
        let path = `/about/`;
        this.props.history.push(path);
    }

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 50000);
        }
        
    }


    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }


    getDataFromDb = () => {
        axios.get('http://192.168.1.171:3001/api/userData',
            { params: { userEmail: this.state.userEmail } })
            .then((res) => {
                this.setState({ products: res.data.data.products });
            }
            );
    }


    render() {
        const products = this.state.products;
        const listItems = products.map((d) =>
            <ListGroup.Item action>
                <span style={{ float: 'left' }}>{d.productName}</span>
                <span style={{ float: 'right' }}>{d.expirydate}</span>
            </ListGroup.Item>);

        return (
            <ListGroup defaultActiveKey="#link1">
                {listItems}
            </ListGroup>
        );
    }
}

export default withRouter(HomeScreen);