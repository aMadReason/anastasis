import Thing from '../Thing';
import actions from './actions';

const defaultActs = [
  { terms: ['flip'], act: 'toggleStateKey' },
];

export default function lightSwitchPrefab(thingProps, options, acts = defaultActs) {
  const prefab = thingProps instanceof Thing ? thingProps : new Thing(thingProps);

  if (!['on', 'off'].includes(prefab.statKey)) prefab.stateKey = 'on';

  prefab.p.descriptions = {
    on: `The [name] is on`,
    off: `The [name] is off`,
    ...thingProps.descriptions
  }

  prefab.p.details = {
    on: `It's a simple switch, you can probably turn it on and off`,
    off: `It's a simple switch, you can probably turn it on and off`,
    ...prefab.p.descriptions
  }

  acts.map(a => {
    a.terms.map(term => {
      const ops = { on: 'on', off: 'off' };
      prefab.addAction(term, () => actions[a.act](prefab, ops, term));
    })
  });
  return prefab;
}
