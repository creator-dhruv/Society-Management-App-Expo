import { useWindowDimensions } from "react-native";

const useDimension = () => {
  const { width, height } = useWindowDimensions();
  return { width: width * 0.9, height: height * 0.9 };
};

export default useDimension;
