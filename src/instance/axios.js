import axios from 'axios';
import https from 'https';

https.globalAgent.options.rejectUnauthorized = false;
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});



export default {
    instance: instance,
}
