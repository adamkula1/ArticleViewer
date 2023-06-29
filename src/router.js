import { createRouter, createWebHistory } from "vue-router";
import ArticlesList from "./components/ArticlesList.vue";
import ArticleDetail from "./components/ArticleDetail.vue";

const routes = [
	{
		path: "/",
		name: "ArticlesList",
		component: ArticlesList,
	},
	{
		path: "/article/:id",
		name: "ArticleDetail",
		component: ArticleDetail,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
