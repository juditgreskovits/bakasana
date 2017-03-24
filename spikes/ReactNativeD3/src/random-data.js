// TODO
// Ensure there's no two same source / target combination for links - done
// Consider doing all nodes having at least one link, some having two or three (would be prettier) - done - not that much prettier...
// Figure out how you can create an array or arbitrary length in a nicer way - bah best I could come up w is below...
// Created 'flower' data which is prettier

const filledArray = (n) => {

  const array = [];
  while(array.length < n) {
    array.push(array.length);
  }
  return array;
}

const randomIntWithinRange = (start, end) =>
  start + Math.round(Math.random()*(end-start));

export const flowerData = () => {
  // get a number within a range
  // create item 1 that all will link to - create nodes and links, retain reference to item that all link to
  // repeat for random times within range
  // link them together somehow

  const createGroup = (startIndex=0) => {

    const nodes = filledArray(randomIntWithinRange(9, 12))
      .map((node, index) => ({
        index: startIndex + index,
        name: `node-${index}`
      }));

    const links = nodes
      .filter((node, index) => index !== 0)
      .map((node, index) => ({
        name: `link-${node.index}`,
        source: startIndex,
        target: node.index
      }));

      return ({
        nodes: nodes,
        links: links
      });
  };

  const createGroups = (totalGroups=6) => {

    const groups = filledArray(totalGroups)
      .reduce((acc, g, i) => {

        if(!acc) acc = {nodes: [], links: []}; // this won't be needed as we can just assign, but for now, chill!
        console.log('acc = ', acc);
        const group = createGroup(acc.nodes.length);
        const groupLink = {
          name: `link-${group.nodes[0].index}`,
          source: 0,
          target: group.nodes[0].index
        };

        return ({
          nodes: [
            ...acc.nodes,
            ...group.nodes
          ],
          links: [
            ...acc.links,
            ...group.links,
            groupLink
          ]
        });
      });
    return groups;
  };

  return  createGroups(randomIntWithinRange(9, 12));
};

export const linkedData = () => {

  const nodeArray = filledArray(randomIntWithinRange(6, 12));

  const nodes = nodeArray.map((node, index) => {
    return ({
      index: index,
      name: `node-${index}`
    });
  });

  // THIS is how we do functional in js, no indices, Jude!!!
  // Also, make better friends w reduce ;)
  const getRandomNode = (nodes, source) => {
    const randomIndex = randomIntWithinRange(0, nodes.length-2);
    return nodes.map((node, i) => i)
                        .filter((targetIndex, i) => i !== source)
                        .reduce((acc, targetIndex, i) => i === randomIndex ? i : acc);
  }

  const getLinks = (nodes) => {
    return nodes.map((link, index) => {

      const source = index; //getRandomNode(nodes);
      const target = getRandomNode(nodes, source);

      return ({
        index: index,
        name: `link-${index}`,
        source: source,
        target: target
      });
    });
  }

  let links = getLinks(nodes);

  const someNodes = nodes.reduce((acc, node, index) => {
    return node.index >= 6 ? acc :
      Array.isArray(acc) ? acc.concat(getRandomNode(nodes)) :
        [getRandomNode(nodes)]
      });

  links = links.concat(getLinks(someNodes));

  return ({
    nodes: nodes,
    links: links
  });
}
