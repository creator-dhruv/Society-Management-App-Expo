import { useWindowDimensions } from "react-native";

const useDimension = () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};

export default useDimension;
