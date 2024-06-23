import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  useWindowDimensions,
  Animated,
} from 'react-native';
import React, {Dispatch} from 'react';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import {updateImageUri} from '../util/updateImageUri';
import DeviceUtils from '../util/DeviceUtils';
import {Item} from './HeroSwiper';
import PlayButton from './PlayButton';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants/Colors';

interface MobileHeroInfoProps {
  setIsMyListChecked: Dispatch<React.SetStateAction<boolean>>;
  isMyListChecked: boolean;
  item: Item;
}
interface Genre {
  id: number;
  title: string;
}

export default function MobileHeroInfo({
  item,
  scrollX,
  index,
  isMyListChecked,
  setIsMyListChecked,
}: MobileHeroInfoProps) {
  const isTablet = DeviceUtils.isTablet();
  const {width} = useWindowDimensions();

  const handleMyListPress = () => {
    setIsMyListChecked(!isMyListChecked);
  };
  return (
    <View style={styles.heroInfo}>
      <LinearGradient
        locations={[0.38, 0.89]}
        colors={Colors.bottomGradientM}
        style={[styles.bottomGradient, {width}]}
      />
      <Image
        source={{
          uri: updateImageUri({
            url: item.item.logoTitleImage,
            height: '',
            width: dimensionsCalculation(0, 246),
            croppingPoint: 'mc',
          }),
        }}
        resizeMode="contain"
        style={styles.logoImage}
      />
      <View style={styles.freeSeasonGenresContainer}>
        {!!item.item.season?.numberOfAVODEpisodes && (
          <>
            <Image
              source={require('../assets/unlock.png')}
              style={styles.unlockImage}
            />

            <Text style={styles.seasonText}>
              {`${item.item.season?.numberOfAVODEpisodes} Free ${
                item.item.season?.numberOfAVODEpisodes > 1
                    ? 'Episodes'
                  : 'Episode'
              } `}
            </Text>

            <View style={styles.greenCircle} />
          </>
        )}
        {!!item.item.season?.seasonNumber && (
          <>
            <Text style={styles.seasonText}>
              {` Season ${item.item.season?.seasonNumber} `}
            </Text>
            <View style={styles.greenCircle} />
          </>
        )}
          {item.item.genres.map((genre: Genre, index: number) => {
            const shouldRenderGreenCircle =
              index === 0
                ? !!item.item.season?.seasonNumber
                : item.item.genres.length !== 1;

            return (
            <View key={genre.id} style={styles.genreContainer}>
                {shouldRenderGreenCircle && <View style={styles.greenCircle} />}
              <Text style={styles.genreText}>{` ${genre.title} `}</Text>
              {index !== item.item.genres.length - 1 && (
                <View style={styles.greenCircle} />
              )}
            </View>
            );
          })}
      </View>
      <View style={styles.topAndRank}>
        <Image
          source={require('../assets/top10.png')}
          style={styles.top10Image}
        />
        {!!item.item.season?.tag && (
            <View style={styles.greenSeparatorAndtagText}>
            <View style={styles.greenSeparator} />
            <Text style={styles.tagText}>{item.item.season?.tag}</Text>
            </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable>
          <PlayButton />
        </Pressable>
          <Pressable style={styles.plusAndMyList} onPress={handleMyListPress}>
          <ImageBackground
            style={styles.plusBorder}
            source={require('../assets/gradientBorderM.png')}>
            <Image
              style={styles.plusImage}
                source={
                  isMyListChecked
                    ? require('../assets/check.png')
                    : require('../assets/plus.png')
                }
              tintColor={Colors.white}
            />
            <Text style={styles.myListText}>My List</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: dimensionsCalculation(8, 0),
    paddingBottom: dimensionsCalculation(0, 27),
  },
  logoImage: {
    height: dimensionsCalculation(0, 88),
    width: dimensionsCalculation(0, 246),
    paddingBottom: dimensionsCalculation(8, 0),
    marginBottom: dimensionsCalculation(0, 8),
  },
  topAndRank: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: dimensionsCalculation(0, 14),
  },
  greenSeparatorAndtagText: {
    left: dimensionsCalculation(4, 8),
    flexDirection: 'row',
    alignItems: 'center',
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
  freeSeasonGenresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: dimensionsCalculation(0, 25),
    marginBottom: dimensionsCalculation(0, 10),
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
    height: dimensionsCalculation(0, 15),
    width: dimensionsCalculation(0, 4),
    backgroundColor: Colors.greenShade,
    marginRight: dimensionsCalculation(0, 4),
  },
  plusBorder: {
    height: dimensionsCalculation(0, 32),
    width: dimensionsCalculation(0, 148),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  plusImage: {
    height: dimensionsCalculation(0, 16),
    width: dimensionsCalculation(0, 16),
    marginRight: dimensionsCalculation(0, 8),
  },
  plusAndMyList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myListText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(0, 14),
    fontWeight: 'bold',
    marginLeft: dimensionsCalculation(8, 0),
  },
  unlockImage: {
    height: dimensionsCalculation(0, 12),
    width: dimensionsCalculation(0, 12),
    marginRight: dimensionsCalculation(0, 4),
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: dimensionsCalculation(0, 9),
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: dimensionsCalculation(0, 474),
  },
  genresContainer: {
    flexDirection: 'row',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(0, 14),
    fontWeight: 'bold',
  },
});
