import React, { Component } from 'react'

class Brands extends Component {
    render() {
        return (
            <div>
                <div className="brands">
                    <div className="small-container">
                        <div className="row">
                            <div className="col-5">
                                <img src="./assets/images/logo-godrej.png" alt="" />
                            </div>
                            <div className="col-5">
                                <img src="./assets/images/logo-oppo.png" alt="" />
                            </div>
                            <div className="col-5">
                                <img src="./assets/images/logo-coca-cola.png" alt="" />
                            </div>
                            <div className="col-5">
                                <img src="./assets/images/logo-paypal.png" alt="" />
                            </div>
                            <div className="col-5">
                                <img src="./assets/images/logo-philips.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Brands
