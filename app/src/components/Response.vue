<template>
  <div
    class="response"
    aria-live="assertive"
    aria-atomic="true"
    v-html="response"
  ></div>
</template>

<script>
export default {
  name: "Response",
  props: ["response"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.response {
  padding: 0.5rem;
  height: 100%;
  overflow-y: auto;
}
</style>
