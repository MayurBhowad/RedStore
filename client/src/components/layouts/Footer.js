import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="footer-col-1">
                                <h3>Downloaad our app</h3>
                                <p>Download app for Android and ios mobile phone.</p>
                                <div className="app-logo">
                                    <img src="./assets/images/play-store.png" alt="" />
                                    <img src="./assets/images/app-store.png" alt="" />
                                </div>
                            </div>
                            <div className="footer-col-2">
                                <img src="./assets/images/logo-white.png" alt="" />
                                <p>our purpose is to sustainbly make the pleasure and benifts of sports accessible to many.</p>
                            </div>
                            <div className="footer-col-3">
                                <h3>usefull Links</h3>
                                <ul>
                                    <li>Coupons</li>
                                    <li>Blog post</li>
                                    <li>return policy</li>
                                    <li>join affiliate</li>
                                </ul>
                            </div>
                            <div className="footer-col-4">
                                <h3>Follow us</h3>
                                <ul>
                                    <li>Facebook</li>
                                    <li>Twitter</li>
                                    <li>instagram</li>
                                    <li>Youtube</li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                        <p className="copyright">CopyRight 2020</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
