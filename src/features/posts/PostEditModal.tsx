import { useEffect, useRef } from 'react'
import { Modal, Form, Input, FormInstance } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { Post } from './dto/Post';
import { useAppDispatch } from '../../app/hooks';
import { updatePost } from './postsSlice';
import { Update } from '@reduxjs/toolkit';
import { patchPostApi } from '../../api/posts-api';

const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
	const prevOpenRef = useRef<boolean>();
	useEffect(() => {
		prevOpenRef.current = open;
	}, [open]);
	const prevOpen = prevOpenRef.current;

	useEffect(() => {
		if (!open && prevOpen) {
			form.resetFields();
		}
	}, [form, prevOpen, open]);
};

export const PostEditModal = ({ post, open, closeModal }: { post: Post, open: boolean, closeModal: () => void }) => {
	const [form] = Form.useForm();

	useResetFormOnCloseModal({
		form,
		open,
	});

	const dispatch = useAppDispatch();
	const onOk = () => {
		form.submit();
	}

	const onFormFinish = () => {
		const update: Update<Post> = {
			id: post._id,
			changes: {
				title: form.getFieldValue('title'),
				body: form.getFieldValue('body')
			}
		}

		dispatch(updatePost(update));
		patchPostApi(post._id, update.changes);
		closeModal();
	}

	return (
		<Modal
			open={open}
			title="Edit post"
			okText="Save"
			onCancel={() => closeModal()}
			onOk={onOk}
			centered
		>
			<Form
				form={form}
				onFinish={onFormFinish}
				layout="vertical"
				name="edit-post"
				labelCol={{ span: 10 }}
				wrapperCol={{ span: 24 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				autoComplete="off"
				fields={[
					{
						name: ['title'],
						value: post.title,
					},
					{
						name: ['body'],
						value: post.body,
					},
				]}
			>
				<Form.Item
					label="Post title"
					name="title"
					rules={[{ required: true, message: 'Title is required' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="body"
					label="Post"
					rules={[{ required: true, message: 'Post is required' }]}>
					<TextArea rows={4} />
				</Form.Item>
			</Form>
		</Modal>
	)
}
