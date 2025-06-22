import useNasaImages from "./useNasaImages";

const useGameEngine = (query) => {
  const { images, loadingState } = useNasaImages(query);
  return { images, loadingState };
};

export default useGameEngine;