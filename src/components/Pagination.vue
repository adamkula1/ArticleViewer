<template>
	<div class="flex justify-center mt-4">
		<div class="bg-white p-4 flex items-center flex-wrap">
			<ul class="flex flex-row flex-wrap">
				<li>
					<button
						class="h-10 px-5 text-blue-600 bg-white rounded-l-lg hover:bg-green-100"
						@click="changePage(currentPage - 1)"
						:disabled="currentPage === 1"
					>
						<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							></path>
						</svg>
					</button>
				</li>

				<li
					v-for="page in totalPages"
					:key="page"
					@click="changePage(page)"
					:class="{ active: page === currentPage }"
				>
					<button
						:class="{
							'bg-blue-100': page === currentPage,
							'h-10 px-5 text-blue-600 hover:bg-green-100': true,
						}"
					>
						{{ page }}
					</button>
				</li>

				<li>
					<button
						class="h-10 px-5 text-blue-600 bg-white rounded-r-lg hover:bg-green-100"
						@click="changePage(currentPage + 1)"
						:disabled="currentPage === totalPages"
					>
						<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
							<path
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							></path>
						</svg>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
	totalItems: {
		type: Number,
		required: true,
	},
	perPage: {
		type: Number,
		required: true,
	},
});

const currentPage = ref(1);

const totalPages = computed(() => {
	return Math.ceil(props.totalItems / props.perPage);
});

const emit = defineEmits(["pageChanged"]);

function changePage(page) {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
		emit("pageChanged", page);
	}
}
</script>
