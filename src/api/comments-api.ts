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

// import { useQuery } from "@tanstack/react-query";
// import { Comment } from "../features/comments/dto/comment";

// import { axiosClient } from "./axios-client";

// export const getCommentsApi = async (postId: number): Promise<Comment[]> => {
// 	return await axiosClient
// 		.get("/comments", {
// 			params: {
// 				postId: postId,
// 			},
// 		})
// 		.then((response) => response.data);
// };

// export const useGetComments = (postId: number) => {
// 	return useQuery<Comment[], Error>(["comments", postId], () =>
// 		getCommentsApi(postId)
// 	);
// };
