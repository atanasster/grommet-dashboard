
export const rndRange = (start = -100, stop = 100) => {
  const low = Math.ceil(start);
  const high = Math.floor(stop);
  return Math.floor(Math.random() * ((high - low) + 1)) + low;
};

export const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const rndDataset = () => (
  labels.map(() => rndRange())
);

export const rndDatasets = ({
  count = 2,
  props = {},
} = {}) => {
  const datasets = [];
  for (let i = 0; i < count; i += 1) {
    const rest = Array.isArray(props) ? props[i] : props;
    datasets.push({
      label: `Dataset ${i + 1}`,
      data: rndDataset(),
      ...rest,
    });
  }
  return {
    labels,
    datasets,
  };
};
