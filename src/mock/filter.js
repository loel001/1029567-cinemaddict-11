const filterNames = [
  `watchlist`, `history`, `favorites`
];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 20),
    };
  });
};

export {generateFilters};
