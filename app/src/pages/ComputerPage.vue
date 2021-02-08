<template>
  <div class="computer-page text-center full-height" v-on:click="handleClick">
    <div class="titlebar full-width">
      <router-link to="/game">Back</router-link>
      <div class="title-text">
        <h1 class="text-center">Computer</h1>
      </div>
    </div>
    <div class="monitor full-height">
      <p>I'm still coding this bit so don;t bother with it.</p>
      <p>😜</p>
      <label>Password: </label>
      <input type="password" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ComputerPage",
  data: () => ({}),
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.monitor {
  background-color: #333;
  color: #00ff00;
  font-family: "andale mono", /* MS WebFont */ "monotype.com",
    /* MS WebFont, former name */ monaco,
    /* MacOS */ /* Fallback options */ "courier new",
    /* Windows, MacOS */ courier, /* Unix+X, MacOS */ monospace;
  padding: 10px;
  display: block;
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 300px;
  background-color: #111;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 5px;
}

.monitor input {
  background: transparent;
  color: #00ff00;
}
</style>
