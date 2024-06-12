import {Dimensions} from 'react-native';
import DeviceUtils from './DeviceUtils';

export const dimensionsCalculation = (
  IPadPixel: number,
  IPhonePixel: number,
) => {
  const {width, height} = Dimensions.get('window');
  const isTablet = DeviceUtils.isTablet();
  if (isTablet && width > height) {
    return (height * IPadPixel) / 768;
  } else if (isTablet) {
    return (width * IPadPixel) / 768;
  } else {
    return width > height
      ? (height * IPhonePixel) / 320
      : (width * IPhonePixel) / 320;
  }
};
