import { Image } from 'expo-image';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Text, View } from '@/ui';

import { experienceData } from '../candidates/data';

const Experience = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => null}>
      <View
        backgroundColor="white"
        marginTop={'tiny'}
        padding={'medium'}
        width={'100%'}
        flexDirection={'row'}
      >
        <Image source={item.profileImage} style={candidateStyles.image} />
        <View marginLeft={'medium'}>
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
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View paddingTop={'medium'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />
        <FlatList
          data={experienceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </ScrollView>
  );
};
export default Experience;
const candidateStyles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
