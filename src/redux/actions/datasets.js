const listAll = () => {
  return {
    type: "LIST_DATASETS",
    datasets: [{ title: "test" }]
  };
};

export { listAll };
