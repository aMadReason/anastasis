<template>
  <div class="intro-page text-center full-height">
    <article v-on:click="handleClick">
      <header>
        <h1>Project for fun</h1>
      </header>
      <img :src="logo" alt="amadreason" />
    </article>
    <div class="clue">click or tap to continue</div>
    <hr />

    <div>
      <h2 class="title">Types of commands:</h2>

      <p>
        Commands should be made up of at least one verb and one noun, but can
        have additional words.
      </p>

      <p>The following command variations are all valid.</p>

      <pre>open door</pre>
      <pre>go through the metal door</pre>

      <br /><br />
      <!-- 
      <h2>Voice control</h2>
      <p><small><mark>This feature is experimental and somewhat buggy, please do not rely on
        it as the sole method of control.</mark></small></p>
      <p>
        You are able to use voice commands if you have enabled the microphone
        for his app.
      </p>
      <p>
        Voice commands are the same as text commands but 'must' be prefixed with
        the word 'try' to be recognized.        
        <pre>try and open the metal door</pre>
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroPage",
  data: () => ({
    logo: require("@/assets/amr-logo-mini.svg"),
  }),
  methods: {
    handleClick() {
      this.$router.push("/game");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 100px;
}

.intro {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.clue {
  -webkit-animation: fadeinout 2.5s infinite; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadeinout 2.5s infinite; /* Firefox < 16 */
  -ms-animation: fadeinout 2.5s infinite; /* Internet Explorer */
  -o-animation: fadeinout 2.5s infinite; /* Opera < 12.1 */
  animation: fadeinout 2.5s infinite;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeinout {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
