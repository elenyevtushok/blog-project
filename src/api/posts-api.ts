import { PageRequest, Post } from "../features/posts/dto/Post";
import { axiosClient } from "./axios-client";

export const getPostsApi = async (pageRequest: PageRequest): Promise<Post[]> => {
	return await axiosClient.get("/posts", {
		params: {
			_page: pageRequest.page,
			_limit: pageRequest.size
		}
	})
		.then(response => response.data)
}

export const patchPostApi = async (id: number, patch: Partial<Post>) => {
	return await axiosClient.patch(`/posts/${id}`, patch)
}