const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// AUTH
export const authAPI = {
  login: (email, password, role) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    }).then(handleResponse),

  getMe: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(handleResponse),

  changePassword: (data) =>
    fetch(`${BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// USER PROFILE
export const userAPI = {
  getProfile: () =>
    fetch(`${BASE_URL}/users/profile`, { headers: headers() }).then(handleResponse),

  updateProfile: (data) =>
    fetch(`${BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// STAFF
export const staffAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/staff`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/staff`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/staff/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/staff/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// TEACHERS
export const teacherAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/teachers`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/teachers`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/teachers/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/teachers/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// STUDENTS
export const studentAPI = {
  getAll: (params = '') =>
    fetch(`${BASE_URL}/students${params}`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/students/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// BATCHES
export const batchAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/batches`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/batches`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/batches/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/batches/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// CONTENT
export const contentAPI = {
  getTracking: (studentId) =>
    fetch(`${BASE_URL}/content/tracking/${studentId}`, { headers: headers() }).then(handleResponse),

  getAll: (params = '') =>
    fetch(`${BASE_URL}/content${params}`, { headers: headers() }).then(handleResponse),

  getOne: (id) =>
    fetch(`${BASE_URL}/content/${id}`, { headers: headers() }).then(handleResponse),

  create: (formData) =>
    fetch(`${BASE_URL}/content`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` }, // no Content-Type for FormData
      body: formData,
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/content/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/content/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};



// NOTIFICATIONS
export const notificationAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/notifications`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/notifications`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/notifications/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  markRead: (id) =>
    fetch(`${BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: headers(),
    }).then(handleResponse),

  dismiss: (id) =>
    fetch(`${BASE_URL}/notifications/${id}/dismiss`, {
      method: 'PUT',
      headers: headers(),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// MESSAGES
export const messageAPI = {
  getUsers: () =>
    fetch(`${BASE_URL}/messages/users`, { headers: headers() }).then(handleResponse),

  getConversations: () =>
    fetch(`${BASE_URL}/messages/conversations`, { headers: headers() }).then(handleResponse),

  getMessages: (userId) =>
    fetch(`${BASE_URL}/messages/${userId}`, { headers: headers() }).then(handleResponse),

  send: (receiver, content) =>
    fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ receiver, content }),
    }).then(handleResponse),
};

// QUERIES
export const queryAPI = {
  getAll: (params = '') =>
    fetch(`${BASE_URL}/queries${params}`, { headers: headers() }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/queries`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  reply: (id, reply) =>
    fetch(`${BASE_URL}/queries/${id}/reply`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ reply }),
    }).then(handleResponse),

  markSeen: () =>
    fetch(`${BASE_URL}/queries/seen`, {
      method: 'PUT',
      headers: headers(),
    }).then(handleResponse),

  remove: (id) =>
    fetch(`${BASE_URL}/queries/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// UNREAD COUNTS
export const unreadAPI = {
  get: () =>
    fetch(`${BASE_URL}/unread`, { headers: headers() }).then(handleResponse),
};

// STATS
export const statsAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/stats`, { headers: headers() }).then(handleResponse),
};

// ACTIVITY
export const activityAPI = {
  getAll: (params = '') =>
    fetch(`${BASE_URL}/activity${params}`, { headers: headers() }).then(handleResponse),
};
