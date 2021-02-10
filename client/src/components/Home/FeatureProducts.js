import React, { Component } from 'react';
import Slider from "react-slick";
import Spinner from '../Common/Spinner'

// import ProductItem from '../Products/products/ProductItem';
import ProductItemmew from './ProductItemnew';
import ProductItem from '../Products/products/ProductItem';


class FeatureProducts extends Component {
    render() {
        const setting = {
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2200,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

        const { products, loading } = this.props;
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
                        // <ProductItemmew key={product._id} product={product} />
                        <ProductItem key={product._id} product={product} added={addedProducts} />
                        // console.log(product._id);
                    ))
                }
            } else {
                productItem = <h4>No product found...</h4>
            }
        }



        return (
            <div>
                {/* <div id="slick-item" class="row "> */}
                <Slider {...setting}>
                    {productItem}
                </Slider>
                {/* </div> */}
            </div>
        )
    }
}

export default FeatureProducts
