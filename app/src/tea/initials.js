export const initialProps = () => ({
  details: {
    default: `There is nothing remarkable about the [name]`
  },
  descriptions: {
    default: "It's a [name]! Better describe it!"
  }
});

export const initialActs = {
  examine: (prefab) => prefab.sub(prefab.p.details[prefab.stateKey] || prefab.p.details.default),
  describe: (prefab) => prefab.sub(prefab.p.descriptions[prefab.stateKey] || prefab.p.descriptions.default),
  help: (prefab) => `The following actions can be used on the ${prefab.name}: ${prefab.sub('[actions]')}`
};

export const initialErrs = {
  empty: () => `Please enter something`,
  noThingSimple: (prefab, data) => `There is no '${data.actOn || data.noun}' in the ${prefab.name === 'player' ? 'inventory' : prefab.name}.`,
  noAction: (prefab, data) =>
    prefab.sub(`The '${data.action}' action is not available for the [name].`),
  noNoun: () => "Commands should have at least a single noun.",
  multiMatch: (prefab, data) => {
    return `There is more than one '${data.noun}' available, please specify which: ${data.things.map(i => `'${i.name}'`).join(', ')}.`
  }
};

export const initialSubs = {
  "[name]": (prefab) => prefab.name,
  "[noun]": (prefab) => prefab.noun,
  "[fullname]": (prefab) => prefab.fullname,
  "[actions]": (prefab) => prefab.actionList.join(", ").replace(/, ([^,]*)$/, " and $1")
};
