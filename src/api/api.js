import http from './serive.js';

const apiUrl = {
    plane: '/src/views/Plane/plane',
}
export { apiUrl };
export default {
    apis: {
        plane1: params => {
            return http.get(apiUrl.plane, params)
        }
    }
}