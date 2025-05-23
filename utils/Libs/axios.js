import axios from 'axios';

/** Base URL for the API */
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
    baseURL,
    headers: {
        // 'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'bypass-tunnel-reminder': 'true',
    },
    withCredentials: false,
});

api.interceptors.request.use((config) => {

    const stateUserStorage = localStorage.getItem('session-user')
    const stateUser = JSON.parse(stateUserStorage)

    // console.log('stateUser', stateUser)

    const token = stateUser ? stateUser.state.sessionUser.access_token : ''

    if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';

        // Dynamically set Content-Type if provided in the request config
        if (config.contentType) {
            config.headers['Content-Type'] = config.contentType;
        } else if (!(config.data instanceof FormData)) {
            // Default Content-Type for non-FormData requests
            config.headers['Content-Type'] = 'application/json';
        }
    }
    return config;
});

api.interceptors.response.use(
    (config) => config,
    (error) => {
        // Parse error message
        if (error.response?.data.message) {
            return Promise.reject({
                ...error,
                response: {
                    ...error.response,
                    data: {
                        ...error.response.data,
                        message:
                            typeof error.response.data.message === 'string'
                                ? error.response.data.message
                                : Object.values(error.response.data.message)[0][0],
                    },
                },
            });
        }
        return Promise.reject(error);
    },
);

export default api;

/**
 * Fetch data with a GET request
 * @param {string} url - API endpoint
 * @param {object} [params] - Query parameters
 * @returns {Promise<any>} - Fetched data
 */
export const queryApi = async (url, params) => {
    const { data } = await api.get(
        url,
        params
    );
    return data;
};

/**
 * Perform a mutation (POST, PUT, DELETE, etc.)
 * @param {object} params - Configuration for mutation
 * @param {string} params.url - API endpoint
 * @param {string} [params.method='post'] - HTTP method
 * @param {object} [params.data] - Request payload
 * @returns {Promise<any>} - Response data
 */
export const mutateApi = async ({ url, method = 'post', data }) => {
    const response = await api({
        url,
        method,
        data,
    });
    return response.data;
};
