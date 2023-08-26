import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { icons } from '@/assets/icons';
import { Screen, Text, View } from '@/ui';

export const Candidates = () => {
  const navigation = useNavigation();
  const data = [
    {
      name: 'John Wick',
      title: 'User Experience Designer at Conrad Labs',
      location: 'Rawalpindi, Pakistan',
      profileImage: icons.avatar,
    },
    {
      name: 'Jane Doe',
      title: 'User Experience Designer at Conrad Labs',
      location: 'Mountain View, CA',
      profileImage: icons.avatar,
    },
    {
      name: 'Peter Parker',
      title: 'User Experience Designer at Conrad Labs',
      location: 'Menlo Park, CA',
      profileImage: icons.avatar,
    },
    {
      name: 'Tony Stark',
      title: 'User Experience Designer at Conrad Labs',
      location: 'New York City',
      profileImage: icons.avatar,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View
        backgroundColor="white"
        marginTop={'tiny'}
        padding="medium"
        width={'100%'}
        flexDirection={'row'}
      >
        <View
          backgroundColor={'grey400'}
          alignSelf={'center'}
          width={50}
          height={50}
          borderRadius={25}
        >
          <Image source={item.profileImage} style={candidateStyles.image} />
        </View>
        <View marginLeft={'medium'}>
          <Text variant="medium20" color="black">
            {item.name}
          </Text>
          <Text variant="medium13" color="black">
            {item.title}
          </Text>

          <Text variant="medium13" color="black">
            {item.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    navigation.navigate('Job');
    console.log(`Pressed on ${item.name}`);
  };

  return (
    <Screen>
      <View paddingTop={'medium'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'}>
          {/* 
    <Text variant={"semiBold20"} color={"black"} marginTop={"large"} >
        Candidates Search
      </Text> */}
        </View>

        <View height={65} width={'100%'} marginTop={'large'}>
          {/* Search bar */}
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Screen>
  );
};
const candidateStyles = StyleSheet.create({
  image: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    borderRadius: 20, // To make the image circular
    marginRight: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 5,
  },
});
