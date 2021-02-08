<template>
  <div data-theme="tea" class="gameui full-height">
    <PushDrawer v-bind:open="more" @click="clickCommandButton">
      <template v-slot:left>
        <Scene
          v-bind:view="view"
          :scenes="scenes"
          :makeActionButton="makeActionButton"
          :activeLocation="location"
          :light="state.lights[game.location.key]"
        >
          <div class="titlebar full-width">
            <router-link to="/menu">Menu</router-link>
            <div class="title-text">
              <h1 class="text-center">
                {{ game.location.name }}
              </h1>
            </div>
          </div>

          <template v-slot:commander>
            <Commander v-on:toggleview="toggleView()">
              <button ref="toggleMoreEl" class="button" @click="toggleMore">
                <i class="fas fa-ellipsis-v" aria-hidden></i> More
              </button>
            </Commander>
          </template>
          <template v-slot:response>
            <Response :response="response" />
          </template>
        </Scene>
      </template>
      <template v-slot:right>
        <div class="menu full-height full-width">
          <div class="titlebar">
            <div class="title-text more">
              <button
                class="button"
                :aria-pressed="inventoryOn"
                @click="setMoreOn('inventory')"
              >
                Inventory
              </button>
              <button
                class="button"
                :aria-pressed="locationsOn"
                @click="setMoreOn('locations')"
              >
                Locations
              </button>
            </div>
            <button ref="closeMoreEl" @click="toggleMore" class="button icon">
              X
            </button>
          </div>

          <div v-if="locationsOn">
            <ul>
              <li v-for="l in locations" v-bind:key="l.key">
                {{ l.name }}
              </li>
            </ul>
          </div>

          <div v-if="inventoryOn">
            <ul class="unstyled inventory-list">
              <li v-for="t in inventory" v-bind:key="t.key">
                <strong>{{ t.name }}</strong>
                <hr />
                <p>{{ t.callAction("describe") }}</p>

                <div class="controls">
                  <button class="button small" :data-command="`help ${t.name}`">
                    actions
                  </button>
                  <button
                    class="button small"
                    :data-command="`examine ${t.name}`"
                  >
                    examine
                  </button>
                  <button
                    v-if="t.getAction('drop')"
                    class="button small"
                    :data-command="`drop ${t.name}`"
                  >
                    drop
                  </button>
                  <button
                    v-if="t.getAction('use')"
                    class="button small"
                    :data-command="`use ${t.name}`"
                  >
                    use
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </PushDrawer>
  </div>
</template>

<script>
import store from "../store.js";
import PushDrawer from "../components/PushDrawer";
import Scene from "../components/Scene";
import Commander from "../components/Commander";
import Response from "../components/Response";

export default {
  name: "GameUI",
  components: {
    PushDrawer,
    Scene,
    Commander,
    Response,
  },
  props: [],
  computed: {
    view: () => store.state.view,
    more: () => store.state.more,
    activeUI: () => store.state.activeUI,
    triggerEl: () => store.state.triggerEl,
    response: () => store.state.response,
    scenes: () => store.scenes,
    makeActionButton: () => store.makeActionButton,
    inventoryOn() {
      return this.moreOn === "inventory";
    },
    locationsOn() {
      return this.moreOn === "locations";
    },
    inventory() {
      return this.$root.inventory;
    },
    locations() {
      return this.$root.locations;
    },
    location() {
      return this.$root.location;
    },
  },
  data: () => ({
    store,
    game: store.game,
    moreOn: "inventory",
    state: store.state,
  }),
  watch: {
    more(newVal) {
      this.handleFocus(newVal, this.$refs.closeMoreEl);
      store.state.response = newVal
        ? "More drawer opened."
        : "More drawer closed";
    },
    moreOn(newVal) {
      store.state.response = `More drawer set to ${newVal}`;
    },
  },
  methods: {
    handleFocus(newVal, element) {
      if (newVal) {
        store.state.triggerEl = document.activeElement;
        if (element) element.focus();
      }
      if (!newVal) {
        if (store.state.triggerEl) store.state.triggerEl.focus();
        store.state.triggerEl = null;
      }
    },
    toggleMore() {
      store.state.more = !store.state.more;
    },
    setMoreOn(flagName) {
      this.moreOn = flagName;
    },
    toggleView() {
      store.state.view = !store.state.view;
    },
    // handleTab(e, focusables) {
    //   const target = e.target;
    //   const last = focusables[focusables.length - 1];
    //   const first = focusables[0];
    //   const isLast = target === last && !e.shiftKey;
    //   const isFirst = target === first && e.shiftKey;

    //   if (isFirst || isLast) e.preventDefault();
    //   if (isLast) first.focus();
    //   if (isFirst) last.focus();
    // },
    getFocusables(ref) {
      return this.$refs[ref].getFocusables();
    },
    clickCommandButton(e) {
      const { target } = e;
      const cmd = target.getAttribute("data-command");
      if (!cmd) return;
      this.$root.command(cmd);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.inventory-list > * {
  margin: 0.5rem;
  padding: 0.5rem;
  background: var(--tea-bg-1);
}
</style>
