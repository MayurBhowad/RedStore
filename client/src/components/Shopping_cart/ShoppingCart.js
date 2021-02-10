import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from './CartProduct';
import Spinner from '../Common/Spinner';

class ShoppingCart extends Component {
    render() {
        const { cartItem, loading } = this.props.cart;
        let productRow;
        let checkoutbtn = true;

        if (cartItem === null || loading) {
            productRow = <Spinner />
        } else {
            if (cartItem.length > 0) {
                productRow = cartItem.map(cartItems => (
                    <CartProduct cartItem={cartItems} />
                ))
            } else {
                productRow = (<tr> <h4>Your Shopping Cart is empty</h4></tr>);
                checkoutbtn = false;
            }
        }

        let cartSubTotal = [];
        if (cartItem) {
            cartItem.map(cartItem => {
                let discount_price;
                discount_price = ((cartItem.productDetails.price * cartItem.productDetails.discount) / 100);
                discount_price = cartItem.productDetails.price - discount_price;
                let productTotal = discount_price * cartItem.itemCount;
                cartSubTotal.push(productTotal);
            })
        } else {
            productRow = (<tr> <h4>Your Shopping Cart is empty</h4></tr>);
            checkoutbtn = false;
        }

        let cartSubTotalPrice = 0;
        cartSubTotal.map(price => cartSubTotalPrice = cartSubTotalPrice + price);

        let tax = 35;

        let totalPrice = cartSubTotalPrice + tax;

        return (
            <div>
                <div className="small-container cart-title">
                    <div className="row row-2">
                        <h2 className="title-2">Your Shopping Cart</h2>
                        <Link to="/">
                            <p>Go To Store</p>
                        </Link>
                    </div>
                </div>
                <div className="small-container cart-page">
                    <table>
                        <tbody>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>MRP</th>
                                <th>Amount</th>
                            </tr>
                            {productRow}
                        </tbody>
                    </table>

                    <div className="total-price">
                        <table>
                            <tbody>
                                <tr>
                                    <td>SubTotal</td>
                                    <td>Rs. {~~cartSubTotalPrice}/-</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>Rs. 35/-</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>Rs. {~~totalPrice}/-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="checkOut">
                    {checkoutbtn ? (
                        <Link to="/user_address" className="btn" >Check Out</Link>
                    ) : (
                            <Link to="/products" className="btn" >Shop Now</Link>
                        )}

                </div>
            </div>
        )
    }
}

ShoppingCart.propTypes = {
    cart: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    cart: state.cart
});


export default connect(mapStateToProps, {})(ShoppingCart);
