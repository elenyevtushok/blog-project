import axios from "axios";

// const BASE_SERVER_URL = "https://jsonplaceholder.typicode.com";
const BASE_SERVER_URL = "http://localhost:3000";

export const axiosClient = axios.create({
	baseURL: BASE_SERVER_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Content-Type': 'application/json; charset=UTF-8',
	}
})