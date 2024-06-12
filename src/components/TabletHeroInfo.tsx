import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import {updateImageUri} from '../util/updateImageUri';
import DeviceUtils from '../util/DeviceUtils';
import {Item} from './HeroSwiper';
import {BlurView} from '@react-native-community/blur';
import PlayButton from './PlayButton';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants/Colors';

interface TabletHeroInfoProps {
  item: Item;
}
export default function TabletHeroInfo({item}: TabletHeroInfoProps) {
  const {width, height} = useWindowDimensions();
  const isTablet = DeviceUtils.isTablet();
  return (
    <View style={styles.heroInfo}>
      <LinearGradient
        locations={[0, 0.5, 1]}
        colors={Colors.bottomGradientT}
        style={[styles.bottomGradient, {width}]}
      />
      <LinearGradient
        locations={[0, 0.5, 1]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={Colors.leftToRightGradientT}
        style={styles.leftToRightGradient}
      />
      <Image
        source={{
          uri: updateImageUri({
            url: item.item.logoTitleImage,
            height: dimensionsCalculation(96, 88),
            width: isTablet ? 'auto' : dimensionsCalculation(0, 88),
            croppingPoint: 'mc',
          }),
        }}
        resizeMode="contain"
        style={styles.logoImage}
      />
      <View style={styles.topAndRank}>
        <Image
          source={require('../assets/top10.png')}
          style={styles.top10Image}
        />
        <Text style={styles.rankText}>#8 in Jordan</Text>
      </View>
      <View style={styles.seasonAndGenre}>
        {!!item.item.season?.seasonNumber && (
          <>
            <Text style={styles.seasonText}>
              {`Season ${item.item.season?.seasonNumber}`}
            </Text>
            <View style={styles.greenCircle} />
          </>
        )}
        <Text style={styles.genreText}>{`${item.item.genres[0].title}`}</Text>
      </View>
      <View style={styles.serparatorAndShowing}>
        <View style={styles.greenSeparator} />
        <Text style={styles.showingText}>Showing First on VIP</Text>
      </View>
      <BlurView
        blurAmount={10}
        blurType="chromeMaterialDark"
        style={styles.playAndPlusContainer}>
        <Pressable style={styles.playPressable}>
          <PlayButton />
          <View style={styles.watchAndSeason}>
            <Text style={styles.watchNowText}>Watch Now</Text>
            {!!item.item.season?.seasonNumber && (
              <Text
                style={
                  styles.playSeasonText
                }>{`Season ${item.item.season?.seasonNumber}, Episode 2`}</Text>
            )}
          </View>
        </Pressable>
        <View style={styles.graySeparator} />
        <Pressable style={styles.plusAndMyList}>
          <ImageBackground
            style={styles.plusBorder}
            source={require('../assets/gradientBorder.png')}>
            <Image
              style={styles.plusImage}
              source={require('../assets/plus.png')}
              tintColor={Colors.white}
            />
          </ImageBackground>
          <Text style={styles.myListText}>My List</Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: dimensionsCalculation(8, 0),
    paddingBottom: dimensionsCalculation(46, 0),
  },
  logoImage: {
    height: dimensionsCalculation(96, 88),
    width: dimensionsCalculation(216, 88),
    paddingBottom: dimensionsCalculation(8, 0),
  },
  topAndRank: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: dimensionsCalculation(16, 0),
  },
  rankText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(14, 0),
    fontWeight: 'bold',
  },
  top10Image: {
    height: dimensionsCalculation(32, 20),
    width: dimensionsCalculation(24, 16),
    marginRight: dimensionsCalculation(4, 8),
  },
  seasonAndGenre: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: dimensionsCalculation(8, 0),
  },
  seasonText: {
    color: Colors.whiteShade,
    fontSize: dimensionsCalculation(14, 0),
    marginRight: dimensionsCalculation(6, 0),
  },
  genreText: {
    color: Colors.offWhite,
    fontSize: dimensionsCalculation(14, 0),
  },
  greenCircle: {
    height: dimensionsCalculation(4, 4),
    width: dimensionsCalculation(4, 4),
    borderRadius: dimensionsCalculation(2, 2),
    backgroundColor: Colors.greenShade,
    marginRight: dimensionsCalculation(6, 0),
  },
  greenSeparator: {
    height: dimensionsCalculation(18, 0),
    width: dimensionsCalculation(4, 0),
    backgroundColor: Colors.greenShade,
    marginRight: dimensionsCalculation(8, 0),
  },
  serparatorAndShowing: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: dimensionsCalculation(16, 0),
  },
  showingText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(16, 0),
    fontWeight: 'bold',
  },
  playAndPlusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensionsCalculation(40, 0),
    width: dimensionsCalculation(306, 0),
    backgroundColor: Colors.blurBg,
    borderRadius: dimensionsCalculation(20, 0),
  },
  watchAndSeason: {
    marginLeft: dimensionsCalculation(12, 0),
  },
  playPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchNowText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(14, 0),
    fontWeight: 'bold',
  },
  playSeasonText: {
    color: Colors.offWhite,
    fontSize: dimensionsCalculation(12, 0),
  },
  graySeparator: {
    height: dimensionsCalculation(32, 0),
    width: dimensionsCalculation(1, 0),
    backgroundColor: Colors.graySeparator,
    marginHorizontal: dimensionsCalculation(24, 0),
  },
  plusBorder: {
    height: dimensionsCalculation(32, 0),
    width: dimensionsCalculation(32, 0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusImage: {
    height: dimensionsCalculation(12, 0),
    width: dimensionsCalculation(12, 0),
  },
  plusAndMyList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myListText: {
    color: Colors.white,
    marginLeft: dimensionsCalculation(8, 0),
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: dimensionsCalculation(136, 0),
  },
  leftToRightGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: dimensionsCalculation(576, 0),
    width: dimensionsCalculation(512, 0),
  },
});
