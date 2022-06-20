<template>
  <v-form @submit.prevent="addCategoryData">
    <v-text-field
      v-model="category"
      label="New category name"
      required
      outlined
    ></v-text-field>
    <v-btn color="primary" type="submit" large dark>
      <span class="mr-1">Add category</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "formCategoryAdd",
  data() {
    return {
      category: "",
    };
  },
  computed: {
    ...mapGetters(["getCategoryList", "getCategoriesLoaded"]),

    categoryList() {
      return this.getCategoryList;
    },
    categoriesLoaded() {
      return this.getCategoriesLoaded;
    },
  },
  methods: {
    ...mapMutations(["addDataToCategoryList"]),
    addCategoryData() {
      const data = this.category;
      let flag = this.categoryList.findIndex(
        (val) => val.toUpperCase() == data.toUpperCase()
      );
      if (flag < 0 && data != "") {
        this.addDataToCategoryList(data);
      }
      this.category = "";
    },
  },
  async created() {
    if (!this.categoriesLoaded) {
      await this.$store.dispatch("fetchCategoryList");
    }
  },
};
</script>

<style scoped lang="scss">
form {
  max-width: 384px;
  text-align: right;
}
</style>