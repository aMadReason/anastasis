import nlp from 'compromise';

export const event = (prefab, options = {}, term) => {
  const data = { detail: { prefab, options, term } };
  const event = new CustomEvent('tea-event', data, false);
  document.dispatchEvent(event);
  const action = nlp(term).verbs().toPastTense().text();
  return prefab.sub(`${action || 'used'} [name]`);
}

export const take = (prefab, options = {}, term) => {
  const player = prefab.world.player;
  const parent = prefab.parent;
  parent.removeThing(prefab.key);
  player.addThing(prefab);
  prefab.stateKey = "inventory";
  const action = nlp(term).verbs().toPastTense().text();
  const res = prefab.sub(`${action || 'taken'} [name] from ${parent.name}`);
  event(prefab, { ...options, actionSource: 'take' }, term);
  return res;
}

export const drop = (prefab, options, term) => {
  const player = prefab.world.player;
  const location = prefab.world.location;
  player.removeThing(prefab.key);
  location.addThing(prefab);
  prefab.stateKey = "dropped";
  const action = nlp(term).verbs().toPastTense().text();
  const res = prefab.sub(`${action || 'dropped'} [name] from ${parent.name}`);
  event(prefab, { ...options, actionSource: 'drop' }, term);
  return res;
}

export const goTo = (prefab, options, term) => {
  const world = prefab.world;
  const loc = world.getLocation(options.goTo);
  let res = false;
  if (!res && !loc) res = 'Unknown location';
  if (!res && prefab.stateKey === 'locked') return prefab.callAction('examine');
  if (!res) {
    world.setLocation(loc.key);
    const action = nlp(term).verbs().toPastTense().text();
    res = prefab.sub(`${action || 'moved'} [name] to ${loc.name}`);
  }
  event(prefab, { ...options, actionSource: 'goTo' }, term);
  return res;
}

export const toggleStateKey = (prefab, options, term) => {
  const { on, off } = options
  let key = prefab.stateKey
  key = key === on ? off : on;
  prefab.stateKey = key;
  const action = nlp(term).verbs().toPastTense().text();
  const res = prefab.sub(`${action || 'turned'} [name] ${key}`);
  event(prefab, { ...options, actionSource: 'toggleStateKey' }, term);
  return res;
}

// the prefab with 'useOn' can act with another prefab to change the other prefabs stateKey
export function useOn(prefab, options, term) {
  const { location } = prefab.world;
  const { targetKey, stateFrom, stateTo } = options;
  const { lastTryCmd } = prefab.world;
  const { locationAttempt: la, playerAttempt: pa } = lastTryCmd;
  const infiniAction = nlp(term).verbs().toInfinitive().text();
  const pastAction = nlp(term).verbs().toPastTense().text();

  const actWithName = la.actWith || pa.actWith;
  const actOnThing = la.actOnThings[0] || pa.actOnThings[0];
  const actWithThing = la.actWithThings[0] || pa.actWithThings[0];
  let res = false;
  let help = false;

  if (!res && !actWithThing && actWithName && actOnThing) {
    res = `There is no '${actWithName}' in the ${location.name} to '${infiniAction}' the ${actOnThing.name} on`;
  }

  if (!res && !actWithThing && !actWithName && actOnThing) {
    help = true;
    res = `Please specify what you want to '${infiniAction}' the ${actOnThing.name} with using the terminal.`;
  }

  if (!res && actWithThing.key !== targetKey) {
    res = prefab.sub(`The [name] cannot be ${pastAction} on the ${actWithName}. Please try something else.`);
  }

  if (!res && actWithThing && [stateFrom, stateTo].includes(actWithThing.stateKey)) {
    actWithThing.stateKey = actWithThing.stateKey === stateTo ? stateFrom : stateTo;
    res = `The ${actWithThing.name} has been ${actWithThing.stateKey} using the ${prefab.name}`;
  }

  event(prefab, { ...options, actionSource: 'useOn', help, actWithThing }, term);
  return res;
}



export default {
  useOn,
  event,
  take,
  drop,
  goTo,
  toggleStateKey
}