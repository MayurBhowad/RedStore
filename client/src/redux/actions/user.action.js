import axios from 'axios';
import { REMOVE_ALL_ITEMS } from '../types';

export const userAndPayment = (userPaymentDetails) => dispatch => {
    axios.post(`/api/user/userDetails`, userPaymentDetails)
        .then(res => {

            // localStorage.removeItem('persist:root')
            // dispatch({
            //     type: REMOVE_ALL_ITEMS,
            //     payload: []
            // })
            // history.push('/');

        })

}
