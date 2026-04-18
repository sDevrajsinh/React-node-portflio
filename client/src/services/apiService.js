import axios from 'axios';

// The proxy in package.json handles the base URL logic during development
// In production, the build handles it or you can specify process.env.REACT_APP_API_URL here if needed.

export const loginAdmin = async (credentials) => {
  const { data } = await axios.post('/api/auth/login', credentials);
  return data;
};

export const fetchProjects = async () => {
  const { data } = await axios.get('/api/projects');
  return data;
};

export const fetchAdminData = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [analyticsRes, messagesRes, projectsRes] = await Promise.all([
    axios.get('/api/analytics', config),
    axios.get('/api/contact', config),
    axios.get('/api/projects', config)
  ]);
  
  return {
    analytics: analyticsRes.data,
    messages: messagesRes.data,
    projects: projectsRes.data
  };
};

export const createProject = async (token, projectData) => {
  const { data } = await axios.post('/api/projects', projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const updateProject = async (token, projectId, projectData) => {
  const { data } = await axios.put(`/api/projects/${projectId}`, projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const deleteProject = async (token, projectId) => {
  const { data } = await axios.delete(`/api/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const submitContactMessage = async (formData) => {
  const { data } = await axios.post('/api/contact', formData);
  return data;
};

export const trackVisitorData = async (payload) => {
  const { data } = await axios.post('/api/track', payload);
  return data;
};

export const trackResumeDownload = async () => {
  const { data } = await axios.post('/api/resume-download');
  return data;
};

export const fetchUserProfile = async (token) => {
  const { data } = await axios.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const requestAdminOTP = async (token) => {
  const { data } = await axios.post('/api/auth/request-otp', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const verifyAdminOTP = async (token, otp) => {
  const { data } = await axios.post('/api/auth/verify-otp', { otp }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const updateAdminCredentials = async (token, payload) => {
  const { data } = await axios.post('/api/auth/update-credentials', payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchPublicProfile = async () => {
  const { data } = await axios.get('/api/auth/public-profile');
  return data;
};

export const uploadImage = async (token, formData) => {
  const { data } = await axios.post('/api/upload', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const likeProjectApi = async (id) => {
  const { data } = await axios.post(`/api/projects/${id}/like`);
  return data;
};
