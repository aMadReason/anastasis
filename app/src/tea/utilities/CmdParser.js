import nlp from "compromise";

function cmdParser(input, lexicon = {}) {
  const original = input.toLowerCase().replace(/\.+$/, "");
  const doc = nlp(original, lexicon)
    .normalize({ verbs: true })
    .match("(#Verb|#Noun) .?+");

  //doc.match("(#Noun?|#Adjective?) #Noun").tag('Fullname');

  const parts = doc.clone().splitAfter("#Verb *?+ #Noun+").out("array");
  //const parts = doc.clone().splitAfter("#Fullname|#Noun").out("array");
  //console.log({ parts })
  const mainPart = parts[0] || '';
  const otherPart = parts.length > 1 ? parts[1] || '' : "";
  const actOn = nlp(mainPart, lexicon)
    .match("(#Noun?|#Adjective?)? #Noun")
    .first()
    .text();

  const actWith = nlp(otherPart, lexicon)
    .match("(#Noun?|#Adjective?)? #Noun")
    .first()
    .text();

  const verbs = doc.verbs().out("array");
  const nouns = doc.nouns().out("array");
  const action = verbs.find((i) => !i.includes("use")) || verbs[0] || "";
  const text = doc.text();
  const terms = nlp(original, lexicon)
    .normalize({ verbs: true }).json().map(i => i.text)

  const results = {
    json: doc.json(),
    parts,
    action,
    actOn,
    actWith,
    text,
    verbs,
    nouns,
    terms,
    original
  };

  return results;
}

export default cmdParser;
