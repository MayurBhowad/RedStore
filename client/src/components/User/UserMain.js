import React, { Component } from 'react'
import Login from './Login'
import Register from './Register';
import { Link } from 'react-router-dom';


class UserMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formWindow: true
        }
    }

    render() {


        const loginForm = () => {
            this.setState({ formWindow: true })
        }
        const registerForm = () => {
            this.setState({ formWindow: false })
        }

        return (
            <div class="account-page">
                <div class="container">
                    <div class="row">
                        <div class="col-2">
                            <img src="./assets/images/image1.png" alt="" width="100%" />
                        </div>
                        <div class="col-2">
                            <div class="form-container">
                                <div class="form-btn">
                                    <span id="loginTab" onClick={loginForm}>Login</span>

                                    <span id="regTab" onClick={registerForm}>Register</span>
                                    {/* <hr id="indicator" /> */}
                                </div>
                                {this.state.formWindow ? (<Login />) : (<Register />)}
                                {/* <Login /> */}
                                {/* <Register /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserMain
