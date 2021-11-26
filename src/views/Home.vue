<template>
  <div>
    <Graph :msg="text" />
  </div>
</template>

<script>
import Graph from "../components/Graph.vue";
import { ref } from "vue";
export default {
  name: "Home",
  setup() {
    const text = ref("welcome to plotting playground!");
    return { text };
  },
  components: {
    Graph,
  },
};
</script>
