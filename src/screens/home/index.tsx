// import React from 'react';
// import { StyleSheet } from 'react-native';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { scale } from 'react-native-size-matters';

// import { PersonItem } from '@/components/person-item';
// //import { useTheme } from "@shopify/restyle";
// import { TopHeader } from '@/components/top-header/header-ios';
// import { palette } from '@/theme';
// import { View } from '@/ui';

// import { HomeSliderContainer } from './home-slider';
// import { SegmentContainer } from './segment-container';

// const HEADER_MAX_HEIGHT = 310;
// const HEADER_MIN_HEIGHT = 100;

// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// const DATA = Array(100)
//   .fill(null)
//   .map((_, idx) => ({
//     id: idx,
//     title: 'John wick',
//     avatar: 'avatar',
//     tags: ['cv', 'cover letter'],
//     appliedFor: 'Frontend designer',
//     appliedOn: '27 Aug 2023',
//   }));

// export const Home = () => {
//   // const { colors } = useTheme<Theme>();

//   const { top } = useSafeAreaInsets();
//   const translationY = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler((event) => {
//     translationY.value = withTiming(event.contentOffset.y);
//   });

//   const stylez = useAnimatedStyle(() => {
//     const translate2 = interpolate(
//       translationY.value,
//       [0, HEADER_SCROLL_DISTANCE],
//       [0, -HEADER_SCROLL_DISTANCE],
//       {
//         extrapolateRight: Extrapolation.CLAMP,
//       }
//     );

//     return {
//       transform: [
//         {
//           translateY: translate2,
//         },
//       ],
//     };
//   });

//   return (
//     <View flex={1} backgroundColor={'white'}>
//       <View style={styles.topHeader}>
//         <TopHeader top={top} />
//       </View>
//       <Animated.View style={[styles.maxHeader, stylez]}>
//         <HomeSliderContainer />
//         <View paddingTop={'large'} alignItems={'center'}>
//           <SegmentContainer
//             onChangeSegment={(index) => {
//               console.log(index);
//             }}
//           />
//         </View>
//       </Animated.View>
//       <Animated.ScrollView
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//         bounces={false}
//         style={{
//           marginTop: top,
//         }}
//         contentContainerStyle={{
//           paddingTop: HEADER_MAX_HEIGHT + scale(72) + scale(10),
//           paddingHorizontal: scale(16),
//         }}
//       >
//         <View>
//           {DATA?.map((element, index) => {
//             return <PersonItem key={index} {...element} />;
//           })}
//         </View>
//       </Animated.ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   topHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//   },
//   maxHeader: {
//     position: 'absolute',
//     top: scale(72) + scale(37),
//     left: 0,
//     right: 0,
//     overflow: 'hidden',
//     backgroundColor: palette.white,
//     height: HEADER_MAX_HEIGHT,
//     zIndex: 1,
//   },
// });

import { useTheme } from '@shopify/restyle';
import type { Route } from '@showtime-xyz/tab-view';
import { TabView } from '@showtime-xyz/tab-view';
import React, { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { TabBar } from 'react-native-tab-view';

import { TopHeader } from '@/components/top-header';
import type { Theme } from '@/theme';
import { FocusAwareStatusBar, Screen, Text, View } from '@/ui';

import { HomeSliderContainer } from './home-slider';
import Interviews from './interview';
import PendingList from './pending';
import ShortListed from './short-listed';

const PendingTab = ({ route }: any) => {
  return <PendingList index={route?.index} />;
};

const ShortListedTab = ({ route }: any) => {
  return <ShortListed index={route?.index} />;
};

const InterviewsTab = ({ route }: any) => {
  return <Interviews index={route?.index} />;
};

const renderLabel = ({
  focused,
  route,
}: {
  focused: boolean;
  route: { title: string };
}) => {
  return (
    <View
      backgroundColor={focused ? 'primary' : 'grey500'}
      justifyContent={'center'}
      alignItems={'center'}
      height={scale(32)}
      width={scale(94)}
      borderRadius={scale(8)}
    >
      <Text
        color={focused ? 'white' : 'black'}
        variant="medium14"
        numberOfLines={1}
      >
        {route.title}
      </Text>
    </View>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View marginHorizontal={'large'} marginVertical={'large'}>
      <TabBar
        {...props}
        style={styles.tabBar}
        scrollEnabled={false}
        renderLabel={renderLabel}
        renderIndicator={() => null}
      />
    </View>
  );
};

const renderHeader = () => {
  return <HomeSliderContainer />;
};

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const [routes] = useState<Route[]>([
    { key: 'Pending', title: 'Pending', index: 0 },
    { key: 'Shortlisted', title: 'Shortlisted', index: 1 },
    { key: 'Interviews', title: 'Interviews', index: 2 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case 'Pending':
        return <PendingTab route={route} index={0} />;
      case 'Shortlisted':
        return <ShortListedTab route={route} index={1} />;
      case 'Interviews':
        return <InterviewsTab route={route} index={2} />;

      default:
        return null;
    }
  }, []);

  return (
    <Screen edges={['top']} backgroundColor={colors.primary}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors?.primary}
      />
      <TopHeader />
      <TabView
        onStartRefresh={onStartRefresh}
        isRefreshing={isRefreshing}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy
        renderScrollHeader={renderHeader}
        minHeaderHeight={0}
        animationHeaderPosition={animationHeaderPosition}
        animationHeaderHeight={animationHeaderHeight}
        enableGestureRunOnJS={false}
        scrollEnabled={false}
        style={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F2F2F3',
    borderRadius: scale(8),
  },
  indicatorStyle: {
    height: scale(3),
    backgroundColor: '#01C96C',
  },
});
