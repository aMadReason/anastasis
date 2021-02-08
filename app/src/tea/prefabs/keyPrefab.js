import Thing from '../Thing';
import actions from './actions';
import { itemActs } from './itemPrefab';

const defaultActs = [
  ...itemActs,
  { terms: ['use'], act: 'useOn' }
];

export function keyPrefab(thingProps, options, acts = defaultActs) {
  const prefab = thingProps instanceof Thing ? thingProps : new Thing(thingProps);

  acts.map(a => {
    a.terms.map(term => {
      const action = actions[a.act];
      prefab.addAction(term, () => action(prefab, options, term));
    })
  });

  return prefab;
}

export default keyPrefab;




