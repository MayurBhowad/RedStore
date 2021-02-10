import React, { Component } from 'react'
import Spinner from '../Common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductItem from './products/ProductItem';
import { getAllProducts } from '../../redux/actions/product.action';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 4,
        }
    }

    componentDidMount() {
        this.props.getAllProducts(this.state.page, this.state.limit);
    }

    render() {
        const { products, loading, totalProducts } = this.props.product;
        const { cartItem } = this.props.cart;
        let productItem;
        let addedProducts = [];

        if (cartItem) {
            cartItem.map(item => {
                addedProducts.push(item.productNumber);
            })
        }

        if (products === null || loading) {
            productItem = <Spinner />
        } else {
            if (products) {
                if (products.length > 0) {
                    productItem = products.map(product => (
                        <ProductItem key={product._id} product={product} added={addedProducts} />
                    ))
                }
            }
            else {
                productItem = <h4>No product found...</h4>
            }
        }

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalProducts / this.state.limit); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div className="small-container">
                    <div className="row row-2">
                        <h2 className="title-2">All Products</h2>
                        <select name="" id="">
                            <option value="">Sort By</option>
                            <option value="">Sort by Price</option>
                            <option value="">Sort by popularity</option>
                            <option value="">Sort by rating</option>
                            <option value="">Sort by sale</option>
                        </select>
                    </div>
                    <div className="row">
                        {productItem}
                    </div>

                    <div className="pages-config">
                        <div className="page-btn">
                            <p>Page No.</p>
                            {pageNumbers.map(number => (
                                <span key={number}>
                                    <li key={number} className={this.state.page === number ? "active" : ""}
                                        onClick={() => this.setState({ page: number }, () => { this.componentDidMount() })}>
                                        {number}
                                    </li>
                                </span>
                            ))}
                            <span>&#8594;</span>
                        </div>

                        <div className="page-btn">
                            <p>Item Count per page</p>
                            <span className={this.state.limit === 4 ? "active" : ""}
                                onClick={() => { this.setState({ limit: 4 }, () => { this.componentDidMount() }) }} >4</span>
                            <span className={this.state.limit === 8 ? "active" : ""}
                                onClick={() => { this.setState({ limit: 8 }, () => { this.componentDidMount() }) }}
                            >8</span>
                            <span className={this.state.limit === 12 ? "active" : ""}
                                onClick={() => { this.setState({ limit: 12 }, () => { this.componentDidMount() }) }} >12</span>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Products.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
})


export default connect(mapStateToProps, { getAllProducts })(Products);
