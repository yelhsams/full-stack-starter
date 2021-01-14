import axios from 'axios';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

const Api = {
  login(data) {
    return instance.post('/login', data);
  },
  logout() {
    return instance.get('/logout');
  },
  users: {
    me() {
      return instance.get('/api/users/me');
    }
  }
};

export default Api;
