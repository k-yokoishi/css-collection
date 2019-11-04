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
import { Component, Prop, Vue } from "vue-property-decorator";
import VueCore from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faPaw,
  faCoffee,
  faFeather,
  faHippo,
  faOtter
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus);
library.add(faPaw);
library.add(faCoffee);
library.add(faFeather);
library.add(faHippo);
library.add(faOtter);

VueCore.component("font-awesome-icon", FontAwesomeIcon);

@Component
export default class FAB extends Vue {
  selecting = false;
}
</script>

<style scoped>
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
}

button.main {
  height: 3.5rem;
  width: 3.5rem;
  background-color: royalblue;
  font-size: 2rem;
  color: whitesmoke;
  bottom: 0;
  right: 0;
}

button.main > div {
  transition: 0.5s ease;
}

button.main > div.selecting {
  transform: rotate(225deg);
}

button.item {
  height: 3rem;
  width: 3rem;
  background-color: gray;
  font-size: 1.5rem;
  color: whitesmoke;
  right: -4rem;
  transition: 0.5s ease;
}

button.item.selecting {
  transform: translateX(-4.5rem);
}

button.item:nth-last-of-type(1) {
  bottom: 4rem;
}

button.item:nth-last-of-type(2) {
  bottom: 7.5rem;
  transition-delay: 0.1s;
}

button.item:nth-last-of-type(3) {
  bottom: 11rem;
  transition-delay: 0.2s;
}

button.item:nth-last-of-type(4) {
  bottom: 14.5rem;
  transition-delay: 0.3s;
}

button.item:nth-last-of-type(5) {
  bottom: 18rem;
  transition-delay: 0.4s;
}
</style>