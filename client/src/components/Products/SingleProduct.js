import React, { Component } from 'react';
import Slider from "react-slick";
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCartMain, removeFromCartMain } from '../../redux/actions/cart.action';
import { getProductByProductNumber } from '../../redux/actions/product.action';
import Spinner from '../Common/Spinner';
import FeatureProducts from '../Home/FeatureProducts';

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainImageSrc: '',
            id: ''
        }
    }

    componentDidMount() {
        this.setState({ mainImageSrc: '' });


        if (this.props.match.params.id) {
            this.props.getProductByProductNumber(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ mainImageSrc: '' });
        if (props.match.params.id === this.state.id) {
            //
        } else {
            this.setState({ id: props.match.params.id });
            this.props.getProductByProductNumber(props.match.params.id);
        }
    }


    render() {
        const { products, product, loading } = this.props.product;
        const { cart } = this.props;
        const { cartItem } = this.props.cart;
        const { productImages, category, sizes } = this.props.product.product;
        let productDisplay;
        let imageShowcase;
        let mainImg;
        let addedProducts = [];
        let addremovebtn;
        let categorys, sizess;

        cartItem.map(item => {
            addedProducts.push(item.productNumber);
        })
        addremovebtn = addedProducts.includes(product.productNumber);

        //DISCOUNT CALCULATION
        let discount_price;
        discount_price = ((product.price * product.discount) / 100);
        discount_price = product.price - discount_price;

        if (category) {
            categorys = category.map((item, i) =>
                (<sapn key={i}> | {item}</sapn>)
            )
        }

        if (sizes) {
            sizess = sizes.map((item, i) =>
                (<option key={i} value="">{item}</option>)
            )
        }

        const showImg = (e, img) => {
            e.preventDefault();
            mainImg = null
            this.setState({ mainImageSrc: img });
        }


        if (productImages === null || loading) {
            imageShowcase = <Spinner />
        } else {

            if (productImages) {
                !this.state.mainImageSrc ? (this.setState({ mainImageSrc: productImages[0] })) :
                    (
                        imageShowcase = productImages.map(img =>
                            (
                                this.state.mainImageSrc !== img ?
                                    <div className="small-img-col">
                                        <img src={img}
                                            width="100%"
                                            className="small-img"
                                            alt=""
                                            onClick={e => showImg(e, img)} />
                                    </div>
                                    : ''
                            )
                        )
                    )
            }
        }
        if (product === null || loading) {
            productDisplay = <Spinner />
        } else {
            productDisplay = (
                <div className="small-container single-product">
                    <div className="row">
                        <div className="col-2">
                            <img src={this.state.mainImageSrc} width="100%" alt="" id="productImg" />

                            <div className="small-img-row">
                                {imageShowcase}
                            </div>
                        </div>
                        <div className="col-2">
                            <p>{categorys}</p>
                            <h1>{product.productName}</h1>
                            <h4><del>Rs. {product.price} /-</del> Rs. {discount_price}/-</h4>
                            <select name="" id="">
                                <option value="">Select Size</option>
                                {sizess}
                            </select>
                            <input type="number" value="1" />
                            {addremovebtn ? (<a href="" className="btn-rm" onClick={(e) => removeFromCart(e, product.productNumber)}>Added to cart</a>) : (<a href="" className="btn" onClick={(e) => addToCart(e, product.productNumber)}>Add to Cart</a>)}
                            <h3>Product Details <i className="fa fa-indent"></i></h3>
                            <br />
                            <p>Give your Summer wordrobe a style upgrade with the HRX Men's
                            Active T-shirt. Team it with a pair of shorts for
                            your morning workout or a denims for an evening out with the guys.
                </p>
                        </div>
                    </div>
                </div>
            )
        }

        //ADD TO CART
        const addToCart = (e, productNumber) => {
            e.preventDefault();
            this.props.addToCartMain(productNumber);
        }

        const removeFromCart = (e, productNumber) => {
            e.preventDefault();
            this.props.removeFromCartMain(productNumber);
        }

        return (
            <div>
                {productDisplay}

                {/* <!-- --------------------title-------------------- --> */}
                <div className="small-container">
                    <div className="row row-2">
                        <h2 className="title-2">Related Products</h2>
                        <p><Link to="/products">View more</Link></p>
                    </div>
                </div>

                {/* <!-- ---------products---------------- --> */}
                <div className="small-container">
                    <FeatureProducts products={products} loading={loading} cart={cart} />
                </div>
            </div>
        )
    }
}

SingleProduct.propTypes = {
    getProductByProductNumber: PropTypes.func.isRequired,
    addToCartMain: PropTypes.func.isRequired,
    removeFromCartMain: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
})

export default connect(mapStateToProps, { getProductByProductNumber, addToCartMain, removeFromCartMain })(SingleProduct);
