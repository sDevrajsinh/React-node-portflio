import axios from 'axios';

// Use an empty string for API_BASE_URL to leverage relative paths.
// This works perfectly in production when the backend serves the frontend
// and in development via the proxy in package.json.
export const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const loginAdmin = async (credentials) => {
  const { data } = await api.post('/api/auth/login', credentials);
  return data;
};

export const fetchProjects = async () => {
  const { data } = await api.get('/api/projects');
  return data;
};

export const fetchAdminData = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [analyticsRes, messagesRes, projectsRes] = await Promise.all([
    api.get('/api/analytics', config),
    api.get('/api/contact', config),
    api.get('/api/projects', config)
  ]);
  
  return {
    analytics: analyticsRes.data,
    messages: messagesRes.data,
    projects: projectsRes.data
  };
};

export const createProject = async (token, projectData) => {
  const { data } = await api.post('/api/projects', projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const updateProject = async (token, projectId, projectData) => {
  const { data } = await api.put(`/api/projects/${projectId}`, projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const deleteProject = async (token, projectId) => {
  const { data } = await api.delete(`/api/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const submitContactMessage = async (formData) => {
  const { data } = await api.post('/api/contact', formData);
  return data;
};

export const trackVisitorData = async (payload) => {
  const { data } = await api.post('/api/visit', payload);
  return data;
};

export const trackResumeDownload = async () => {
  const { data } = await api.post('/api/resume-download');
  return data;
};

export const fetchUserProfile = async (token) => {
  const { data } = await api.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const requestAdminOTP = async (token) => {
  const { data } = await api.post('/api/auth/request-otp', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const verifyAdminOTP = async (token, otp) => {
  const { data } = await api.post('/api/auth/verify-otp', { otp }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const updateAdminCredentials = async (token, payload) => {
  const { data } = await api.post('/api/auth/update-credentials', payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchPublicProfile = async () => {
  const { data } = await api.get('/api/auth/public-profile');
  return data;
};

export const uploadImage = async (token, formData) => {
  const { data } = await api.post('/api/upload', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const likeProjectApi = async (id) => {
  const { data } = await api.post(`/api/projects/${id}/like`);
  return data;
};
