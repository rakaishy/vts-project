<template>
  <HeaderPosts />
  <div class="row pt-5" v-if="thereArePosts">
    <PostItem
      v-for="(post, index) in postsFiltered"
      :key="index"
      :post="post"
    />
  </div>
  <div class="alert alert-warning m-3" role="alert" v-if="!thereArePosts">
    There are not results.
  </div>
</template>

<script>
import HeaderPosts from "../components/HeaderPosts";
import PostItem from "../components/PostItem";
import { store } from "../store/store";

export default {
  components: {
    HeaderPosts,
    PostItem,
  },
  data() {
    return {
      /* posts: [
        {
          id: 1,
          title: "The waves are high & beautiful",
          image:
            "https://cdn.pixabay.com/photo/2017/02/22/17/06/wave-2089959_960_720.jpg",
          description:
            "This is a wider card with supporting text below as a natural lead-i to additional content. This content is a little bit longer.",
          category: {
            id: 2,
            name: "Travel",
          },
          comments: ["1st commend", "2do commnet", "3td comment"],
        },
        {
          id: 2,
          title: "At the beach in winter",
          image:
            "https://cdn.pixabay.com/photo/2015/11/18/11/47/waikiki-beach-1049014_960_720.jpg",
          description:
            "No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de",
          category: {
            id: 4,
            name: "Business",
          },
          comments: ["1st commend", "2do commnet", "3td comment"],
        },
        {
          id: 43,
          title: "New York Offices",
          image:
            "https://cdn.pixabay.com/photo/2024/01/25/12/54/building-8531835_960_720.jpg",
          description:
            "No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de",
          category: {
            id: 4,
            name: "Business",
          },
          comments: ["1st commend", "2do commnet", "3td comment"],
        },
        {
          id: 4,
          title: "Cyclist, Person and People",
          image:
            "https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481_960_720.jpg",
          description:
            "No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de",
          category: {
            id: 3,
            name: "Lifecycle",
          },
          comments: ["1st commend", "2do commnet", "3td comment"],
        },
        {
          id: 4,
          title: "Apple Build",
          image:
            "https://cdn.pixabay.com/photo/2018/12/20/12/38/architecture-3885905_960_720.jpg",
          description:
            "No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de",
          category: {
            id: 5,
            name: "Work",
          },
          comments: ["1st commend", "2do commnet", "3td comment"],
        },
      ], */
      store,
      // currentCategoryId: 1, // TODO: Esto es antes de migrarlo al store
    };
  },
  computed: {
    postsFiltered() {
      if (this.store.currentCategoryId === "1") {
        return this.store.posts;
      }
      const postFiltered = this.store.posts.filter(
        (post) => post.category.id === this.store.currentCategoryId
      );
      return postFiltered;
    },
    thereArePosts() {
      return this.postsFiltered.length > 0;
    },
  },
  methods: {
    /* async getPosts() {
      this.posts = await getPosts();
    }, */
  },
  mounted() {
    this.store.getPosts();
  },
};
</script>

<style></style>
