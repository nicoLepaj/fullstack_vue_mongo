<template>
	<div class="container">
		<h1>Latest Posts</h1>
		<div class="create-post">
			<label for="create-post">Say something...</label>
			<input
				type="text"
				id="create-post"
				v-model="text"
				placeholder="Create a post"
			/>
			<button @click="createPost">Post!</button>
		</div>
		<hr />
		<p class="error" v-if="error">{{ error }}</p>
		<div class="posts-container">
			<div
				class="post"
				v-for="post in use_posts"
				:key="post._id"
				@dblclick="deletePost(post._id)"
			>
				{{ post.createdAt.getDate() }}/{{ post.createdAt.getMonth() }}/{{
					post.createdAt.getFullYear()
				}}
				<p class="text">{{ post.text }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import usePostService from '../composables/PostService';
export default {
	setup() {
		const error = ref('');
		const text = ref('');

		const {
			posts: use_posts,
			getPosts: use_getPosts,
			createPost: use_createPost,
			setPost: use_setPost,
			deletePost: use_deletePost,
			removePost: use_removePost,
		} = usePostService();

		onMounted(async () => {
			try {
				await use_getPosts();
			} catch (err) {
				error.value = err.message;
			}
		});

		async function createPost() {
			error.value = '';
			try {
				const res = await use_createPost(text.value);
				use_setPost(res.data);
			} catch (err) {
				error.value = err.message;
				throw error;
			}
		}

		async function deletePost(id) {
			error.value = '';
			try {
				await use_deletePost(id);
				use_removePost(id);
			} catch (err) {
				error.value = err.message;
				throw error;
			}
		}

		return {
			use_posts,
			text,
			error,
			createPost,
			deletePost,
		};
	},
};
</script>

<style scoped>
div.container {
	max-width: 800px;
	margin: 0 auto;
}

p.error {
	border: 1px solid #ff5b5f;
	background-color: #ffc5c1;
	padding: 10px;
	margin-bottom: 15px;
}

div.post {
	position: relative;
	border: 1px solid #5bd658;
	background-color: #bcffb8;
	padding: 10px 10px 30px 10px;
	margin-bottom: 15px;
}

div.created-at {
	position: absolute;
	top: 0;
	left: 0;
	padding: 5px 15px 5px 15px;
	background-color: darkgreen;
	color: white;
	font-size: 13px;
}

p.text {
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 0;
}
</style>
