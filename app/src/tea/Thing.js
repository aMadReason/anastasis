import cmdParser from "./utilities/CmdParser";
import uuid from "./utilities/uuid";
import {
  initialProps,
  initialActs,
  initialErrs,
  initialSubs
} from "./initials";

class Thing {
  constructor({
    key = null, // required
    noun = "", // required
    fullname = null,
    props = {},
    actions = {},
    stateKey = "default",
    subs = {},
    errs = {},
    world = false,
    parentKey = false,
    description = false, // default description
    detail = false, // default detail
    details = false,
    descriptions = false
  }) {
    this.key = key || uuid(6);
    this.noun = noun;
    this.fullname = fullname;
    this.props = { ...initialProps(), ...props };
    this.actions = { ...initialActs, ...actions };
    this.stateKey = stateKey;
    this.errs = { ...initialErrs, errs };
    this.subs = { ...initialSubs, ...subs };
    this.world = world;
    this.parentKey = parentKey;

    if (descriptions) {
      this.props.descriptions = { ...this.props.descriptions, ...descriptions }
    }

    if (details) {
      this.props.details = { ...this.props.details, ...details }
    }

    if (description) {
      this.props.descriptions.default = description;
    }

    if (detail) {
      this.props.details.default = detail;
    }
  }

  get parent() {
    return this.world.findThing(this.parentKey);
  }

  get name() {
    return this.fullname || this.noun || this.key;
  }

  get actionList() {
    return [...Object.keys(this.actions)];
  }

  // get thingList() {
  //   return this.getThings().map((i) => i.name);
  // }
  get things() {
    return this.getThings();
  }

  get p() {
    return this.props;
  }

  get a() {
    return this.actions
  }

  get description() {
    return this.sub(this.props.descriptions[this.stateKey]);
  }

  get detail() {
    return this.sub(this.props.details[this.stateKey]);
  }

  /**
   * Substitutions used in props, actions and errors
   * @param {String} str 
   * @param {Object} subs 
   */
  sub(str, subs = this.subs) {
    if (typeof str !== "string") return null;
    Object.keys(subs).map((i) => (str = str.replace(i, subs[i](this))));
    return str;
  }

  removeThing(key) {
    const thing = this.findThing(key);
    if (thing) {
      this.world.things = this.world.things.filter(i => i.key !== thing.key);
    }
    return thing;
  }

  addThing(thing) {
    if (thing instanceof Thing === false) return null;
    thing.parentKey = this.key;

    thing.world = this.world;
    const worldThings = this.world.things;
    const idx = worldThings.findIndex(i => i.key === thing.key);
    if (idx > -1) {
      this.world.things[idx] = thing;
      //console.warn(`Attempting to add Thing with duplicate key '${thing.key}'.`)
    } else {
      this.world.things.push(thing);
    }

    return this;
  }

  /**
   * Finds a thing that is a child of this thing by
   * @param {string} key 
   */
  findThing(key) {
    return this.world.things.find(i => i.key === key && i.parent === this.key) || false;
  }

  findThings(word) {
    const things = this.getThings().filter(i => {
      return [i.fullname, i.noun, i.key].includes(word)
    });
    return things;
  }

  getThings() {
    return this.world.things.filter(i => i.parentKey === this.key);
  }

  addAction(key, cb = () => { }) {
    this.actions[key] = cb;
  }

  getAction(key) {
    return this.actions[key];
  }

  callAction(key) {
    const cb = this.actions[key];
    if (!cb) return this.errs.noAction(this, { action: key });
    if (typeof cb !== "function") return cb;
    const result = cb(this, {}, key);
    return result;
  }

  parse(command, lexicon = {}) {
    return cmdParser(command, lexicon);
  }

  tryAnd(command, lexicon = {}) {
    if (!command) return;
    const parsed = this.parse(command, lexicon);
    const { nouns, action, actOn, actWith, terms } = parsed;

    //console.log({ parsed })

    let type = "empty";
    let res = () => "unknown";

    if (terms && terms.length === 1) type = "single";
    if (actOn && action && !actWith) type = "simple";
    if (actOn && action && actWith) type = "complex";

    const actOnThings = actOn ? this.findThings(actOn) : false;
    const actWithThings = actWith ? this.findThings(actWith) : false;

    if (type === 'empty') {
      type = 'error';
      res = () => this.errs.empty();
    }

    if (type === "single") {
      const singleTxt = terms[0];
      const singleAct = this.getAction(singleTxt);
      res = () => this.errs.noAction(this, { action: singleTxt });
      if (singleAct) {
        res = () => this.callAction(singleTxt);
      }
    }

    if (type === "simple" || type === "complex") {
      if (actOnThings && actOnThings.length === 0) {
        type = 'error';
        res = () => this.errs.noThingSimple(this, { noun: nouns[0], actOn });
      }
      if (actOnThings && actOnThings.length > 1) {
        type = 'error';
        res = () => this.errs.multiMatch(this, { noun: nouns[0], things: actOnThings })
      }
      if (actOnThings && actOnThings.length === 1) {
        res = () => actOnThings[0].callAction(action);
      }
    }

    const output = {
      res,
      type,
      actOnThings,
      actWithThings,
      //act,
      ...parsed
    }

    return output;
  }
}

export default Thing;
