import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const METRICS = {
  screenWidth: width,
  screenHeight: height,
  padding: 20,
  margin: 20,
  radius: 15,
  inputHeight: 55,
};