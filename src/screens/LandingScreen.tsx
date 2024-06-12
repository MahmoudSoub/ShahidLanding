import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeroSwiper from '../components/HeroSwiper';
import HeroHeader from '../components/HeroHeader';
import {Colors} from '../constants/Colors';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <HeroHeader />
      <HeroSwiper />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
  },
});
