
export const rndRange = (start = -100, stop = 100) => {
  const low = Math.ceil(start);
  const high = Math.floor(stop);
  return Math.floor(Math.random() * ((high - low) + 1)) + low;
};

export const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const rndDataset = (start, stop) => (
  labels.map(() => rndRange(start, stop))
);

export const rndDataset2d = (start, stop) => (
  labels.map(() => ({ x: rndRange(start, stop), y: rndRange(start, stop) }))
);


export const rndDatasets = (count = 2, props = {}, boundedRandom = false) => {
  const datasets = [];
  for (let i = 0; i < count; i += 1) {
    const rest = Array.isArray(props) ? props[i] : props;
    const start = boundedRandom ? (100 - ((i + 1) * 10)) : undefined;
    const stop = boundedRandom ? (100 - ((i) * 10)) : undefined;
    datasets.push({
      label: `Dataset ${i + 1}`,
      data: rndDataset(start, stop),
      ...rest,
    });
  }
  return {
    labels,
    datasets,
  };
};

export const rndDatasets2d = (count = 2, props = {}, boundedRandom = false) => {
  const datasets = [];
  for (let i = 0; i < count; i += 1) {
    const rest = Array.isArray(props) ? props[i] : props;
    const start = boundedRandom ? (100 - ((i + 1) * 10)) : undefined;
    const stop = boundedRandom ? (100 - ((i) * 10)) : undefined;
    datasets.push({
      label: `Dataset ${i + 1}`,
      data: rndDataset2d(start, stop),
      ...rest,
    });
  }
  return {
    labels,
    datasets,
  };
};
