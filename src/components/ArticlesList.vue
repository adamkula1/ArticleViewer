<template>
	<article class="w-fit m-auto">
		<h1 class="text-3xl font-bold text-center my-4">Articles</h1>

		<section class="flex gap-10 mb-5">
			<div class="mb-4">
				<label for="filterId" class="mr-2">Filter by ID:</label>
				<input
					id="filterId"
					type="number"
					v-model="filterId"
					class="px-2 py-1 border border-gray-300 rounded"
				/>
			</div>

			<div class="mb-4">
				<label for="filterTitle" class="mr-2">Filter by Title:</label>
				<input
					id="filterTitle"
					type="text"
					v-model="filterTitle"
					class="px-2 py-1 border border-gray-300 rounded"
				/>
			</div>
		</section>

		<ul class="flex flex-wrap justify-center">
			<li
				class="p-6 mr-4 rounded bg-blue-900 w-80"
				v-for="(article, index) in paginatedArticles"
				:key="article.id"
				@click="showArticleDetail(article.id)"
			>
				<h2 class="mb-2 text-2xl font-bold text-white truncate">
					{{ article.title }}
				</h2>
				<router-link
					:to="{ name: 'ArticleDetail', params: { id: article.id } }"
				>
					<p
						class="w-fit flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:text-black bg-indigo-400 rounded-lg hover:bg-white"
					>
						Read Article →
					</p>
				</router-link>
			</li>
		</ul>

		<Pagination
			:totalItems="filteredArticles.length"
			:perPage="perPage"
			@pageChanged="changePage"
		/>

		<router-view></router-view>
	</article>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import Pagination from "./Pagination.vue";

export default {
	name: "ArticlesList",
	components: {
		Pagination,
	},
	setup() {
		const articles = ref([]);
		const perPage = 5;
		const currentPage = ref(1);
		const filterId = ref("");
		const filterTitle = ref("");

		const fetchArticles = async () => {
			try {
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/posts"
				);
				articles.value = response.data;
			} catch (error) {
				console.error(error);
			}
		};

		const filteredArticles = computed(() => {
			let filtered = articles.value;

			if (filterId.value) {
				filtered = filtered.filter((article) =>
					article.id.toString().includes(filterId.value)
				);
			}

			if (filterTitle.value) {
				filtered = filtered.filter((article) =>
					article.title.toLowerCase().includes(filterTitle.value.toLowerCase())
				);
			}

			return filtered;
		});

		const paginatedArticles = computed(() => {
			const start = (currentPage.value - 1) * perPage;
			const end = start + perPage;
			return filteredArticles.value.slice(start, end);
		});

		const changePage = (page) => {
			currentPage.value = page;
		};

		const showArticleDetail = (articleId) => {
			// Do something when an article is clicked
		};

		fetchArticles();

		return {
			articles,
			perPage,
			currentPage,
			filterId,
			filterTitle,
			filteredArticles,
			paginatedArticles,
			changePage,
			showArticleDetail,
		};
	},
};
</script>
