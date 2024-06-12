import DeviceInfo from 'react-native-device-info';

const DeviceUtils = {
  isTablet: () => DeviceInfo.isTablet(),
};

export default DeviceUtils;
