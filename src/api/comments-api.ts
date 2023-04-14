import { CommentDto } from "../features/comments/dto/Comment";
import { axiosClient } from "./axios-client";

export const getCommentsApi = async (postId: number): Promise<CommentDto[]> => {
	return await axiosClient.get("/comments", {
		params: {
			postId: postId,
		}
	})
		.then(response => response.data)
}
