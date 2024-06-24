import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import {Colors} from '../constants/Colors';
import {Item} from './HeroSwiper';
import DeviceUtils from '../util/DeviceUtils';

type PaginationProps = {
  currentId: number;
  scrollX: Animated.Value;
  items: Item[];
};

const LINE_HEIGHT = dimensionsCalculation(2, 2);
const LINE_WIDTH = dimensionsCalculation(8, 8);
const LINE_SPACING = dimensionsCalculation(4, 4);
const isTablet = DeviceUtils.isTablet();

const Pagination = ({currentId, scrollX, items}: PaginationProps) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {items.map((item: Item, index: number) => {
        return (
          <Animated.View
            key={item.item.id}
            style={[
              styles.inactiveLine,
              {marginLeft: index === 0 ? 0 : LINE_SPACING},
            ]}
          />
        );
      })}
      <Animated.View
        style={[
          styles.activeLine,
          {
            left: null,
            right: -(items.length * LINE_WIDTH),
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [
                    items.length * width,
                    (items.length + 1) * width,
                  ],
                  outputRange: [0, LINE_WIDTH],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.activeLine,
          {
            transform: [
              {
                translateX: Animated.divide(scrollX, width).interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, LINE_WIDTH + LINE_SPACING],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.activeLine,
          {
            left: -LINE_WIDTH,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [
                    items.length * width,
                    (items.length + 1) * width,
                  ],
                  outputRange: [0, LINE_WIDTH],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: isTablet ? dimensionsCalculation(8, 0) : undefined,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: dimensionsCalculation(46, 8),
    overflow: 'hidden',
  },
  activeLine: {
    position: 'absolute',
    left: -(LINE_WIDTH + LINE_SPACING),
    backgroundColor: Colors.greenShade,
    height: LINE_HEIGHT,
    width: LINE_WIDTH,
  },
  inactiveLine: {
    backgroundColor: Colors.white,
    height: LINE_HEIGHT,
    width: LINE_WIDTH,
  },
});
