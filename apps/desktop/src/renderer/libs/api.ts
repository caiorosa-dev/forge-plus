import axios from 'axios';
import { API_URL } from '../../app.config';

export const apiClient = axios.create({
	baseURL: API_URL,
});