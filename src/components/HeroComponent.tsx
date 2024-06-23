import {
  View,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import {updateImageUri} from '../util/updateImageUri';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import TabletHeroInfo from './TabletHeroInfo';
import {Item} from './HeroSwiper';
import DeviceUtils from '../util/DeviceUtils';
import MobileHeroInfo from './MobileHeroInfo';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants/Colors';

interface HeroComponentProps {
  item: Item;
  scrollX: Animated.Value;
  index: number;
}

export default function HeroComponent({
  item,
  scrollX,
  index,
}: HeroComponentProps) {
  const [isMyListChecked, setIsMyListChecked] = useState(false);
  const isTablet = DeviceUtils.isTablet();
  const {width, height} = useWindowDimensions();
  const isPortrait = height > width;
  return (
    <View>
      <ImageBackground
        source={{
          uri: updateImageUri({
            url: item.item.image.landscapeClean,
            height: dimensionsCalculation(isPortrait ? 480 : 576, 474),
            width: dimensionsCalculation(isPortrait ? 768 : 1024, 320),
          }),
        }}
        resizeMode="contain"
        style={[
          styles.heroImage,
          {
            height: dimensionsCalculation(isPortrait ? 480 : 576, 474),
            width: dimensionsCalculation(isPortrait ? 768 : 1024, 320),
          },
        ]}>
        <LinearGradient
          colors={Colors.topGradient}
          style={styles.topGradient}
        />
        {isTablet ? (
          <TabletHeroInfo
            item={item}
            scrollX={scrollX}
            index={index}
            isMyListChecked={isMyListChecked}
            setIsMyListChecked={setIsMyListChecked}
          />
        ) : (
          <MobileHeroInfo
            item={item}
            scrollX={scrollX}
            index={index}
            isMyListChecked={isMyListChecked}
            setIsMyListChecked={setIsMyListChecked}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: dimensionsCalculation(768, 320),
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: dimensionsCalculation(64, 64),
    width: '100%',
  },
});
