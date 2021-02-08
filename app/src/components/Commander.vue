<template>
  <form @submit.prevent="cmd" class="commander">
    <div class="cmd-controls">
      <input
        ref="cmdinput"
        autocomplete="on"
        class="input"
        @keyup.ctrl.c="clearResponse"
        v-model="inputCommand"
        id="cmd"
        type="text"
        aria-label="command"
      />
      <button class="button" type="submit">Submit</button>
    </div>

    <div class="controls">
      <button
        @click="$emit('toggleview', e)"
        role="presentation"
        class="button icon-button desc"
      >
        View
      </button>
      <slot></slot>
    </div>
  </form>
  <!-- <div class="commander-input">
    <form @submit.prevent="cmd">
      <label for="cmd">Command:</label>
      <div class="commander-inputgroup">
        <input
          autocomplete="on"
          class="input"
          @keyup.ctrl.c="clearResponse"
          v-model="inputCommand"
          id="cmd"
          type="text"
        />
        <button class="button" type="submit">Submit</button>
      </div>
    </form>
    <div class="commander-controls">
      <button
        @click="$emit('toggleview', e)"
        role="presentation"
        class="button icon-button desc"
      >
        View
      </button>
      <slot></slot>
    </div>
  </div> -->
</template>

<script>
import store from "../store";
export default {
  name: "Commander",
  emits: ["command", "toggleview"],
  props: {},
  computed: {},
  data: () => ({
    inputCommand: "",
  }),
  methods: {
    cmd() {
      this.$root.command(this.inputCommand);
      this.inputCommand = "";
    },
    clearResponse() {
      store.state.response = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.commander {
  --sp: 0.2rem;
}

.cmd-controls {
  margin-bottom: calc(var(--sp) * 2);
}

.cmd-controls,
.controls {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.cmd-controls input {
  flex-basis: 100%;
}

.controls button {
  --sp: 0.2rem;
  flex-basis: calc(100% - calc(var(--sp) * 2));
}

.controls button:not(:first-child) {
  margin-left: var(--sp);
}

.controls button:not(:last-child) {
  margin-right: var(--sp);
}

@media (min-width: 480px) {
  .commander {
    display: flex;
  }

  .cmd-controls {
    flex-basis: 100%;
    margin-right: calc(var(--sp) * 2);
  }
}
</style>
