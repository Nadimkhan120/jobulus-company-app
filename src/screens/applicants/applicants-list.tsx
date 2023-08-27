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
      margin={'tiny'}
    >
      <View>
        <Image source={icons.avatar} style={style.avatarImage} />
      </View>
      <View>
        <Text variant={'semiBold14'}>{title}</Text>
        <Text variant={'regular13'} color={'grey100'}>
          {detail}
        </Text>
        <Text variant={'regular12'} color={'black'}>
          {address}
        </Text>
        <View flexDirection={'row'}>
          <View>
            <Text variant={'regular12'} style={{ color: color }}>
              {status}
            </Text>
          </View>
          <View>
            <Text variant={'regular12'} color={'grey200'}>
              {time}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Image source={icons.dot} style={style.dot} contentFit="contain" />
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
