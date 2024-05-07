<template>
  <div class="container row mt-5 d-flex flex-column align-items-center">
    <p class="text-center fs-5"><strong> Comments </strong></p>
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      v-show="thereAreComments"
    />
    <div
      class="alert alert-warning m-3"
      role="alert"
      v-show="!thereAreComments"
    >
      There are not results.
    </div>
    <NewComment @newComment="passNewComment($event)" />
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import NewComment from "./NewComment";
export default {
  name: "PostCommentsList",
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  components: {
    CommentItem,
    NewComment,
  },
  data() {
    return {};
  },
  methods: {
    passNewComment(comment) {
      this.$emit("addNewComment", comment);
    },
  },
  computed: {
    thereAreComments() {
      return this.comments.length > 0;
    },
  },
};
</script>
