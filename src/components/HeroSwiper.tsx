import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
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

  useEffect(() => {
    const getItems = async () => {
      const response = await getData();
      setItems(response);
    };
    getItems();
  }, []);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setCurrentId(viewableItems[0].item.item.id);
      }
    },
    [],
  );
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);
  };
  const handleRenderItem = ({item}: {item: Item}) => {
    return <HeroComponent item={item} />;
  };

  return (
    <View>
      <FlatList
        style={styles.flatlist}
        data={items}
        keyExtractor={item => item.item.id}
        renderItem={handleRenderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
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
