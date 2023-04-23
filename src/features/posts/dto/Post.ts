export interface Post {
	userId: string;
	_id: string;
	title: string;
	body: string;
}

export interface PageRequest {
	page: number;
	size: number;
}
