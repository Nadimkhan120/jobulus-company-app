import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

//import { useTheme } from "@shopify/restyle";
import { TopHeader } from '@/components/top-header';
import { palette } from '@/theme';
import { Text, View } from '@/ui';

import { HomeSliderContainer } from './home-slider';
import { SegmentContainer } from './segment-container';

const HEADER_MAX_HEIGHT = 310;
const HEADER_MIN_HEIGHT = 100;

const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = Array(100)
  .fill(null)
  .map((_, idx) => ({
    id: idx,
    title: 'tanveer',
    description: 'description',
    tags: ['travel', 'Enter'],
    text: [
      'Premium cars - 1,000 Miles',
      'Standard cars - 600 Miles',
      ' Emirates Skywards Platinum or Gold members - 200 bonus Miles',
    ],
  }));

export const Home = () => {
  // const { colors } = useTheme<Theme>();

  const { top } = useSafeAreaInsets();
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = withTiming(event.contentOffset.y);
  });

  const stylez = useAnimatedStyle(() => {
    const translate2 = interpolate(
      translationY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    return {
      transform: [
        {
          translateY: translate2,
        },
      ],
    };
  });

  return (
    <View flex={1}>
      <View style={styles.topHeader}>
        <TopHeader top={top} />
      </View>
      <Animated.View style={[styles.maxHeader, stylez]}>
        <HomeSliderContainer />
        <View paddingTop={'large'} alignItems={'center'}>
          <SegmentContainer
            onChangeSegment={(index) => {
              console.log(index);
            }}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        style={{
          marginTop: top,
        }}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT + scale(72),
        }}
      >
        <View>
          {DATA?.map((element, index) => {
            return <Text key={index}>{index}</Text>;
          })}
        </View>
      </Animated.ScrollView>
      {/* <TopHeader />
      <HomeSliderContainer />
      <View flex={1} paddingHorizontal={"large"}>
        <View paddingTop={"large"}>
          <SegmentContainer
            onChangeSegment={(index) => {
              console.log(index);
            }}
          />
        </View> */}
      {/* {[0, 1, 3, 4, 5, 6].map((element, index) => {
          return (
            <View>
              <Text>hello</Text>
            </View>
          );
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  maxHeader: {
    position: 'absolute',
    top: scale(72) + scale(37),
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: palette.white,
    height: HEADER_MAX_HEIGHT,
    zIndex: 1,
  },
});
