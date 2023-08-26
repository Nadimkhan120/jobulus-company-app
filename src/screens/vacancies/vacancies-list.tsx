import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';
type VecanciesListProps = {
  title: string;
  company: string;
  address: string;
  work: string;
  applicant: string;
  status: string;
  postedTime: string;
  expiryDate: string;
  color: string;
};
const VecanciesList = ({
  title,
  company,
  address,
  work,
  applicant,
  status,
  postedTime,
  expiryDate,
  color,
}: VecanciesListProps) => {
  const goToJobDetail = () => {
    navigation.navigate('jobDetail'); // Use the correct function and screen name here
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={goToJobDetail}>
      <View
        flexDirection={'row'}
        backgroundColor={'white'}
        borderColor={'grey100'}
        paddingTop={'2xl'}
        padding={'small'}
        style={style.container}
      >
        <View flexDirection={'column'} justifyContent={'space-between'}>
          <View
            flexDirection={'row'}
            justifyContent={'space-between'}
            width={scale(300)}
          >
            <Text variant={'medium14'} fontWeight={'500'} style={style.title}>
              {title}
            </Text>
            <Image
              source={icons.dot}
              style={style.image}
              resizeMode="contain"
            />
          </View>
          <View flexDirection={'row'}>
            <Text variant={'medium12'} fontWeight={'500'}>
              {company}
            </Text>
            <Text variant={'regular12'} fontWeight={'400'}>
              . {address}
            </Text>
            <Text variant={'regular12'} fontWeight={'400'}>
              {work}
            </Text>
          </View>
          <View flexDirection={'row'}>
            <Text variant={'regular12'} fontWeight={'400'}>
              {applicant} Applicant
            </Text>
          </View>
          <View flexDirection={'row'}>
            <Text
              variant={'medium12'}
              fontWeight={'700'}
              style={{ color: color }}
            >
              {status} .
            </Text>
            <Text variant={'regular12'} fontWeight={'400'} color={'grey100'}>
              posted on{' '}
            </Text>
            <Text variant={'regular12'} fontWeight={'400'} color={'grey200'}>
              {postedTime}
            </Text>
            <Text variant={'regular12'} fontWeight={'400'}>
              Expiry on{' '}
            </Text>
            <Text variant={'regular12'} fontWeight={'400'}>
              {expiryDate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    height: scale(100),
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: scale(10),
    elevation: 3,
    justifyContent: 'center',
  },
  title: {
    color: '#16243F',
  },
  image: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
});
export default VecanciesList;
