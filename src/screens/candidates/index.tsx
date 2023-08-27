import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';

import { Screen, View } from '@/ui';

import { CandidateItem } from './candidate-item';
import { data } from './data';
export const Candidates = () => {
  const navigation = useNavigation();

  const handleItemPress = (item: any) => {
    navigation.navigate('Job');
    console.log(`Pressed on ${item.name}`);
  };

  return (
    <Screen>
      <View paddingTop={'medium'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <CandidateItem item={item} onPress={handleItemPress} />
          )}
        />
      </View>
    </Screen>
  );
};
