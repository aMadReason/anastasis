import Thing from '../Thing';
import actions from './actions';

const defaultActs = [
  { terms: ['take', 'pick up'], act: 'take' },
  { terms: ['drop', 'leave', 'discard'], act: 'drop' }
];

export { defaultActs as itemActs };

export default function itemPrefab(thingProps, options, acts = defaultActs) {
  const prefab = thingProps instanceof Thing ? thingProps : new Thing(thingProps);


  acts.map(a => {
    a.terms.map(term => {
      prefab.addAction(term, () => actions[a.act](prefab, options, term));
    })
  });
  return prefab;
}
