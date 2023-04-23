import { PageRequest, Post } from "../features/posts/dto/Post";
import { axiosClient } from "./axios-client";

export const getPostsApi = async (pageRequest: PageRequest): Promise<Post[]> => {
	return await axiosClient.post("/posts/search", {
		"query": {
		},
		"options": {
			"page": pageRequest.page,
			"limit": pageRequest.size,
			"sort": {
				"createdAt": "asc"
			}
		}
	})
		.then(response => response.data.docs)
}

export const patchPostApi = async (id: string, patch: Partial<Post>) => {
	return await axiosClient.put(`/posts/${id}`, patch)
}

export const getOnePostApi = async (id: string): Promise<Post> => {
	return await axiosClient.get(`/posts/${id}`)
		.then(response => response.data)
}

export const deleteOnePost = async (id: string): Promise<Post> => {
	return await axiosClient.delete(`/posts/${id}`)
		.then(response => response.data)
}