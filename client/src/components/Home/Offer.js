import React, { Component } from 'react'

class Offer extends Component {
    render() {
        return (
            <div>
                <div className="offer">
                    <div className="small-container">
                        <div className="row">
                            <div className="col-2">
                                <img src="./assets/images/exclusive.png" className="offer-img" alt="" />
                            </div>
                            <div className="col-2">
                                <p>Exclusively available on RedStroe</p>
                                <h1>Smart Band 4</h1>
                                <small>Dynamic AMOLED Colour-Display, Personal Activity Intelligence.
					Stress Monitoring, 5 Straps Colour Options, Camera Control & Many More.</small>
                                <a href="" className="btn">Buy Now &#8594; </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Offer
