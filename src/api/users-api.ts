import { User } from "../features/users/dto/User";
import { axiosClient } from "./axios-client";

export const getUsersApi = async (): Promise<User[]> => {
	return await axiosClient.get("/users")
		.then(response => response.data)
}