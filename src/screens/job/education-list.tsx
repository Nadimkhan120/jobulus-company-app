import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';
export const educationItem = ({ item }) => (
  <View
    backgroundColor="white"
    marginTop={'tiny'}
    padding={'medium'}
    flexDirection={'row'}
  >
    <Image source={item.profileImage} style={candidateStyles.image} />
    <View marginLeft={'medium'} marginTop={'2xl'}>
      <Text variant="medium20" color="black">
        {item.name}
      </Text>
      <Text variant="medium12" marginLeft={'tiny'}>
        {item.location}
      </Text>
      <Text variant="medium12" marginLeft={'tiny'}>
        {item.time}
      </Text>
      <View maxWidth={300}>
        <Text
          variant="medium13"
          color={'grey100'}
          textAlign={'justify'}
          marginVertical={'tiny'}
        >
          {item.point1}
        </Text>
        <Text variant="medium13" color={'grey100'} textAlign={'justify'}>
          {item.point2}
        </Text>
      </View>
    </View>
  </View>
);
const candidateStyles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginTop: 30,
  },
});
