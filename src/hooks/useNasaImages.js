import { useEffect, useState } from 'react';
import loadingStatus from '../helpers/loadingStatus';

const useNasaImages = (query) => {
  const [images, setImages] = useState();
  const [loadingState, setLoading] = useState(null);

  useEffect(() => {
    //The NASA API is called and then the results go to the state
    const fetchImages = async (query = "") => {
      try {
        if(query) {
          setLoading(loadingStatus.isLoading);
          const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
          const json = await response.json();
          setImages(json.collection.items);
          setLoading(loadingStatus.loaded);
        }
      } catch (err) {
        setLoading(loadingStatus.hasErrored);
      }
    };
    fetchImages(query);
  },[query]);
  return {images, loadingState};
};

export default useNasaImages;