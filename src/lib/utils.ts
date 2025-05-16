import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'accept: application/json': '*/*',
        'Access-Control-Allow-Origin': '*',
    },
});

const walletURL = import.meta.env.VITE_INFURA_ID;
// console.log("Wallet URL:", walletURL); // Confirm it's not undefined
axios
    .post(`https://mainnet.infura.io/v3/${walletURL}`, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

// Request interceptor to add access token to headers
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh_token = localStorage.getItem('refresh_token');
            if (refresh_token) {
                try {
                    const response = await axios.post('api/v1/auth/refresh-token', { refresh_token });
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (err) {
                    // Handle token refresh failure (e.g., redirect to login)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/signin';
                }
            }
        }
        return Promise.reject(error);
    }
);


// Add interceptors for error handling or token injection if needed
api.interceptors.request.use((config) => {
    // Example: Add Authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Centralize error handling using Axios interceptors.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
}

export const formatAddress = (addr: string) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
    return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}