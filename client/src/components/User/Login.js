import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <div>
                <form action="" id="loginForm">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button class="btn" type="submit">login</button>
                    <a href="">forgot password</a>
                </form>
            </div>
        )
    }
}

export default Login
