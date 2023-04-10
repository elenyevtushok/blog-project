export interface Post{
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface PageRequest {
	page: number;
	size: number;
}
