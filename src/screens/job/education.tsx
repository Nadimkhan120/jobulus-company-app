import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { icons } from '@/assets/icons';
import { Screen, Text, View } from '@/ui';

import SkillsList from './skill-list';

const Education = () => {
  const data = [
    {
      name: 'Mansoura University',
      location: 'Bachelor degree, in Computer Science',
      time: 'April 2003 - Present',
      profileImage: icons.indesign,
    },
  ];

  const renderItem = ({ item }) => (
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
  );
  return (
    <Screen>
      <View paddingTop={'small'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View>
        <Text
          variant={'heading'}
          color={'black'}
          padding={'medium'}
          fontSize={22}
        >
          Skills
        </Text>
        <SkillsList />
      </View>
    </Screen>
  );
};
export default Education;
const candidateStyles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
