<template>
  <div
    v-bind:data-transition="transition"
    v-bind:data-open="open"
    v-bind:data-position="position"
    class="layout"
  >
    <div class="left-pane">
      <div class="inner">
        <slot name="left"></slot>
        <slot></slot>
      </div>
    </div>
    <div class="right-pane">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PushDrawer",
  props: {
    position: { type: String, default: "right" },
    open: { type: Boolean, default: false },
    transition: { type: Boolean, default: true },
  },
  data: () => ({}),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow: hidden;
}

.layout > * {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.layout[data-transition="true"] > * {
  transition: flex-basis var(--tea-transition, 0.5s ease),
    width var(--tea-transition, 0.5s ease),
    box-shadow var(--tea-transition, 0.5s ease);
}

.layout .inner {
  height: 100%;
  min-height: auto;
  overflow-x: hidden;
}

.layout .right-pane {
  overflow-x: hidden;
}

/* Positions */
.layout[data-position="right"] {
  flex-flow: row nowrap;
}
.layout[data-position="left"] {
  flex-flow: row-reverse nowrap;
}

.layout[data-position="right"] .inner,
.layout[data-position="left"] .inner {
  min-width: var(--pushdrawer-minwidth, 200px);
  height: 100%;
}
.layout[data-position="right"] .left-pane,
.layout[data-position="left"] .left-panee {
  flex: 2 0;
}
.layout[data-position="right"] .right-pane,
.layout[data-position="left"] .right-pane {
  width: 0;
}
.layout[data-open="true"][data-position="right"] .right-pane,
.layout[data-open="true"][data-position="left"] .right-pane {
  width: var(--pushdrawer-maxwidth, 100%);
}

@media (min-width: 600px) {
  :root {
    --pushdrawer-maxwidth: 50%;
  }
}

@media (min-width: 1000px) {
  :root {
    --pushdrawer-maxwidth: 30%;
  }
}
</style>
