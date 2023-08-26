import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

import VerticalBarChart from './bar-chart';
const VacanciesStatus = () => {
  return (
    <View
      flexDirection={'column'}
      marginTop={'large'}
      backgroundColor={'white'}
      height={scale(310)}
    >
      <View
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingHorizontal={'medium'}
        paddingTop={'small'}
      >
        <View flexDirection={'column'}>
          <Text variant={'regular16'} fontWeight={'400'}>
            Vacancy Status
          </Text>
        </View>
        <View flexDirection={'column'} marginLeft={'4xl'} paddingLeft={'4xl'}>
          <View flexDirection={'row'}>
            <View flexDirection={'column'} marginRight={'large'}>
              <Text>This Week</Text>
            </View>
            <View flexDirection={'column'}>
              <Image source={icons.calendar} style={style.calendarImage} />
            </View>
          </View>
        </View>
      </View>
      <View
        flexDirection={'row'}
        justifyContent={'space-around'}
        marginTop={'medium'}
      >
        <View
          flexDirection={'column'}
          width={scale(150)}
          height={scale(70)}
          borderRadius={scale(8)}
          justifyContent={'center'}
          paddingHorizontal={'medium'}
          style={style.item}
        >
          <Text>Active Job Seekers</Text>
          <Text variant={'medium24'} marginTop={'small'}>
            13.5%
          </Text>
        </View>
        <View
          flexDirection={'column'}
          width={scale(150)}
          height={scale(70)}
          borderRadius={scale(8)}
          justifyContent={'center'}
          paddingHorizontal={'medium'}
          style={style.item}
        >
          <Text>Applied</Text>
          <Text marginTop={'small'} variant={'medium24'}>
            320
          </Text>
        </View>
      </View>
      <View flexDirection={'row'} marginTop={'2xl'}>
        <VerticalBarChart />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  calendarImage: {
    width: 20,
    height: 20,
  },
  item: {
    backgroundColor: '#F2F2F3',
  },
});

export default VacanciesStatus;
