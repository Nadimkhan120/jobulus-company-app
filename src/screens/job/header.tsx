import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';
const Header = () => {
  return (
    <SafeAreaView>
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
        <Text variant={'medium13'}>CEO at Walls.io, Founder at Swat.io</Text>
        <Text variant={'medium13'}>Lahore, Punjab, Pakistan</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    contentFit: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
