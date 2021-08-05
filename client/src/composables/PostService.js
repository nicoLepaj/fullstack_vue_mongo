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
		const res = await axios.post(url, { text });
		return res;
	}

	function setPost(newPost) {
		newPost.createdAt = new Date(newPost.createdAt);
		posts.value.push(newPost);
	}

	function removePost(id) {
    console.log('hey')
		posts.value = posts.value.filter((post) => post._id !== id);
	}

	// Delete Post
	function deletePost(id) {
		return axios.delete(`${url}${id}`);
	}

	return { posts, getPosts, createPost, setPost, deletePost, removePost };
}
