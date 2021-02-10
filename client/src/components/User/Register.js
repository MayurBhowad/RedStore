import React, { Component } from 'react'

class Register extends Component {
    render() {
        return (
            <div>
                <form action="" id="regForm">
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button class="btn" type="submit">Register</button>

                </form>
            </div>
        )
    }
}

export default Register
