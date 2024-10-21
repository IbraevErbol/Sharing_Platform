import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // console.error("Ошибка при запросе:", error);
        if (error.response?.status === 401 && !error.config._retry) {
            // console.log('Токен доступа устарел. Попытка обновления токена...'); // Логирование при истечении токена
            error.config._retry = true;
            try {
                const { data } = await axios.post('http://localhost:3000/refresh-token', {}, {
                    withCredentials: true,
                });
                localStorage.setItem('token', data.accessToken);
                error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                // console.log('Токен доступа обновлен:', data.accessToken); // Логирование при успешном обновлении токена
                return api.request(error.config);
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;