// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { StyleSheet, useWindowDimensions } from "react-native";
// import { SceneMap, TabBar, TabView } from "react-native-tab-view";

// import { translate } from "@/i18n";
// import { PressableScale, Text, View } from "@/ui";

// import Education from "./education";
// import Experience from "./experience";
// import Header from "./header";
// import History from "./history";
// import OverView from "./overview";

// const FirstRoute = () => (
//   <View flex={1}>
//     <OverView />
//   </View>
// );

// const SecondRoute = () => (
//   <View flex={1}>
//     <Experience />
//   </View>
// );

// const ThirdRoute = () => (
//   <View flex={1}>
//     <Education />
//   </View>
// );

// const FourthRoute = () => (
//   <View flex={1}>
//     <History />
//   </View>
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
//   fourth: FourthRoute,
// });

// const renderTabBar = (props: any) => {
//   const renderLabel = ({ focused, route }: { focused: boolean; route: { title: string } }) => {
//     return (
//       <Text
//         color={focused ? "primary" : "grey300"}
//         variant="heading"
//         numberOfLines={1}
//         backgroundColor="secondary"
//       >
//         {translate(route.title)}
//       </Text>
//     );
//   };

//   return (
//     <TabBar
//       {...props}
//       style={styles.tabBar}
//       inactiveColor={"black"}
//       indicatorStyle={[styles.indicatorStyle]}
//       //   indicatorContainerStyle={styles.indicatorContainerStyle}
//       scrollEnabled={true}
//       renderLabel={renderLabel}
//       // tabStyle={{ width: width / 2 }}
//     />
//   );
// };

// export const Job = () => {
//   const navigation = useNavigation();
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: "first", title: "Overview" },
//     { key: "second", title: "Experience" },
//     { key: "third", title: "Education & Skills" },
//     { key: "fourth", title: "History" },
//   ]);

//   return (
//     <View flex={1} backgroundColor={"white"}>
//       <PressableScale onPress={() => navigation.navigate("CandidateProfile")}>
//         <Header />
//       </PressableScale>
//       <View flex={1} paddingTop={"small"}>
//         <TabView
//           renderTabBar={renderTabBar}
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           onIndexChange={setIndex}
//           initialLayout={{ width: layout.width }}
//           swipeEnabled={true}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: "100%",
//     height: 100,
//     contentFit: "cover",
//   },

//   profile: {
//     width: 50,
//     height: 50,
//     borderRadius: 20,
//   },
//   tabBar: {
//     backgroundColor: "transparent",
//     shadowColor: "transparent",
//     height: 45,
//   },
//   indicatorStyle: {
//     height: 3,
//     borderRadius: 2,
//     backgroundColor: "#01C96C",
//     // marginHorizontal: 15,
//   },
// });

import { useTheme } from '@shopify/restyle';
import type { Route } from '@showtime-xyz/tab-view';
import { TabView } from '@showtime-xyz/tab-view';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { TabBar } from 'react-native-tab-view';

import { ScreenHeader } from '@/components/screen-header';
import { TabFlashList } from '@/components/tab-flash-list';
import type { Theme } from '@/theme';
import { Screen } from '@/ui';

const TabScene = ({ route }: any) => {
  return (
    <TabFlashList
      index={route.index}
      data={new Array(20).fill(0)}
      estimatedItemSize={60}
      renderItem={({ index }) => {
        return (
          <View
            style={{
              height: 60,
              backgroundColor: '#fff',
              marginBottom: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{`${route.title}-Item-${index}`}</Text>
          </View>
        );
      }}
    />
  );
};

const renderTabBar = (props: any) => {
  const renderLabel = ({
    focused,
    route,
  }: {
    focused: boolean;
    route: { title: string };
  }) => {
    console.log('focused', focused);

    return (
      <Text
        //color={focused ? "primary" : "grey300"}
        // variant="heading"
        numberOfLines={1}
        //backgroundColor="secondary"
      >
        {route.title}
      </Text>
    );
  };

  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      inactiveColor={'black'}
      // indicatorStyle={[styles.indicatorStyle]}
      //   indicatorContainerStyle={styles.indicatorContainerStyle}
      scrollEnabled={true}
      renderLabel={renderLabel}
      tabStyle={{ width: 100 }}
    />
  );
};

export function Job() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const [routes] = useState<Route[]>([
    { key: 'like', title: 'Like', index: 0 },
    { key: 'owner', title: 'Owner', index: 1 },
    { key: 'created', title: 'Created', index: 2 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case 'like':
        return <TabScene route={route} index={0} />;
      case 'owner':
        return <TabScene route={route} index={1} />;
      case 'created':
        return <TabScene route={route} index={2} />;

      default:
        return null;
    }
  }, []);

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log('onStartRefresh');
      setIsRefreshing(false);
    }, 300);
  };

  const renderHeader = () => (
    <View style={{ height: 300, backgroundColor: '#000' }} />
  );

  return (
    <Screen edges={['top']} backgroundColor={colors.white}>
      <ScreenHeader />
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
        scrollEnabled={true}
        style={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    contentFit: 'cover',
  },

  profile: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  tabBar: {
    backgroundColor: 'red',
    height: 45,
  },
  indicatorStyle: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#01C96C',
    // marginHorizontal: 15,
  },
});
