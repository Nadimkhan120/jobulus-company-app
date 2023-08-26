import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

type ApplicantListProps = {
  title: string;
  detail: string;
  address: string;
  status: string;
  time: string;
  color: string;
};
const ApplicantList = ({
  title,
  detail,
  address,
  status,
  time,
  color,
}: ApplicantListProps) => {
  return (
    <View
      flexDirection={'row'}
      backgroundColor={'white'}
      justifyContent={'space-around'}
      paddingHorizontal={'small'}
      //   margin={"small"}
      margin={'tiny'}
    >
      <View flexDirection={'column'}>
        <Image source={icons.avatar} style={style.avatarImage} />
      </View>
      <View flexDirection={'column'} marginRight={'2xl'}>
        <Text variant={'semiBold14'} fontWeight={'600'}>
          {/* Jhon Wick */}
          {title}
        </Text>
        <Text variant={'regular13'} fontWeight={'400'} color={'grey100'}>
          {/* User Experience Designer at Conrad labs */}
          {detail}
        </Text>
        <Text variant={'regular12'} fontWeight={'400'} color={'black'}>
          {address}
        </Text>
        <View flexDirection={'row'}>
          <View flexDirection={'column'}>
            <Text
              variant={'regular12'}
              fontWeight={'700'}
              style={{ color: color }}
            >
              {status}
            </Text>
          </View>
          <View flexDirection={'column'}>
            <Text variant={'regular12'} fontWeight={'400'} color={'grey200'}>
              {time}
            </Text>
          </View>
        </View>
      </View>
      <View flexDirection={'column'}>
        <Image source={icons.dot} style={style.dot} resizeMode="contain" />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  avatarImage: {
    width: 50,
    height: 50,
  },
  dot: {
    width: 20,
    height: 20,
    tintColor: '#95969D',
  },
});
export default ApplicantList;
