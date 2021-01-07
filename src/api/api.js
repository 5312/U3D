import http from './serive.js';

const apiUrl = {
    home:'/src/views/Home/h',
    plane: '/src/views/Plane/plane',
}
export { apiUrl };
export default {
    apis: {
        home:params => {
            return http.get(apiUrl.home,params);
        },
        plane1: params => {
            return http.get(apiUrl.plane, params);
        }
    }
}
