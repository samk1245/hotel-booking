const API_BASE = '/api';

// Helper for HTTP requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('grand_azure_admin_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred during network communication.');
    error.status = response.status;
    error.errors = data.errors || [];
    throw error;
  }

  return data;
};

export const api = {
  // Public APIs
  getRooms: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/rooms${query ? `?${query}` : ''}`);
  },
  getRoomBySlug: (slug) => request(`/rooms/${slug}`),
  getOffers: () => request('/offers'),
  getContent: (key = '') => request(`/content${key ? `/${key}` : ''}`),
  submitInquiry: (payload) => request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  submitContact: (payload) => request('/content/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Auth APIs
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  getMe: () => request('/auth/me'),
  changePassword: (payload) => request('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Admin APIs
  adminGetRooms: () => request('/rooms/admin/all'),
  adminCreateRoom: (data) => request('/rooms/admin', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  adminUpdateRoom: (id, data) => request('/rooms/admin/' + id, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  adminDeleteRoom: (id) => request('/rooms/admin/' + id, {
    method: 'DELETE'
  }),

  adminGetInquiries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/inquiries/admin${query ? `?${query}` : ''}`);
  },
  adminGetInquiryById: (id) => request(`/inquiries/admin/${id}`),
  adminUpdateInquiryStatus: (id, status, followUpDate) => request(`/inquiries/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, followUpDate })
  }),
  adminAddInquiryNote: (id, note) => request(`/inquiries/admin/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note })
  }),

  adminGetOffers: () => request('/offers/admin/all'),
  adminCreateOffer: (data) => request('/offers/admin', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  adminUpdateOffer: (id, data) => request('/offers/admin/' + id, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  adminDeleteOffer: (id) => request('/offers/admin/' + id, {
    method: 'DELETE'
  }),

  adminUpdateContent: (key, data) => request(`/content/admin/${key}`, {
    method: 'PUT',
    body: JSON.stringify({ data })
  }),

  adminGetStats: () => request('/staff/stats'),
  adminGetLogs: () => request('/staff/logs'),
  adminGetStaff: () => request('/staff/list'),
  adminCreateStaff: (data) => request('/staff/create', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  adminToggleStaff: (id, isActive) => request(`/staff/${id}/toggle`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive })
  }),

  uploadImage: async (file) => {
    const token = localStorage.getItem('grand_azure_admin_token');
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Image upload failed');
    return data;
  }
};
