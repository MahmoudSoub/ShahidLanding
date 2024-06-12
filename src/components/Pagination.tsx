import {Animated, StyleSheet, View} from 'react-native';
import React from 'react';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import DeviceUtils from '../util/DeviceUtils';
import {Colors} from '../constants/Colors';
export interface Item {
  [key: string]: any;
}
type PaginationProps = {
  currentId: number;
  scrollX: Animated.Value;
  items: Item;
};

const Pagination = ({currentId, scrollX, items}: PaginationProps) => {
  return (
    <View style={styles.container}>
      {items.map((item: Item) => {
        return (
          <Animated.View
            key={item.item.id}
            style={
              currentId === item.item.id ? styles.line : styles.lineOpacity
            }
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimensionsCalculation(8, 132),
    paddingBottom: dimensionsCalculation(46, 9),
  },
  line: {
    backgroundColor: Colors.greenShade,
    height: dimensionsCalculation(2, 2),
    width: dimensionsCalculation(8, 8),
    marginHorizontal: 2,
  },
  lineOpacity: {
    backgroundColor: Colors.white,
    height: dimensionsCalculation(2, 2),
    width: dimensionsCalculation(8, 8),
    marginHorizontal: 2,
    opacity: 0.5,
  },
});
