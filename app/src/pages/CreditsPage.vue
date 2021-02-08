<template>
  <div class="credits-page text-center full-height">
    <article>
      <h1 class="text-divider title">Credits</h1>

      <button class="button" @click="(e) => $router.go(-1)">Return</button>

      <div class="credits text-left">
        <div v-for="(v, idx) in credits" :key="idx" class="credit">
          <pre v-if="v.copy" v-html="v.copy"></pre>
          <pre v-if="!v.copy" class="text-left">
{{v.assetName}} by {{v.creator}}
<span v-if="v.link">Link: <a v-if="v.link" :href="v.link">{{v.link}}</a></span>
<span v-if="v.license">License: <a v-if="v.license" :href="v.license">{{v.license}}</a></span>
        </pre>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "CreditsPage",
  data: () => ({
    credits: [
      {
        assetName: "jordan-grimmer-office2.jpg",
        creator: `Jordan Gimmer`,
        link: "https://www.jordangrimmer.co.uk/m2qp107ahghlxvl28ff9t8ztmlrbnj",
        license: "",
      },
      {
        assetName: "resirealistic4flat2.jpg",
        creator: `Jordan Gimmer`,
        link: "https://www.artstation.com/artwork/W2AYGE",
        license: "",
      },
      {
        copy: `Very Low Note by Kevin MacLeod
Link: https://incompetech.filmmusic.io/song/4581-very-low-note
License: https://filmmusic.io/standard-license`,
      },
      {
        copy: `Anxiety by Kevin MacLeod
Link: https://incompetech.filmmusic.io/song/3374-anxiety
License: https://filmmusic.io/standard-license`,
      },
    ],
  }),
};
</script>

<style scoped>
.credits-page {
  background: var(--tea-bg-2);
  min-height: 100vh;
}
.title {
  padding: var(--tea-spacing);
}
.credits {
  margin-top: var(--tea-spacing);
  overflow: initial;
  /* display: flex;
  flex-flow: row wrap;
  justify-content: center; */
}

.credit {
  background: var(--tea-bg-3);
  margin: calc(var(--tea-spacing) / 2);
  padding: calc(var(--tea-spacing) / 2);
  max-width: 100%;
}
</style>
