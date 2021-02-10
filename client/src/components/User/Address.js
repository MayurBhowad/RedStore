import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAndPayment } from '../../redux/actions/user.action';
import { makeCartEmpty } from '../../redux/actions/cart.action';
import Spinner from '../Common/Spinner';
import axios from 'axios';

function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src;
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            products: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async displayRazorpay(userPaymentDetails, history, makeCartEmpty) {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        const name = this.state.fullname;
        const email = this.state.email;
        console.log(name, email);

        if (!res) {
            alert('RazorPay SDK faild to load')
            return
        }

        const data = await axios.post('/api/payment/razorpay', userPaymentDetails).then(t => { return t.data });
        // console.log(data);

        const options = {
            "key": process.env.RAZORPAY_KEY_ID,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            'name': "check out",
            "description": "Test Transaction...Okay",
            "image": "assets/images/user-1.png",
            "handler": function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                userAndPayment(userPaymentDetails)
                makeCartEmpty()
                history.push('/')
            },
            "prefill": {
                name: name,
                email: email,
                contact: '+91 1234567890'
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    componentDidMount() {
        const { cartItem, loading } = this.props.cart;
        const productsArray = [];
        if (cartItem === null || loading) {

        } else {
            if (cartItem) {
                cartItem.map(item => {
                    let product = {};
                    product = { productNumber: item.productDetails.productNumber, itemCount: item.itemCount }
                    // productsArray.push(product);
                    this.setState(prevState => ({
                        products: [...prevState.products, product]
                    }))
                })
            }
        }
        // this.setState({ products: productsArray });

        // console.log(productsArray);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    onSubmit(e) {
        e.preventDefault();
        const userPaymentDetails = {
            name: this.state.fullname,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            products: this.state.products
        }
        this.displayRazorpay(userPaymentDetails, this.props.history, this.props.makeCartEmpty);
        // this.props.userAndPayment(userPaymentDetails, this.props.history);
    }




    render() {
        const { cartItem, loading } = this.props.cart;
        const productsArray = [];
        let ItemDisplay;
        let checkoutbtn = false;

        // let discount_price;
        // discount_price = ((cartItem.productDetails.price * cartItem.productDetails.discount) / 100);
        // discount_price = cartItem.productDetails.price - discount_price;

        if (cartItem === null || loading) {
            ItemDisplay = <Spinner />
        } else {
            if (cartItem) {
                cartItem.map(item => {

                    let product = {};
                    product = { productNumber: item.productDetails.productNumber, itemCount: item.itemCount }
                    productsArray.push(product);
                })
            }
        }

        if (cartItem === null || loading) {
            ItemDisplay = <Spinner />
        } else {
            if (cartItem.length > 0) {
                ItemDisplay = cartItem.map(item =>
                (<tr key={item.productNumber}>
                    <td>
                        <div className="cart-info">
                            <div>
                                <p>{item.productDetails.productName}</p>
                                <small>Price: Rs. {(~~item.productDetails.price - ((item.productDetails.price * item.productDetails.discount) / 100))}/-</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <label htmlFor="">{item.itemCount}</label>
                    </td>
                    <td>Rs.  {(~~(item.productDetails.price - ((item.productDetails.price * item.productDetails.discount) / 100)))}/-</td>
                </tr>)
                )
                if (
                    this.state.fullname === '' ||
                    this.state.email === '' ||
                    this.state.city === '' ||
                    this.state.state === '' ||
                    this.state.zip === '') {
                    checkoutbtn = false
                } else {
                    checkoutbtn = true
                }
            } else {
                ItemDisplay = (<tr> <h4>Your Shopping Cart is empty</h4></tr>);
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
        }

        let cartSubTotalPrice = 0;
        cartSubTotal.map(price => cartSubTotalPrice = cartSubTotalPrice + price);

        let tax = 35;

        let totalPrice = cartSubTotalPrice + tax;





        return (
            <div>
                <div className="bill">
                    <div className="small-container cart-title">
                        <div className="row row-2">
                            <h2 className="title-2">Bill Details</h2>
                        </div>
                    </div>
                    <div className="small-container cart-page">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                                {ItemDisplay}
                            </tbody>
                        </table>
                        <div className="total-price">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Amount In MRP:</td>
                                        <td>Rs. {~~cartSubTotalPrice}/-</td>
                                    </tr>
                                    <tr>
                                        <td>Other Chrg:</td>
                                        <td>Rs. {~~tax}/-</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Net Amt:</strong></td>
                                        <td><strong>Rs. {~~totalPrice}/-</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="addressmain">
                    <div className="row address">
                        <div className="col-75">
                            <div className="container">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="row address">
                                        <div className="col-50">
                                            <h3>Billing Address</h3>
                                            <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                                            <input type="text" id="fname"
                                                name="fullname"
                                                placeholder="John M. Doe"
                                                value={this.state.fullname}
                                                onChange={this.onChange} />
                                            <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                                            <input type="text" id="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={this.state.email}
                                                onChange={this.onChange} />
                                            <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                            <input type="text" id="adr"
                                                name="address"
                                                placeholder="542 W. 15th Street"
                                                value={this.state.address}
                                                onChange={this.onChange} />
                                            <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                                            <input type="text" id="city"
                                                name="city"
                                                placeholder="New York"
                                                value={this.state.city}
                                                onChange={this.onChange} />

                                            <div className="row address state-zip">
                                                <div className="col-50">
                                                    <label htmlFor="state">State</label><br />
                                                    <input type="text" id="state"
                                                        name="state"
                                                        placeholder="NY"
                                                        value={this.state.state}
                                                        onChange={this.onChange} />
                                                </div>
                                                <div className="col-50">
                                                    <label htmlFor="zip">Zip</label><br />
                                                    <input type="text" id="zip"
                                                        name="zip"
                                                        placeholder="10001"
                                                        value={this.state.zip}
                                                        onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className=" col-50" >
                                            <h3>Payment</h3>
                                            <label htmlFor="fname">Accepted Cards</label>
                                            <div className="icon-container">
                                                <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                                                <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                                                <i className="fa fa-cc-mastercard" style={{ color: "red" }}></i>
                                                <i className="fa fa-cc-discover" style={{ color: "orange" }}></i>
                                            </div>
                                            <label htmlFor="cname">Name on Card</label>
                                            <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                                            <label htmlFor="ccnum">Credit card number</label>
                                            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                            <label htmlFor="expmonth">Exp Month</label>
                                            <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                                            <div className="row address">
                                                <div className="col-50">
                                                    <label htmlFor="expyear">Exp Year</label>
                                                    <input type="text" id="expyear" name="expyear" placeholder="2018" />
                                                </div>
                                                <div className="col-50">
                                                    <label htmlFor="cvv">CVV</label>
                                                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {checkoutbtn ? (<input type="submit" value="Continue to checkout" className="btn" />) : <input type="submit" value="Continue to checkout" className="disabledCursor" />}
                                    {/* <input type="submit" value="Continue to checkouts" className="btn " disabled="true" /> */}
                                    {/* <button type="submit" id='razorpayBtn' className="btn" disabled >Continue to checkouts</button> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Address.propTypes = {
    userAndPayment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, { userAndPayment, makeCartEmpty })(Address);
