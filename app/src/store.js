import { reactive } from 'vue';
import { atmospheres, effects } from './sound';
import game from "./game";

const store = {
  debug: true,
  app: null,
  game: reactive(game),
  state: reactive({
    response: 'Command responses will display here when submitted.',
    more: false,
    view: true,
    lights: {
      hallway: true
    }
  }),
  atmospheres,
  scenes: {
    office: {
      bg: require("@/assets/jordan-grimmer-office2.jpg"),
      atmosphere: 'dark'
    },
    hallway: {
      bg: require("@/assets/jordan-grimmer-resirealistic4flat2.jpg"),
      atmosphere: 'anxiety'
    },
    sewer: {
      bg: require("@/assets/jordan-grimmer-sewer3fla23.jpg"),
      atmosphere: 'anxiety'
    },
    street: {
      bg: require("@/assets/jordan-grimmer-untitledress2.jpg"),
      atmosphere: 'anxiety'
    },
    apartment: {
      bg: require("@/assets/jordan-grimmer-untitledresinew3.jpg"),
      atmosphere: 'anxiety'
    }
  },
  singleCommand(attempt) {
    const { original } = attempt;
    if (original.toLowerCase() === 'view') this.state.view = !this.state.view;
    if (original.toLowerCase() === 'more') this.state.more = !this.state.more;
    if (original.toLowerCase() === 'clear') this.state.response = '';
  },
  playAtmosphere(key = this.game.location.key) {
    const scene = this.scenes[key];
    const current = this.atmospheres.getPlaying();
    const playing = current.length > 0 && current[0];

    if (playing === scene.atmosphere) return null;

    if (scene.atmosphere) this.atmospheres.crossFade(scene.atmosphere);
  },
  playSimpleSoundEffects(action, thing) {
    //console.log('sfx', action, thing)
    if (!action || !thing) return;

    if (action === 'use' && thing.noun === 'key') {
      effects.play('metalClick')
    }

    if (action === 'flip' && thing.noun === 'switch') {
      effects.play('metalClick')
    }

    if (['take', 'pick', 'pick up', 'drop', 'leave', 'discard'].includes(action)) {
      effects.play('pickup')
    }

    if (['open', 'go through'].includes(action) && ['door'].includes(thing.noun) && thing.stateKey !== 'locked') {
      effects.play('door')
    }

  },
  actionButton({ key, noun, name = false, action = 'help', label = false }) {
    return `<button class="button small" data-key="${key}" data-noun="${noun}" data-name="${name}" data-action="${action}">
    ${label || name}
    </button>`;
  },
  commandButton(word, command) {
    return `<button class="button small" data-command="${command}">
    ${word}
    </button>`;
  },
  replaceActions(thing, res) {
    const { name, actionList } = thing;
    let response = res();
    actionList.map(i => {
      const rgx = new RegExp("\\b" + i + "\\b");
      response = response.replace(rgx, this.commandButton(i, `${i} ${name}`))
    });
    return response;
  },
  replaceThings(actOnThings, res) {
    let response = res();
    actOnThings.map(i => {
      response = response.replace(i.name, this.commandButton(i.name, `help ${i.name}`))
    });
    return response;
  },
}

export default store;