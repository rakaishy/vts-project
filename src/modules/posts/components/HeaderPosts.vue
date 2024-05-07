<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <h6 class="sub-title">[ Making your Life Easier ]</h6>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <h1 class="display-1">{{ title }}</h1>
      </div>
      <div class="col-12 d-flex justify-content-end p-2">
        <i
          class="fa-solid fa-square-pen fa-2xl create-post"
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
        ></i>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <CategoriesList @filter-by-category="filterByCategory($event)" />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <PostForm />
</template>

<script>
import CategoriesList from "./CategoriesList";
import PostForm from "./PostForm";

export default {
  emits: ["filterByCategory"],
  name: "HeaderPosts",
  components: {
    CategoriesList,
    PostForm,
  },
  data() {
    return {
      title: "Discovering the World",
      categories: null,
    };
  },
  computed: {},
  methods: {
    filterByCategory(id) {
      this.$emit("filterByCategory", id);
    },
  },
};
</script>

<style scoped>
.sub-title {
  color: #f0a441;
  font-weight: 300;
}
.create-post {
  height: 20px;
  color: #f0a441;
}
.create-post:hover {
  cursor: pointer;
}
</style>
