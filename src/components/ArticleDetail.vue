<template>
	<article class="bg-white dark:bg-gray-900 py-8 lg:py-8" v-if="article">
		<h2 class="mb-2 text-2xl font-bold text-center text-white">
			{{ article.title }}
		</h2>
		<p class="text-center text-white my-8">{{ article.body }}</p>

		<div class="max-w-2xl mx-auto px-4">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
					Discussion ({{ comments.length }})
				</h2>
			</div>
			<form class="mb-6">
				<div
					class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				>
					<label for="comment" class="sr-only">Your comment</label>
					<textarea
						id="comment"
						rows="6"
						class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
						placeholder="Write a comment..."
						required
					></textarea>
				</div>
				<button
					type="submit"
					class="w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:text-black bg-blue-600 rounded-lg hover:bg-white"
				>
					Post comment
				</button>
			</form>

			<section
				class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
				v-for="comment in comments"
				:key="comment.id"
			>
				<div class="flex justify-between items-center mb-2">
					<div class="flex items-center">
						<p
							class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
						>
							<svg
								class="text-gray-400 mr-2 w-6 h-6 rounded-full"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clip-rule="evenodd"
								></path>
							</svg>
							{{ comment.name }}
						</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							<time pubdate datetime="2022-02-08" title="February 8th, 2022"
								>Feb. 8, 2022</time
							>
						</p>
					</div>
					<button
						id="dropdownComment1Button"
						data-dropdown-toggle="dropdownComment1"
						class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						type="button"
					>
						<svg
							class="w-5 h-5"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
							></path>
						</svg>
						<span class="sr-only">Comment settings</span>
					</button>
				</div>
				<p class="text-gray-500 dark:text-gray-400">
					{{ comment.body }}
				</p>
				<div class="flex items-center mt-4 space-x-4">
					<button
						type="button"
						class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
					>
						<svg
							aria-hidden="true"
							class="mr-1 w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							></path>
						</svg>
						Reply
					</button>
				</div>
			</section>
		</div>

		<router-link :to="{ name: 'ArticlesList' }">
			<p
				class="m-auto w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:text-black bg-indigo-400 rounded-lg hover:bg-white"
			>
				← Späť na články
			</p>
		</router-link>
	</article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const article = ref(null);
const comments = ref([]);
const router = useRouter();

onMounted(() => {
	const id = router.currentRoute.value.params.id;
	fetchArticle(id);
	fetchComments(id);
});

const fetchArticle = async (id) => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		);
		article.value = response.data;
	} catch (error) {
		console.error(error);
	}
};

const fetchComments = async (id) => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/comments?postId=${id}`
		);
		comments.value = response.data;
	} catch (error) {
		console.error(error);
	}
};
</script>
