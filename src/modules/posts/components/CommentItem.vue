<template>
  <div class="card mb-3" style="width: 30rem">
    <div class="card-body">
      <h5 class="card-title">
        <i class="fa-solid fa-user me-1"></i> {{ name }}
      </h5>
      <p class="card-text ps-4">{{ comment }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "Joe Doe",
    },
  },
  name: "CommentItem",
};
</script>

<style></style>
