<template>
  <div class="modal fade" id="createPostModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">{{ action }} Post</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="reset()"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group pb-3">
              <label>Title</label>
              <input
                type="text"
                class="form-control"
                v-model="post.title"
                :class="v$.post.title.$error === true ? 'is-invalid' : ''"
              />
              <span
                class="form-text text-danger"
                v-for="error of v$.post.title.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group pb-3">
              <label>Description</label>
              <textarea
                class="form-control"
                rows="2"
                v-model="post.description"
                :class="v$.post.description.$error === true ? 'is-invalid' : ''"
              ></textarea>
              <span
                class="form-text text-danger"
                v-for="error of v$.post.description.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group pb-3">
              <label>Category</label>
              <select
                class="form-select"
                v-model="post.categoryId"
                :class="v$.post.categoryId.$error === true ? 'is-invalid' : ''"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <span
                class="form-text text-danger"
                v-for="error of v$.post.categoryId.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <div class="form-group">
              <label>URL of the image</label>
              <input
                type="text"
                class="form-control"
                v-model="post.image"
                :class="v$.post.image.$error === true ? 'is-invalid' : ''"
              />
              <span
                class="form-text text-danger"
                v-for="error of v$.post.image.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="btnCloseModal"
            @click="reset()"
          >
            Cancel
          </button>
          <button class="btn btn-primary" @click="submit()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { getCategories } from "../helpers/categories";
import { createPost, updatePost } from "../helpers/posts";
import { alerts } from "../helpers/alerts";
import { store } from "../store/store";

export default {
  name: "PostForm",
  mixins: [alerts],
  data() {
    return {
      v$: useVuelidate(),
      action: "Create",
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
      ], */
      post: {
        id: null,
        title: null,
        description: null,
        categoryId: null,
        image: null,
        comments: [],
      },
      categories: [],

      store,
    };
  },
  validations() {
    return {
      post: {
        title: {
          required: helpers.withMessage("Title field is required.", required),
          $autoDirty: true,
        },
        description: {
          required: helpers.withMessage(
            "Description field is required.",
            required
          ),
          $autoDirty: true,
        },
        categoryId: {
          required: helpers.withMessage(
            "Category field is required.",
            required
          ),
          $autoDirty: true,
        },
        image: {
          required: helpers.withMessage("Image field is required.", required),
          $autoDirty: true,
        },
      },
    };
  },
  methods: {
    async submit() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();
      } else {
        const { title, description, categoryId, image, comments } = this.post;
        const [categorySelected] = this.categories.filter(
          ({ id }) => id === categoryId
        );
        const post = {
          title,
          description,
          image,
          category: categorySelected,
          comments,
        };

        this.savePost(post);
      }
    },
    async getCategories() {
      this.categories = await getCategories();
    },
    reset() {
      this.post = {
        id: null,
        title: null,
        description: null,
        categoryId: null,
        image: null,
      };
      this.v$.$reset();
      this.store.setPostEditing(null);
    },
    async savePost(post) {
      let status;
      if (this.action === "Edit") {
        status = await updatePost({ ...post, id: this.post.id });
      } else {
        status = await createPost(post);
      }

      if (status) {
        this.showAlert("success", "The post has been saved");
        this.store.getPosts();
      } else {
        this.showAlert("error", "The post couldn't be saved");
      }
      this.$refs.btnCloseModal.click();
    },
  },
  mounted() {
    this.getCategories();
  },
  watch: {
    "store.postEditing"(newValue) {
      if (newValue) {
        console.log("🚀 ~ newValue:", newValue);
        this.action = "Edit";

        const { id, title, description, image, category, comments } = newValue;

        this.post = {
          id,
          title,
          description,
          image,
          categoryId: category.id,
          comments,
        };
      } else {
        this.action = "Create";
      }
    },
  },
  unmounted() {
    this.store.setPostEditing(null);
  },
};
</script>
