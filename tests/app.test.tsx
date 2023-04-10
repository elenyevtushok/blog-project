import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../src/App';
import React from 'react';
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../src/api/axios-client"
import { STUB_POSTS_PAGE_1, STUB_POSTS_PAGE_2, mockGetPostsPage } from './mock/stub-posts';
import { STUB_USERS } from './mock/stub-users';


describe('Test App', () => {

	it('Should load user name on posts loading', async () => {
		var mock = new MockAdapter(axiosClient);
		mockGetPostsPage(mock, 1, STUB_POSTS_PAGE_1);
		mock.onGet("/users").reply(200, STUB_USERS);

		render(<App />);
		await waitFor(() => expect(screen.getByTestId('post-title-1')).toHaveTextContent(STUB_POSTS_PAGE_1[0].title));
		await waitFor(() => expect(screen.getByTestId('post-author-1')).toHaveTextContent(STUB_USERS[0].name));
	});

	it('Should load additional posts on click button Load more posts', async () => {
		var mock = new MockAdapter(axiosClient);
		mockGetPostsPage(mock, 1, STUB_POSTS_PAGE_1);
		mockGetPostsPage(mock, 2, STUB_POSTS_PAGE_2);
		mock.onGet("/users").reply(200, STUB_USERS);

		const user = userEvent.setup()
		render(<App />);
		await waitFor(() => expect(screen.getByTestId('load-more-button')).toBeInTheDocument());
		await user.click(screen.getByTestId('load-more-button'))
		await waitFor(() => expect(screen.getByTestId('post-title-11')).toBeInTheDocument());
	});

	it('Should delete post on click delete post button', async () => {
		var mock = new MockAdapter(axiosClient);
		mockGetPostsPage(mock, 1, STUB_POSTS_PAGE_1);
		mock.onGet("/users").reply(200, STUB_USERS);

		const user = userEvent.setup()
		render(<App />);
		await waitFor(() => expect(screen.getByTestId('post-delete-button-2')).toBeInTheDocument());
		await user.click(screen.getByTestId('post-delete-button-2'));
		await waitFor(() => expect(screen.queryByTestId('post-delete-button-2')).not.toBeInTheDocument());
	})
});