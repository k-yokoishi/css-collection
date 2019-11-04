<template>
  <div class="toast" :class="[{in: show}]">Toasted!!</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {
  @Prop()
  public show?: boolean;
}
</script>

<style scoped>
@keyframes toast {
  to {
    transform: translateY(-4rem);
  }
}

@keyframes toast-out {
  to {
    transform: translateY(4rem);
  }
}

.toast {
  background-color: dodgerblue;
  color: cornsilk;
  text-align: center;
  height: 3rem;
  border-radius: 5px;
  margin-top: auto;
  position: fixed;
  right: 1rem;
  left: 1rem;
  bottom: -3rem;
  line-height: 3rem;
}

.in {
  animation: toast 0.5s ease-out forwards;
}
</style>