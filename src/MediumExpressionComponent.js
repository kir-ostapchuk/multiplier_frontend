// Oh shit, sorry for this :0

import React from 'react'
import {Alert, Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Keycloak from "keycloak-js";

const keycloak = Keycloak({
    url: 'http://localhost:8080/auth/',
    realm: 'multiplier',
    clientId: 'frontend-service'
});

export default class MediumExpressionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {keycloak: null, authenticated: false, accessToken: ''};
    }

    state = {
        previousFirstParameter: '',
        previousSecondParameter: '',
        firstParameter: '',
        secondParameter: '',
        resultBoolean: null
    }

    getExpression = () => {
        axios.create({headers: {Authorization: `Bearer ${keycloak.token}`}})
            .get('http://localhost:8081/api/v1/medium')
            .then(res => {
                this.setState({firstParameter: res.data.firstParameter, secondParameter: res.data.secondParameter})
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (event.target.result.value !== '') {
            this.setState({
                previousFirstParameter: this.state.firstParameter,
                previousSecondParameter: this.state.secondParameter

            })

            axios.create({headers: {Authorization: `Bearer ${keycloak.token}`}}).post(`http://localhost:8081/api/v1`, {
                firstParameter: this.state.firstParameter,
                secondParameter: this.state.secondParameter,
                userResult: event.target.result.value
            })
                .then(res => {
                    this.setState({
                        resultBoolean: res.data
                    })
                    event.target.result.value = ''
                })
                .then(this.getExpression);
        }
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({keycloak: keycloak, authenticated: authenticated, accessToken: keycloak.token})
        }).then(this.getExpression);
    }

    render() {
        if (this.state.authenticated)
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formExpression">
                        <Form.Label
                            class="display-4">{this.state.firstParameter} * {this.state.secondParameter}</Form.Label>
                        <Form.Control type="number" name="result"/>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit" size="lg">Check</Button>
                    {this.state.resultBoolean && <Alert variant="success">It's correct! <br/>
                        {this.state.previousFirstParameter} * {this.state.previousSecondParameter} = {this.state.previousFirstParameter * this.state.previousSecondParameter}
                    </Alert>}
                    {this.state.resultBoolean === false && <Alert variant="danger">It's wrong :(<br/>
                        Correct
                        is {this.state.previousFirstParameter} * {this.state.previousSecondParameter} = {this.state.previousFirstParameter * this.state.previousSecondParameter}
                    </Alert>}
                </Form>
            );
    }
}