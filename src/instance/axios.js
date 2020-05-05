import axios from 'axios';
import https from 'https';

https.globalAgent.options.rejectUnauthorized = false;
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    httpsAgent: new https.Agent({
    rejectUnauthorized: false,
})
});



export default {
    instance: instance,
}
