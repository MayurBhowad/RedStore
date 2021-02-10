import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllProducts } from '../../redux/actions/product.action';

import Brands from './Brands'
import FeatureProducts from './FeatureProducts'
import LatestProducts from './LatestProducts'
import Offer from './Offer'
import Testimonials from './Testimonials'

class Home extends Component {

    render() {
        const { products, loading } = this.props.product;
        const { cart } = this.props;


        return (
            <div>
                <div className="small-container">
                    <h2 className="title">Featured Products</h2>
                    <FeatureProducts products={products} loading={loading} cart={cart} />
                    {/* <h2 className="title">Latest Products</h2>
                    <LatestProducts /> */}
                </div>
                <Offer />
                <Testimonials />
                <Brands />
            </div>
        )
    }
}
export default Home;
