import axios from 'axios';
import process from 'process';

let baseURL = 'http://www.syykz.net/api/'

if (process.env.NODE_ENV !== 'production') {
    baseURL = 'http://localhost:3000/';
}

export default axios.create({
    baseURL: baseURL,
    withCredentials: true
});