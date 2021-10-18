const problem = {
  zoneStart: {A: 9, B: 6},
  A: {C: 4, D: 3},
  B: {A: 2, D: 6},
  C: {D: 7, zoneEnd: 5},
  D: {E:4, zoneEnd: 3},
  E: {zoneEnd: 4},
  zoneEnd: {}
};

const shortestRoute = (time, processed) => {
  return Object.keys(time).reduce((lowest, node) => {
    if (lowest === null || time[node] < time[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

//Part 1
const calculateFunction = (graph) => {

//Part 2
  const time = Object.assign({zoneEnd: Infinity}, graph.zoneStart);

//Part 3
  const parents = {zoneEnd: null};
  for (let child in graph.zoneStart) {
    parents[child] = 'zoneStart';
  }

 //Part 4
  const processed = [];

  let node = shortestRoute(time, processed);

  while (node) {
    let timeSpent = time[node];
    let children = graph[node];
    for (let n in children) {
      let newTime = timeSpent + children[n];
      if (!time[n]) {
        time[n] = newTime;
        parents[n] = node;
      }
      if (time[n] > newTime) {
        time[n] = newTime;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = shortestRoute(time, processed);
  }

  let optimizedPath = ['zoneEnd'];
  let parent = parents.zoneEnd;
  while (parent) {
    optimizedPath.push(parent);
    parent = parents[parent];
  }
  optimizedPath.reverse();

  const results = {
    distance: time.zoneEnd,
    path: optimizedPath
  };

  return results;
};

console.log(calculateFunction(problem));