import http from './serive.js';

const apiUrl = {
    home: 'home/h',
    plane: 'Plane/plane',
}
export { apiUrl };
export default {
    apis: {
        home: params => {
            return http.get(apiUrl.home, params);
        },
        plane1: params => {
            return http.get(apiUrl.plane, params);
        }
    }
}
