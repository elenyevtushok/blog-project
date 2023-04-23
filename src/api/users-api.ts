import { User } from "../features/users/dto/User";
import { axiosClient } from "./axios-client";

export const getUsersApi = async (): Promise<User[]> => {
	return await axiosClient.post("/users/search", {
		"query": {
		},
		"options": {
			"page": 1,
			"limit": 20,
			"sort": {
				"createdAt": "asc"
			}
		}
	})
		.then(response => response.data.docs)
}