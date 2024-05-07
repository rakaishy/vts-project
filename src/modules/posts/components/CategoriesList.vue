<template>
  <div class="btn-group" role="group">
    <CategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @select-category="selectCategory($event)"
    />
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
import { store } from "../store/store";
import { getCategories } from "../helpers/categories";

export default {
  name: "CategoriesList",
  components: {
    CategoryItem,
  },
  data() {
    return {
      /* categories: [
        {
          id: 2,
          name: "Travel",
        },
        {
          id: 3,
          name: "Lifecycle",
        },
        {
          id: 4,
          name: "Business",
        },
        {
          id: 5,
          name: "Work",
        },
      ] */ // TODO: Primeras sesiones, antes de consumir el servicio
      categories: [],
      store,
    };
  },
  methods: {
    buildCategories() {
      this.categories = [
        {
          id: "1",
          name: "All",
        },
        ...this.categories,
      ];

      this.categories = this.categories.map((category) => ({
        ...category,
        active: category.name === "All",
      }));
    },
    selectCategory(id) {
      this.categories = this.categories.map((category) => ({
        ...category,
        active: category.id === id,
      }));

      this.store.setCurrentCategory(id);
    },
    async getCategories() {
      this.categories = await getCategories();

      this.buildCategories();
    },
  },
  created() {
    this.buildCategories();
  },
  mounted() {
    this.getCategories();
  },
};
</script>
