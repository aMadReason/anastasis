<template>
  <div v-bind:data-view="view" class="scene">
    <slot></slot>
    <div class="description">
      <div
        class="bg"
        ref="bg"
        role="presentation"
        aria-hidden
        :data-light="light"
        :style="{
          backgroundImage: `url(${scenes[activeLocation.key].bg})`,
        }"
      ></div>
      <div class="corpus box">
        {{ activeLocation.description }}
      </div>
      <div class="items box">
        <ul class="unstyled">
          <!-- $root.location.things -->
          <li
            v-for="thing in listThings()"
            v-bind:key="`${thing.key}-${thing.stateKey}`"
          >
            <!-- <div v-html="rawHtml"></div> -->
            <Description v-bind:thing="thing" />
          </li>
        </ul>
      </div>
    </div>
    <div class="commander">
      <div class="box">
        <slot name="commander"></slot>
      </div>
    </div>
    <div class="response">
      <div class="box">
        <slot name="response"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./Description";

export default {
  name: "Scene",
  components: {
    Description,
  },
  props: {
    view: { type: Boolean, default: true },
    scenes: { type: Object, default: undefined },
    activeLocation: { type: Object, default: undefined },
    light: { type: Boolean, default: true },
  },

  computed: {
    // things: function () {
    //   const allThings = this.$root.location.things;
    //   const unhiddenThings = this.$root.location.things.filter(
    //     (i) => i.stateKey !== "hidden"
    //   );
    //   return this.light ? unhiddenThings : allThings;
    // },
    // light: function () {
    //   const things = this.activeLocation.things;
    //   const light = things.find((i) => i.noun === "switch");
    //   return light;
    // },
  },
  data: () => ({}),
  methods: {
    listThings() {
      const allThings = this.$root.location.things;
      const unhiddenThings = this.$root.location.things.filter(
        (i) => i.stateKey !== "hidden"
      );
      return this.light ? unhiddenThings : allThings;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scene {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: var(--tea-bg-3);
  --view-transition: all 0.5s linear;
}

.scene > * {
  width: 100%;
}

.box {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.response .box {
  height: 100%;
}

.description {
  overflow-y: auto;
  justify-content: center;
  flex-flow: column;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--tea-bg-3);
  overflow: hidden;
  height: 100%;
}

.description .bg {
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: var(--view-transition);
  box-shadow: inset 0 0 10px #000000;
}

.description .bg[data-light="false"] {
  filter: brightness(5%) grayscale(100%);
}

.description .corpus {
  margin-bottom: 0.5rem;
}

.description .corpus,
.description .items:not(:empty) {
  background-color: rgb(17 21 24 / 85%);
  box-shadow: var(--tea-shadow);
  border: 1px solid var(--tea-bg-3);
  max-height: 50%;
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  z-index: 2;
  position: relative;
  border-radius: var(--tea-radius);
  padding: 0.5rem 1rem;
  transition: var(--view-transition);
  opacity: 1;
}

.description .items:not(:empty) li {
  margin: 0 0;
  padding: 0.5rem 0;
}

.scene[data-view="false"] .description .corpus,
.scene[data-view="false"] .description .items {
  opacity: 0;
}

.commander {
  padding: 0.5rem;
}

.response {
  height: 150px;
  overflow-y: auto;
  /* border: 1px solid var(--tea-bg-3); */
  background: var(--tea-bg-1);
}

@media (min-width: 801px) {
  .description[data-v-55d9de8c] {
    flex-basis: 100%;
    padding: var(--tea-spacing);
  }
}
</style>
