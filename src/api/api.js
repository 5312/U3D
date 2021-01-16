import http from './serive.js';

const apiUrl = {
    tunnel: "home/tunnel",
    home: 'home/h',
    plane: 'Plane/plane',
}
export { apiUrl };
export default {
    apis: {
        tunnel: params => {
            return http.get(apiUrl.tunnel, params)
        },
        home: params => {
            return http.get(apiUrl.home, params);
        },
        plane1: params => {
            return http.get(apiUrl.plane, params);
        }
    }
}
