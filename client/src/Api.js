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
  login(email, password) {
    return instance.post('/login', {email, password});
  },
  logout() {
    return instance.get('/logout');
  },
  passwords: {
    reset(email) {
      return instance.post('/api/passwords', {email});
    },
    get(token) {
      return instance.get(`/api/passwords/${token}`);
    },
    update(token, password) {
      return instance.patch(`/api/passwords/${token}`, {password});
    }
  },
  sectionItems: {
    delete(id) {
      return instance.delete(`/api/sectionItems/${id}`);
    }
  },
  users: {
    me() {
      return instance.get('/api/users/me');
    }
  }
};

export default Api;
