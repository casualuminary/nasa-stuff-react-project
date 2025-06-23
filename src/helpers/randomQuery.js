import spaceWords from "../helpers/spaceWords";

const randomQuery = () => {
  return spaceWords[Math.floor(Math.random() * spaceWords.length)];
};

export default randomQuery;