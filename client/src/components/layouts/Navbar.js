import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        const { cart } = this.props;

        return (
            <div>
                <header>
                    <div className="logo">
                        <img src="./assets/images/logo.png " width="125px" />
                    </div>
                    <nav>
                        <ul id="MenuItems" className="menu-items nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/not-found">About</Link></li>
                            <li><Link to="/not-found">Contact</Link></li>
                            <li><Link to="/user_auth">Account</Link></li>
                        </ul>
                    </nav>
                    <Link to="/shopping_cart">
                        <img src="./assets/images/cart.png" width="30px" height="30px" alt="" />
                    </Link>
                    {cart.cartItem.length !== 0 ? (<span className='badge badge-warning' id='lblCartCount'>{cart.cartItem.length}</span>) : ''}

                    <img src="./assets/images/menu.png" className="menu-icon" id="menu-icon"
                    // onClick="menutoggle()"
                    />

                </header>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, {})(Navbar);
