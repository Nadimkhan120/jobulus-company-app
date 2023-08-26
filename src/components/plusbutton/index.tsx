import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

const PlusButton = () => {
  return (
    <View
      flexDirection={'row'}
      width={scale(80)}
      height={scale(30)}
      backgroundColor={'primary'}
      borderRadius={10}
      alignItems={'center'}
      justifyContent={'space-around'}
      paddingHorizontal={'small'}
    >
      <View flexDirection={'column'}>
        <Image source={icons.pluss} style={style.image} />
      </View>
      <View flexDirection={'column'}>
        <Text variant={'medium12'} fontWeight={'500'} color={'white'}>
          Job
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  image: {
    width: 18,
    height: 18,
  },
});

export default PlusButton;
