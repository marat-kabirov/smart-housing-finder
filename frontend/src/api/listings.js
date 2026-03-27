const BASE_URL = 'http://localhost:3001/api';

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/listings?${params}`);
  return res.json();
};

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const fetchFavorites = async (token) => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addFavorite = async (token, listingId) => {
  const res = await fetch(`${BASE_URL}/favorites/${listingId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const removeFavorite = async (token, listingId) => {
  const res = await fetch(`${BASE_URL}/favorites/${listingId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};