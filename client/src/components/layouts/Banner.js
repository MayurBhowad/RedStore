import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {
    render() {
        return (
            <div>
                <section className="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <h1>New Start with <br /> A new Style!</h1>
                                <Link to="/products" className="btn">Explore Now &#8594;</Link>
                            </div>
                            <div className="col-2">
                                <img src="./assets/images/hiphop-png-dance-style.png" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Banner
