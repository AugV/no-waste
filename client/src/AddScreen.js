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
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            products: [],
            userEmail: "mock@email.com",
            intervalIsSet: false,
            show: false,

            productId: '',
            productName: '',
            description: '',
            expirydate: ''
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

    storeDataToDb = () => {
        var product = this.state.products.find((o) => { return o.idIngredient === this.state.productId });


        axios.post('http://192.168.1.171:3001/api/addProduct',
            {
                userEmail: this.state.userEmail,
                productId: this.state.productId,
                productName: product.strIngredient,
                description: product.strDescription,
                expirydate: this.state.expirydate,
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            }

    render() {
        const products = this.state.products;
        const listItems = products.map((d) =>
            <ListGroup.Item action data-id={d.idIngredient} onClick={this.handleShow.bind(this)}>
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
                        <Form.Control onChange={this.handleChange} placeholder="YYYY.MM.DD" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={this.handleAdd}>
                            Add Product
                </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    handleChange(event) {
        this.setState({ expirydate: event.target.value });
    }

    handleAdd() {
        this.setState({ show: false});
        this.storeDataToDb();
    }

    handleClose() {
        this.setState({ show: false, productId: '', expirydate: '' });
    }

    handleShow(event) {
        this.setState({ show: true, productId: event.currentTarget.dataset.id });
    }
}

export default AddScreen;