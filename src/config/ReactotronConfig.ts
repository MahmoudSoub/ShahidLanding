import Reactotron, {trackGlobalErrors} from 'reactotron-react-native';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {reactotronRedux} from 'reactotron-redux';
// grabs the ip address
const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    host,
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  //   .use(trackGlobalErrors())
  //   .use(reactotronRedux())
  .connect(); // let's connect!

export default reactotron;
