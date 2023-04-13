import { Comment, CommentRequest } from "../features/comments/dto/comment";
import { axiosClient } from "./axios-client";

export const getCommentsApi = async (commentRequest: CommentRequest): Promise<Comment[]> => {
	return await axiosClient.get("/comments", {
		params: {
			postId: commentRequest.postId,
		}
	})
		.then(response => response.data)
}
