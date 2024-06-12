import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../constants/Colors';

export default function HeroHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/headerLogo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Pressable>
        <Text style={styles.headerText}>TV SHOWS</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.headerText}>Movies</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    paddingTop: getStatusBarHeight() + dimensionsCalculation(12, 15),
    paddingBottom: dimensionsCalculation(10, 10),
    marginLeft: dimensionsCalculation(10, 12),
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    color: Colors.white,
    fontSize: dimensionsCalculation(18, 16),
    marginRight: dimensionsCalculation(24, 22),
  },
  logoImage: {
    height: dimensionsCalculation(24, 22),
    width: dimensionsCalculation(24, 22),
    marginRight: dimensionsCalculation(16, 15),
  },
});
