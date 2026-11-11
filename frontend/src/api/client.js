import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProblems = () => API.get('/problems');
export const executeCode = (data) => API.post('/execute/run', data);
export const getHint = (data) => API.post('/mentor/hint', data);
export const askMentor = (data) => API.post('/mentor/explain', data);
export const getBenchmark = () => API.get('/evaluation/benchmark');
export const getRecommendations = (roll) => API.get(`/evaluation/recommendations/${roll}`);

export default API;
