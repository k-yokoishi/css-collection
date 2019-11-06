<template>
  <div class="toast" :class="[{show}]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {
  @Prop()
  public show?: boolean;

  public onClick() {
    if (this.show) {
      this.show = false;
    }
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
@keyframes fadein {
  from {
    bottom: 0rem;
    opacity: 0;
  }
  to {
    bottom: 2rem;
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    bottom: 2rem;
    opacity: 1;
  }
  to {
    bottom: 0rem;
    opacity: 0;
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
  &.show {
    animation: fadein 0.5s forwards, fadeout 0.5s 2s forwards;
  }
}
</style>