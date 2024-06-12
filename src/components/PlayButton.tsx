import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {dimensionsCalculation} from '../util/dimensionsCalculation';
import DeviceUtils from '../util/DeviceUtils';
import {Colors} from '../constants/Colors';

export default function PlayButton() {
  const isTablet = DeviceUtils.isTablet();

  return (
    <View style={styles.buttonContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.greenShade, '#0099ff']}
        style={styles.linearGradient}>
        {isTablet ? (
          <Image
            source={require('../assets/playIcon.png')}
            style={styles.playIcon}
          />
        ) : (
          <View style={styles.playAndWatch}>
            <Image
              source={require('../assets/playIcon.png')}
              style={styles.playIcon}
            />
            <Text style={styles.watchNowText}>Watch Now</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: dimensionsCalculation(40, 32),
    width: dimensionsCalculation(40, 148),
    borderRadius: dimensionsCalculation(20, 16),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    height: dimensionsCalculation(24, 24),
    width: dimensionsCalculation(24, 24),
  },
  playAndWatch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchNowText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: dimensionsCalculation(0, 14),
  },
});
