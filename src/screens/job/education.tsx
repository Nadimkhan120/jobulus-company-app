import React from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Screen, Text, View } from '@/ui';

import { educationData } from '../candidates/data';
import { educationItem } from './education-list';

const skills = [
  { name: 'Industry Knowldge' },
  { name: 'Interpersonal Skills' },
  { name: 'Language' },
];

const Education = () => {
  return (
    <Screen>
      <View paddingTop={'small'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />
        <FlatList
          data={educationData}
          renderItem={educationItem}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View marginTop={'small'}>
        <Text
          variant={'medium20'}
          color={'black'}
          paddingLeft={'small'}
          marginVertical={'small'}
          fontSize={22}
        >
          Skills
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={skills}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View
              backgroundColor={'transparent'}
              borderRadius={scale(22)}
              borderWidth={1}
              paddingVertical={'small'}
              paddingHorizontal={'medium'}
              marginHorizontal={'tiny'}
              alignSelf={'flex-start'}
              marginLeft={'medium'}
            >
              <Text variant={'regular12'}>{item.name}</Text>
            </View>
          )}
        />
        {/* <SkillsList /> */}
      </View>
    </Screen>
  );
};
export default Education;
