import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

import ZIndex from './z-index';
const OverviewJob = () => {
  return (
    <View
      flexDirection={'column'}
      backgroundColor={'white'}
      borderColor={'grey100'}
      paddingHorizontal={'large'}
      style={style.container}
    >
      <View
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingTop={'small'}
      >
        <View flexDirection={'column'}>
          <Text variant={'medium20'} fontWeight={'500'}>
            Jr. Front-End Designer
          </Text>
        </View>
        <View
          width={scale(30)}
          height={scale(30)}
          backgroundColor={'primary'}
          alignItems={'center'}
          borderRadius={30}
          justifyContent={'center'}
          flexDirection={'column'}
          // marginTop={"tiny"}
        >
          <Image source={icons.pencil} style={style.image} />
        </View>
        {/* <IconButton icon="pencil" color={"green"} /> */}
      </View>

      <View flexDirection={'row'}>
        <View flexDirection={'column'}>
          <Text variant={'medium12'} fontWeight={'500'} color={'grey100'}>
            Brandzmate
          </Text>
        </View>
        <View flexDirection={'column'}>
          <Text variant={'regular12'} fontWeight={'400'} color={'grey200'}>
            Lahore,punjab pakistan
          </Text>
        </View>
        <View flexDirection={'column'}>
          <Text variant={'regular12'} fontWeight={'400'} color={'grey200'}>
            (Remote)
          </Text>
        </View>
      </View>
      <View flexDirection={'row'}>
        <Text variant={'regular13'} fontWeight={'400'} color={'primary'}>
          5 new applications
        </Text>
      </View>
      <View flexDirection={'row'}>
        {/* <Text> ooo</Text> */}
        <ZIndex />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: scale(110),
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: scale(10),
    elevation: 3,
    justifyContent: 'space-around',
  },
  image: {
    width: 20,
    height: 20,
  },
});
export default OverviewJob;
