import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllProducts } from '../redux/actions/product.action';

import Home from '../components/Home/Home';
import Banner from '../components/layouts/Banner';



class home extends Component {
    componentDidMount() {
        this.props.getAllProducts(1, 6);
    }


    render() {
        const { product, cart } = this.props;
        // console.log(products);



        return (
            <div>
                <Banner />
                {/* <!-- Featured categories --> */}

                <div className="categories">
                    <div className="small-container">



                        <div className="row">
                            <div className="col-3">
                                <img src="./assets/images/category-1.jpg" alt="" />
                            </div>
                            <div className="col-3">
                                <img src="./assets/images/category-2.jpg" alt="" />
                            </div>
                            <div className="col-3">
                                <img src="./assets/images/category-3.jpg" alt="" />
                            </div>
                        </div>



                    </div>
                </div>





                <Home product={product} cart={cart} />
            </div>
        )
    }
}

home.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
})

export default connect(mapStateToProps, { getAllProducts })(home);
