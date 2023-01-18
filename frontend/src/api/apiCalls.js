import axios from 'axios';

export const signup = body => {
  return axios.post('/api/1.0/users', body);
};

export const login = creds => {
  return axios.post('/api/1.0/auth', creds);
};

export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Bearer ${token}`;
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

export const getUser = username => {
  return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};

export const postGonderi = gonderi => {
  return axios.post('/api/1.0/gonderi', gonderi);
};

export const getGonderiler = (username, page = 0) => {
  const path = username ? `/api/1.0/users/${username}/gonderiler?page=` : '/api/1.0/gonderiler?page=';
  return axios.get(path + page);
}

export const getOldGonderiler = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/gonderiler/${id}` : `/api/1.0/gonderiler/${id}`;
  return axios.get(path);
}

export const getNewGonderiCount = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/gonderiler/${id}?count=true` : `/api/1.0/gonderiler/${id}?count=true`;
  return axios.get(path);
};

export const getNewGonderiler = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/gonderiler/${id}?direction=after` : `/api/1.0/gonderiler/${id}?direction=after`;
  return axios.get(path);
};

export const postGonderiAttachment = attachment => {
  return axios.post('/api/1.0/gonderi-attachments', attachment);
};

export const deleteGonderi = id => {
  return axios.delete(`/api/1.0/gonderiler/${id}`);
};

export const deleteUser = username => {
  return axios.delete(`/api/1.0/users/${username}`);
};