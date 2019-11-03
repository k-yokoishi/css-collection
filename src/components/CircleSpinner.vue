<template>
  <div class="circle-spinner">
    <div>
      <div></div>
    </div>
    <div>
      <div></div>
    </div>
    <div>
      <div></div>
    </div>
    <div>
      <div></div>
    </div>
    <div>
      <div></div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
@keyframes zoom-in-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circle-spinner {
  position: relative;
  display: flex;
  justify-content: center;
}

.circle-spinner > div {
  height: 3rem;
  width: 3rem;
  position: absolute;
}

.circle-spinner > div > div {
  border-radius: 50%;
  background-color: aquamarine;
  height: 1rem;
  width: 1rem;
  animation: zoom-in-out 1s infinite linear reverse;
}

.circle-spinner > div:nth-child(1) > div {
  animation-delay: 0.166s;
}

.circle-spinner > div:nth-child(2) > div {
  animation-delay: 0.333s;
}

.circle-spinner > div:nth-child(3) > div {
  animation-delay: 0.5s;
}

.circle-spinner > div:nth-child(4) > div {
  animation-delay: 0.666s;
}

.circle-spinner > div:nth-child(5) > div {
  animation-delay: 0.833s;
}

.circle-spinner > div:nth-child(1) {
  transform: rotate(0deg);
}

.circle-spinner > div:nth-child(2) {
  transform: rotate(60deg);
}

.circle-spinner > div:nth-child(3) {
  transform: rotate(120deg);
}

.circle-spinner > div:nth-child(4) {
  transform: rotate(180deg);
}

.circle-spinner > div:nth-child(5) {
  transform: rotate(240deg);
}

.circle-spinner > div:nth-child(6) {
  transform: rotate(300deg);
}
</style>