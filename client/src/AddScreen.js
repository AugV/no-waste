import React, { Component } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class AddScreen extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            products: [],
            userEmail: "mock@email.com",
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            show: false,
            value: 'test'
        };


    }


    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 5000000);
        }
        this.setState({ intervalIsSet: null });
        console.log(this.props.email);
    }


    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = () => {
        axios.get('http://192.168.1.171:3001/api/productList')
            .then((res) => {
                this.setState({ products: res.data.data });
            }
            );
    }

    render() {
        const products = this.state.products;
        const listItems = products.map((d) =>
            <ListGroup.Item action onClick={this.handleShow}>
                <span style={{ float: 'left' }}>{d.strIngredient}</span>
                <span style={{ float: 'right' }}>{d.strDescription}</span>
            </ListGroup.Item>);
        return (
            <div>
                <ListGroup defaultActiveKey="#link1">
                    {listItems}
                </ListGroup>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter expiry date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Control onChange = {this.handleChange} placeholder="YYYY.MM.DD" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Add Product
                </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    handleChange(event) {
        // this.setState({ value: event.target.value });
        console.log(event.target.value);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleClose() {
        this.setState({ show: false });
        // console.log()

    }

    handleShow() {
        this.setState({ show: true });
    }
}

export default AddScreen;