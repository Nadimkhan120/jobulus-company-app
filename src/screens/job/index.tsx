import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { icons } from '@/assets/icons';
import { translate } from '@/i18n';
import { Text, View } from '@/ui';

import Education from './education';
import Experience from './experience';
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
      <View>
        {/* Banner Image */}
        <Image
          source={require('src/assets/images/header.png')}
          style={styles.image}
          contentFit="contain"
        />

        {/* Circular Avatar */}
        <View
          position={'absolute'}
          bottom={-20}
          alignSelf={'center'}
          backgroundColor={'white'}
          width={40}
          height={40}
          borderRadius={25}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image source={icons.avatar} style={styles.profile} />
        </View>
      </View>
      <View
        justifyContent={'center'}
        alignItems={'center'}
        marginVertical={'4xl'}
      >
        <Text variant={'heading'} color={'black'}>
          Michael Kamleitner
        </Text>
        <Text variant={'medium13'} color={'black'}>
          CEO at Walls.io, Founder at Swat.io
        </Text>
        <Text variant={'medium12'} color={'black'}>
          Lahore, Punjab, Pakistan
        </Text>
      </View>
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
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 20, // To make the image circular
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
