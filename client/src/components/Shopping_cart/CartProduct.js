import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCartMain, increaseQnt, decreaseQnt, removeProduct } from '../../redux/actions/cart.action';

class cartProduct extends Component {
    render() {
        const { cartItem } = this.props;

        const quantityOpIncrease = (e, productNumber) => {
            e.preventDefault();
            this.props.increaseQnt(productNumber);
        }
        const quantityOpDecrease = (e, productNumber) => {
            e.preventDefault();
            if (cartItem.itemCount > 1) {
                this.props.decreaseQnt(productNumber)
            }
        }

        const removeProducts = (e, productNumber) => {
            e.preventDefault();
            this.props.removeProduct(productNumber)
        }

        let discount_price;
        discount_price = ((cartItem.productDetails.price * cartItem.productDetails.discount) / 100);
        discount_price = cartItem.productDetails.price - discount_price;

        return (
            <tr>
                <td key={cartItem.productDetails._id}>
                    <div className="cart-info">
                        <img src={cartItem.productDetails.productImages[0]} alt="" />
                        <div>
                            <p>{cartItem.productDetails.productName}</p>
                            <small>Price: Rs. {cartItem.productDetails.price}/-</small>
                            <br />
                            <a href="" onClick={e => removeProducts(e, cartItem.productNumber)}><strong>Remove</strong></a>
                        </div>
                    </div>
                </td>
                <td>
                    <a href="" className="btn" value="" onClick={e => quantityOpDecrease(e, cartItem.productNumber)} >-</a>
                    <input type="number" value={cartItem.itemCount} />
                    <a href="" className="btn" value="" onClick={e => quantityOpIncrease(e, cartItem.productNumber)}  >+</a>

                </td>
                <td>Rs. {cartItem.productDetails.price * cartItem.itemCount} /-</td>
                <td>Rs. {~~discount_price * cartItem.itemCount} /-</td>
            </tr>
        )
    }
}

cartProduct.propTypes = {
    increaseQnt: PropTypes.func.isRequired,
    decreaseQnt: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
}

export default connect(null, { increaseQnt, decreaseQnt, removeProduct })(cartProduct)
