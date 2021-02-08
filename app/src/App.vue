<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import annyang from "annyang";
import store from "./store";

const app = {
  name: "App",
  components: {},
  computed: {},
  data: () => ({
    game: store.game,
    state: store.state,
    inventory: store.game.inventory,
    locations: store.game.locations,
    location: store.game.location,
    listening: true,
  }),
  watch: {
    location() {
      store.playAtmosphere(this.location.key);
    },
  },
  methods: {
    handleSingleCommand(locationAttempt) {
      store.singleCommand(locationAttempt);
    },
    handleAttempt(attempt) {
      const la = attempt.locationAttempt;
      const pa = attempt.playerAttempt;
      const lOnThings = la.actOnThings; // location attempt
      const pOnThings = pa.actOnThings; // player attempt
      const action = location.action || pa.action;

      // thing on player
      if (pOnThings.length === 1 && lOnThings.length === 0) {
        store.playSimpleSoundEffects(action, pOnThings[0]);
        return store.replaceActions(pOnThings[0], pa.res);
      }
      // thing in location
      if (lOnThings.length === 1) {
        store.playSimpleSoundEffects(action, lOnThings[0]);
        return store.replaceActions(lOnThings[0], la.res);
      }
    },
    command(str) {
      const attempt = this.game.command(str);
      const { locationAttempt, playerAttempt } = attempt;
      if (!str && !locationAttempt && !playerAttempt) return null;
      const lOnThings = locationAttempt.actOnThings; // location attempt
      const pOnThings = playerAttempt.actOnThings; // player attempt
      let response = false;

      // Multiples found
      if (lOnThings.length > 0 && pOnThings.length > 0 && !response) {
        const things = [...lOnThings, ...pOnThings];
        response = store.replaceThings(
          things,
          () =>
            `There is more than one '${lOnThings[0].noun}' available in the ${
              location.name
            } and inventory, please specify; ${things
              .map((i) => i.name)
              .join(", ")}.`
        );
      }

      if (lOnThings.length === 1) {
        console.log(locationAttempt);
      }

      if (locationAttempt.type === "single" && !response) {
        response = store.singleCommand(locationAttempt);
      }

      // no thing in location or on player
      if (locationAttempt.type === "error" && playerAttempt.type === "error") {
        response = locationAttempt.res() + " " + playerAttempt.res();
      }

      if (!response) {
        response = this.handleAttempt(attempt);
      }

      store.state.response = response;

      // update data or reactivity breaks 🤢
      ["inventory", "locations", "location"].map((i) => {
        if (this[i]) this[i] = this.game[i];
      });
      this.$forceUpdate(); // just in case
    },
    getLocation(key) {
      return this.game.getLocation(key || this.location.key);
    },
  },
  mounted() {
    store.playAtmosphere(this.location.key);

    document.addEventListener("tea-event", (e) => {
      const loc = this.location;
      const { prefab } = e.detail;

      switch (prefab.noun) {
        case "computer":
          this.$router.push("computer");
          break;
        case "switch":
          console.log(this.state.lights[loc.key]);
          this.state.lights[loc.key] = prefab.stateKey === "on" ? true : false;
          console.log(this.state.lights[loc.key]);
          break;
      }
    });
  },
};

export default app;
</script>

<style>
body {
  min-width: 300px;
}
.app {
  height: 100vh;
}
.menu {
  background: var(--tea-bg-3);
}
</style>
