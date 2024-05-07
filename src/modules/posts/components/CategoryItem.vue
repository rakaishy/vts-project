<template>
  <button
    type="button"
    class="btn btn-light"
    :class="{ active: category.active }"
    @click="selectCategory(category.id)"
  >
    {{ category.name }}
  </button>
</template>

<script>
export default {
  name: "CategoryItem",
  // props: ["category"], TODO: Manera sencilla de definir las props
  props: {
    category: {
      type: Object,
      required: true,
      default() {
        return {
          id: "1",
          name: "Default name",
        };
      },
    },
  },
  methods: {
    selectCategory(id) {
      this.$emit("selectCategory", id);
    },
  },
};
</script>
