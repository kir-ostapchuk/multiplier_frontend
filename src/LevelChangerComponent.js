import {Button, ButtonGroup} from "react-bootstrap";
import React from "react";
import APIService from "./service/APIService";

export default class LevelChangerComponent extends React.Component {

    // state = {
    //     previousFirstParameter: '',
    //     previousSecondParameter: '',
    //     firstParameter: '',
    //     secondParameter: '',
    //     resultBoolean: null
    // }
    //
    easyMode = event => {
        event.preventDefault();

        APIService.post(`api/v1`, {
            firstParameter: this.state.firstParameter,
            secondParameter: this.state.secondParameter,
            userResult: event.target.result.value
        })
            .then(res => {
                this.setState({
                    resultBoolean: res.data
                })
                event.target.result.value = ''
            });
        this.componentDidMount()
    }
    //
    // componentDidMount(){
    //     APIService.get('/api/v1/easy')
    //         .then(res => {
    //             this.setState({firstParameter: res.data.firstParameter, secondParameter: res.data.secondParameter})
    //         })
    //         .catch(function (ex) {
    //             console.log('Response parsing failed. Error: ', ex);
    //         });
    // }

    render() {
        return (
            <ButtonGroup aria-label="Difficulty">
                <Button variant="secondary" onClick={this.easyMode}>Easy</Button>
                <Button variant="secondary" onClick={this.mediumMode}>Medium</Button>
                <Button variant="secondary" onClick={this.hardMode}>Hard</Button>
            </ButtonGroup>
        )
    }
}