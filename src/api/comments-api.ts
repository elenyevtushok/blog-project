import { CommentDto } from "../features/comments/dto/Comment";
import { axiosClient } from "./axios-client";

export const getCommentsApi = async (postId: string): Promise<CommentDto[]> => {
	return await axiosClient.post("/comments/search",
		{
			"query": {
				"postId": postId
			},
			"options": {
				"page": 1,
				"limit": 20,
				"sort": {
					"createdAt": "desc"
				}
			}
		})
		.then(response => response.data.docs)
}

export const deleteOneComment = async (id: string): Promise<Comment> => {
	return await axiosClient.delete(`/comments/${id}`)
		.then(response => response.data)
}