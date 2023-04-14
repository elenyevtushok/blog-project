import { Comment, CommentRequest } from "../features/comments/dto/comment";
import { axiosClient } from "./axios-client";

export const getCommentsApi = async (postId: number): Promise<Comment[]> => {
	return await axiosClient.get("/comments", {
		params: {
			postId: postId,
		}
	})
		.then(response => response.data)
}
