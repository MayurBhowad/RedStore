import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProductItemmew extends Component {
    render() {
        const { product } = this.props;
        let discount_price;

        discount_price = ((product.price * product.discount) / 100);
        discount_price = product.price - discount_price;
        return (

            <div className="col-4">
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
                <a href="" className="btn">Add To Cart</a>
            </div>

        )
    }
}

ProductItemmew.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItemmew
