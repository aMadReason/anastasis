
//import Thing from './Thing'

class World {
  constructor() {
    this.player = null;
    this.locations = [];
    this.location = null;
    this.characters = [];
    this.things = [];
    this.lexicon = {};
    this.lastTryCmd = {};
    this.preHook = () => { };
    this.postHook = () => { }
  }

  get inventory() {
    const player = this.getCharacter();
    return player.things;
  }

  setLexicon(lexicon) {
    this.lexicon = { ...lexicon };
    return this;
  }

  setPlayer(key) {
    const character = this.getCharacter(key);
    if (!character) throw Error('Character not found.');
    this.player = character;
  }

  setLocation(key) {
    const location = this.getLocation(key);
    if (!location) throw Error(`Location with key "${key}" not found.`);
    this.location = location;
  }

  addLocation(thing) {
    thing.world = this;
    this.locations.push(thing);
    if (!this.location && this.locations.length === 1) {
      this.location = thing;
    }
  }

  getLocation(key = this.location.key) {
    const location = this.locations.find(l => l.key === key);
    return location;
  }

  addCharacter(thing) {
    thing.world = this;
    this.characters.push(thing)
    if (!this.player && this.characters.length === 1) {
      this.player = thing;
    }
  }

  getCharacter(key = this.player.key) {
    const character = this.characters.find(c => c.key === key);
    return character;
  }

  findThing(key) {
    const thing = this.things.find(i => key === i.key);
    const location = this.locations.find(i => key === i.key);
    return thing || location;
  }

  command(str, lexicon) {
    const location = this.getLocation();
    const locationAttempt = location.tryAnd(str, lexicon || this.lexicon);
    const player = this.getCharacter();
    const playerAttempt = player.tryAnd(str, lexicon || this.lexicon);

    this.lastTryCmd = {
      locationAttempt,
      playerAttempt
    }

    return this.lastTryCmd;

  }
}

export default World;