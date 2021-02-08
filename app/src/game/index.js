import World from '../tea/World';
import Thing from '../tea/Thing';

import { item, door, key, lightSwitch, eventTrigger } from '../tea/prefabs/index';

// set up game
const world = new World().setLexicon({
  open: 'Verb',
  round: 'Verb',
  bones: 'Noun',
  use: 'Verb',
  fat: 'Adjective',
  climb: "Verb",
  upstair: "Adjective",
  front: "Adjective",
  light: 'Noun',
  switch: 'Noun',
  flip: 'Verb',
  apartment: 'Noun'
});
const player = new Thing({ world, key: 'player', noun: 'player' });

// locations
const office = new Thing({ world, key: 'office', noun: 'office', fullname: 'small office', description: "The [name] is small but sparse, populated only with a set of old, cluttered shelves, a thread-bare computer chair, a nondescript desk with drawers and a waste paper bin. The room itself is dimly illuminated with by sick combination of blue monitor light and a buzzing fluorescent bulb from an old tube light mounted above the desk." });
const hallway = new Thing({ world, key: 'hallway', noun: 'hallway', description: "The [name] is in ruins. Fallen ceiling tiles rest on the ground near what appears to be blood stains and impossibly large claw gouges in the tile floor and cement walls. A light orange emergency light above the stains illuminates a simple potted plant that acts as a memorial for whatever atrocity occurred there. The walls are scarred and pockmarked both with age and possible combat. Down three steps is a dead-end, cracked walls, rubble and a fallen ceiling clustered together sealing away whatever secrets lay beyond. In the other direction is a stark pale light leading around the corner." });
const sewer = new Thing({ world, key: 'sewer', noun: 'sewer', description: "Green algae blooms in the still waters below the walkway giving rise to the scent of stagnation and organic matter. The sewers are still, uncharacteristically so. You have an unsettling feeling of wrongness, an almost-memory telling you there should be noise or vibrations. The light streaming from above makes you feel exposed." });
const street = new Thing({ world, key: 'street', noun: 'street', description: "The street feels desolate. There is no life, no movement, no noise of urban hustle and bustle. Shops, cars and roads stand still, as if frozen in time. Everything feels familiar and yet alien, over it all the apartment door stands like a terrible beacon. The numbers on it '1128' invoking a sense of nostalgia for which you have no memories." });
const apartment = new Thing({ world, key: 'apartment', noun: 'apartment', description: "Be horrified! It's another module map!! " });

// doors
const officeDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name].' }, { goTo: 'hallway' })
const hallwayDoor = door({ world, noun: 'door', fullname: 'metal door', description: 'A heavy looking [name] behind you.' }, { goTo: 'office' })
const hallwayCorner = door(
  { world, noun: 'corner', fullname: 'corner', description: 'The [name] at the end of the hall.' },
  { goTo: 'sewer' },
  [{ terms: ['turn'], act: 'goTo' }]
)
const sewerCorner = door(
  { world, noun: 'corner', fullname: 'corner', description: 'The [name] behind you.' },
  { goTo: 'hallway' },
  [{ terms: ['turn'], act: 'goTo' }]
)
const sewerExit = door(
  { world, noun: 'ladder', fullname: 'metal ladder', description: 'A [name] is bolted to the wall beside you leading up to an open man hole cover.' },
  { goTo: 'street' },
  [{ terms: ['climb'], act: 'goTo' }]
)
const streetDoor = door(
  {
    world, noun: 'door', key: 'apartmentDoor', fullname: 'apartment door',
    description: 'An [name] stands overlook the street where you climbed out. There is a sign on the door reading "1128"',
    stateKey: 'locked',
    details: {
      unlocked: "it's not locked",
      locked: "It's locked."
    }
  },
  { goTo: 'apartment' }
)
const streetExit = door(
  { world, noun: 'ladder', description: 'There is a manhole beside you with a [name] leading down.' },
  { goTo: 'sewer' },
  [{ terms: ['climb'], act: 'goTo' }]
)
const apartmentExit = door(
  { world, noun: 'door', fullname: "front door", description: 'The [name] is closed behind you.' },
  { goTo: 'street' },
);

// items
const computer = eventTrigger({ world, noun: 'computer', description: 'A [name].', detail: "it's locked" });
const bones = item({
  world,
  noun: 'bones',
  descriptions: {
    default: 'A collection of cat-like [name] are scattered in the alley.',
    inventory: 'A collection of cat-like [name].',
    dropped: 'A collection of cat-like [name].',
    horror: 'A collection of infant bones.'
  },
  details: {
    default: 'A collection of small rib, leg bones. On closer inspection some of the bones are snapped, scraped and pitted with indents. Small strands of dark, dessicated viscera cling to them.',
    horror: 'A collection of small rib, leg bones. On closer inspection some of the bones are snapped, scraped and pitted with indents. Small strands of dark, dessicated viscera cling to them. The remains of on an infant child.'
  }
});


const vial = item({ world, noun: 'vial', stateKey: 'hidden', description: 'A small medical vial that glows faintly blue in the dark.', detail: 'The label reads; "accelerant ANA-f21z, grown in cats. One dose prepared".' })

//const ball = item({ world, noun: 'ball', fullname: 'small ball', description: 'A [name].' });
const hallwayLight = lightSwitch({
  world, noun: 'switch', fullname: 'light switch', descriptions: {
    on: "A simple [name]; it's on",
    off: "A simple [name]; it's off"
  }
});

const smallKey = key({
  world,
  noun: 'key',
  detail: "An old silver door key with recent scratches; as though it's been removed from a ring recently.",
  descriptions: {
    default: 'A silver door key sits atop the desk in-front of the keyboard, resting in plain sight as if placed for your attention.',
    inventory: 'A silver door key.',
    dropped: 'The silver door key you left here.'
  }
}, { targetKey: 'apartmentDoor', stateFrom: 'locked', stateTo: 'unlocked' })

// add locations
world.addLocation(office);
world.addLocation(hallway);
world.addLocation(sewer);
world.addLocation(street);
world.addLocation(apartment);
world.setLocation('office');

// add doors 
office.addThing(computer)
office.addThing(officeDoor);
hallway.addThing(hallwayCorner);
hallway.addThing(hallwayDoor);
sewer.addThing(sewerExit);
sewer.addThing(sewerCorner);
street.addThing(streetDoor);
street.addThing(streetExit);
apartment.addThing(apartmentExit)

// place items
street.addThing(bones);
office.addThing(smallKey);
hallway.addThing(hallwayLight)
hallway.addThing(vial)

// add characters
world.addCharacter(player);

// set player
world.setPlayer('player');



export default world;