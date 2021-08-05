import { ref } from 'vue';
import axios from 'axios';

const url = 'api/posts/';
const posts = ref(null);

export default function usePostService() {
	// Get all Posts
	async function getPosts() {
		const res = await axios.get(url);
		const data = res.data;
		posts.value = data.map((post) => ({
			...post,
			createdAt: new Date(post.createdAt),
		}));
	}

	// Create Post
	async function createPost(text) {
		return await axios.post(url, { text });
	}

	// Delete Post
	function deletePost(id) {
		return axios.delete(`${url}${id}`);
	}

	// Update Post
	async function updatePost(id) {
		return await axios.put(`${url}${id}`);
	}

	// Local array manipulation
	function setPost(newPost) {
		newPost.createdAt = new Date(newPost.createdAt);
		posts.value.push(newPost);
	}

	function removePost(id) {
		posts.value = posts.value.filter((post) => post._id !== id);
	}

	function modifyPost(id, newText) {
		const toModify = posts.value.find((post) => post._id === id);
		if (toModify) {
			toModify.text = newText;
		}
	}

	return {
		posts,
		getPosts,
		createPost,
		deletePost,
		updatePost,
		setPost,
		removePost,
		modifyPost,
	};
}
