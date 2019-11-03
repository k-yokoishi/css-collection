<template>
  <div class="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
@keyframes bouncing-loader {
    to {
        opacity: 0.1;
        transform:translateY(-1rem);
    }
}

.bouncing-loader {
    display: flex;
    justify-content: center;
}

.bouncing-loader > div {
  background-color: dodgerblue;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 3rem 0.2rem;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
}
</style>