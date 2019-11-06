<template>
  <div class="container">
    <div class="wrapper">
      <button class="main" @click="selecting = !selecting">
        <div :class="[{selecting: selecting}]">
          <font-awesome-icon icon="plus" />
        </div>
      </button>
      <button class="item" :class="[{selecting: selecting}]">
        <font-awesome-icon icon="paw" />
      </button>
      <button class="item" :class="[{selecting: selecting}]">
        <font-awesome-icon icon="coffee" />
      </button>
      <button class="item" :class="[{selecting: selecting}]">
        <font-awesome-icon icon="feather" />
      </button>
      <button class="item" :class="[{selecting: selecting}]">
        <font-awesome-icon icon="hippo" />
      </button>
      <button class="item" :class="[{selecting: selecting}]">
        <font-awesome-icon icon="otter" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueCore from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faPaw,
  faCoffee,
  faFeather,
  faHippo,
  faOtter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus);
library.add(faPaw);
library.add(faCoffee);
library.add(faFeather);
library.add(faHippo);
library.add(faOtter);

VueCore.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class FAB extends Vue {
  public selecting = false;
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

.wrapper {
  position: relative;
}

button {
  border-radius: 50%;
  box-shadow: 5px 5px 5px lightgray;
  position: absolute;
  color: whitesmoke;
  &.main {
    height: 3.5rem;
    width: 3.5rem;
    background-color: royalblue;
    font-size: 2rem;
    bottom: 0;
    right: 0;
    > div {
      transition: 0.5s ease;
      &.selecting {
        transform: rotate(225deg);
      }
    }
  }
  &.item {
    height: 3rem;
    width: 3rem;
    background-color: gray;
    font-size: 1.5rem;
    right: -4rem;
    transition: 0.5s ease;
    &.selecting {
      transform: translateX(-4.5rem);
    }
    @for $i from 0 through 4 {
      &:nth-last-of-type(#{$i + 1}) {
        bottom: $i * 3.5 + 4rem;
        transition-delay: $i * 0.1s;
      }
    }
  }
}
</style>