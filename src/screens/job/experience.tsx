import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { icons } from '@/assets/icons';
import { Screen, Text, View } from '@/ui';

const Experience = () => {
  const data = [
    {
      name: 'Jr. Front-End Designer',
      location: 'Kickstarter, in Manchester',
      time: 'April 2003 - Present',
      profileImage: icons.indesign,
      point1:
        '- Understand and provide practical solutions based on customer needs.',
      point2:
        '- Take full ownership of the design lifecycle and provide support during implementation. See more',
    },
    {
      name: 'Web Developer',
      location: 'Amazon, in New York',
      time: 'April 2003 - Present',
      profileImage: icons.council,
      point1:
        '- Understand and provide practical solutions based on customer needs.',
      point2:
        '- Take full ownership of the design lifecycle and provide support during implementation. See more',
    },
  ];

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
    <Screen>
      <View paddingTop={'medium'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Screen>
  );
};
export default Experience;
const candidateStyles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
