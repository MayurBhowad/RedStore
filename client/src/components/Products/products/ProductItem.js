import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCartMain, removeFromCartMain } from '../../../redux/actions/cart.action';
import { getProductByProductNumber } from '../../../redux/actions/product.action';
import Spinner from '../../Common/Spinner';


class ProductItem extends Component {


    render() {
        const { product } = this.props;
        const { added } = this.props;
        let addRemoveBtn;

        addRemoveBtn = added.includes(product.productNumber);

        //DISCOUNT CALCULATION
        let discount_price;
        discount_price = ((product.price * product.discount) / 100);
        discount_price = product.price - discount_price;

        //ADD TO CART
        const addToCart = (e, productNumber) => {
            e.preventDefault();
            this.props.addToCartMain(productNumber);
        }

        //REOMOVE FROM CART
        const removeFromCart = (e, productNumber) => {
            e.preventDefault();
            this.props.removeFromCartMain(productNumber);
        }

        return (
            <div className="col-4" >
                <Link to={`/single_product/${product.productNumber}`}>
                    <img src={product.productImages[0]} alt="" />
                    <h4>{product.productName}</h4>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <p>Rs.{discount_price} <del>Rs. {product.price} /-</del></p>
                </Link>
                {addRemoveBtn ?
                    (<a href="" className="btn-rm" value={product._id} onClick={(e) => removeFromCart(e, product.productNumber)}>Added to cart</a>) :
                    <a href="" className="btn" value={product._id} onClick={(e) => addToCart(e, product.productNumber)}>Add To Cart</a>
                }
            </div>

        )
    }
}

ProductItem.propTypes = {
    addToCartMain: PropTypes.func.isRequired,
    removeFromCartMain: PropTypes.func.isRequired,
    getProductByProductNumber: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

export default connect(null, { addToCartMain, removeFromCartMain, getProductByProductNumber })(ProductItem);
