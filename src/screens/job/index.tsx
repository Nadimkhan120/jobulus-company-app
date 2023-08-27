import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { translate } from '@/i18n';
import { PressableScale, Text, View } from '@/ui';

import Education from './education';
import Experience from './experience';
import Header from './header';
import History from './history';
import OverView from './overview';

const FirstRoute = () => (
  <View flex={1}>
    <OverView />
  </View>
);

const SecondRoute = () => (
  <View flex={1}>
    <Experience />
  </View>
);
const ThirdRoute = () => (
  <View flex={1}>
    <Education />
  </View>
);
const FourthRoute = () => (
  <View flex={1}>
    <History />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const renderTabBar = (props: any) => {
  const renderLabel = ({
    focused,
    route,
  }: {
    focused: boolean;
    route: { title: string };
  }) => {
    return (
      <Text
        color={focused ? 'primary' : 'grey300'}
        variant="heading"
        numberOfLines={1}
        backgroundColor="secondary"
      >
        {translate(route.title)}
      </Text>
    );
  };

  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      inactiveColor={'black'}
      indicatorStyle={[styles.indicatorStyle]}
      //   indicatorContainerStyle={styles.indicatorContainerStyle}
      scrollEnabled={true}
      renderLabel={renderLabel}
      // tabStyle={{ width: width / 2 }}
    />
  );
};

export const Job = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Overview' },
    { key: 'second', title: 'Experience' },
    { key: 'third', title: 'Education & Skills' },
    { key: 'fourth', title: 'History' },
  ]);

  return (
    <View flex={1} backgroundColor={'white'}>
      <PressableScale onPress={() => navigation.navigate('CandidateProfile')}>
        <Header />
      </PressableScale>
      <View flex={1} paddingTop={'small'}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          swipeEnabled={true}
        />
      </View>
    </View>
  );
};

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
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    height: 45,
  },
  indicatorStyle: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#01C96C',
    // marginHorizontal: 15,
  },
});
