import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  useWindowDimensions,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getData} from '../util/api';
import HeroComponent from './HeroComponent';
import Pagination from './Pagination';
import {Colors} from '../constants/Colors';

export interface Item {
  [key: string]: any;
}

export default function HeroSwiper() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const flatlistRef = useRef<FlatList>(null);
  const currentIdxRef = useRef(0);

  const {width, height} = useWindowDimensions();
  const isPortrait = height > width;

  useEffect(() => {
    if (items.length > 0) {
      const timeout = setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          animated: true,
          index: currentIdxRef.current,
        });
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isPortrait]);

  useEffect(() => {
    const getItems = async () => {
      const response = await getData();
      setItems(response);
    };
    getItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        const nextIndex = currentIdxRef.current + 1;
        flatlistRef.current?.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
        currentIdxRef.current = nextIndex;
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIdxRef, items]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        currentIdxRef.current = viewableItems[0].index;
        setCurrentId(viewableItems[0].item.item.id);
      }
    },
    [],
  );

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  const handleRenderItem = ({item, index}: {item: Item; index: number}) => {
    return <HeroComponent item={item} index={index} scrollX={scrollX} />;
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    flatlistRef.current?.scrollToOffset({
      offset: info.averageItemLength * info.index,
      animated: false,
    });
    setTimeout(() => {
      if (flatlistRef.current) {
        flatlistRef.current.scrollToIndex({index: info.index, animated: true});
      }
    }, 100);
  };

  const initialIndex = 1;

  if (items.length === 0) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  const duplicatedItems = [items[items.length - 1], ...items, items[0]];

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.floor(contentOffsetX / itemWidth);

    if (currentIndex === 0) {
      flatlistRef.current?.scrollToIndex({
        index: items.length,
        animated: false,
      });
    } else if (currentIndex === items.length + 1) {
      flatlistRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  };

  return (
    <View>
      <Animated.FlatList
        initialScrollIndex={initialIndex}
        ref={flatlistRef}
        bounces={false}
        style={styles.flatlist}
        data={duplicatedItems}
        keyExtractor={(item, index) => `${item.item.id}-${index}`}
        renderItem={handleRenderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <Pagination currentId={currentId} scrollX={scrollX} items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: Colors.primaryBg,
  },
});
