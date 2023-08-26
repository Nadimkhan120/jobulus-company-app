import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { icons } from '@/assets/icons';
import { Screen, Text, View } from '@/ui';

const History = () => {
  const data = [
    {
      property: 'For UI/UXDesigner',
      date: '26 Aug',
      time: '4:20 PM',
      status: 'Applied',
      hasCV: true,
    },
    {
      property: 'By Liam Smith',
      date: '26 Aug',
      time: '4:20 PM',
      status: 'Shortlisted',
    },
    {
      property: 'Scheduled By Liam Smith',
      date: '26 Aug',
      time: '4:20 PM',
      status: 'Interview',
      day: '20 June 2023',
    },
  ];

  const renderItem = ({ item }) => (
    <View
      backgroundColor="white"
      padding={'medium'}
      width={'100%'}
      flexDirection={'row'}
    >
      <View>
        <Text variant={'medium16'}>{item.date}</Text>
        <Text>{item.time}</Text>
      </View>
      <View
        width={0.5}
        backgroundColor={'grey400'}
        marginHorizontal={'small'}
      />
      <View marginLeft={'medium'}>
        <Text variant={'heading'} color={'grey100'}>
          {item.status}
        </Text>
        <Text variant="medium13" marginLeft={'tiny'} color={'black'}>
          {item.property}
        </Text>
        {item.hasCV && ( // Display the CV and cover letter icons if item.hasCV is true
          <View style={styles.iconContainer}>
            <View
              flexDirection={'row'}
              backgroundColor={'grey400'}
              width={80}
              height={40}
              borderRadius={20}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image source={icons.cv} style={styles.icon} />
              <Text variant={'medium16'}>CV</Text>
            </View>
            <View
              flexDirection={'row'}
              backgroundColor={'grey400'}
              width={165}
              height={40}
              borderRadius={20}
              justifyContent={'center'}
              alignItems={'center'}
              marginHorizontal={'large'}
            >
              <Image source={icons.cover} style={styles.icon} />
              <Text variant={'medium16'} paddingHorizontal={'small'}>
                Cover Letter
              </Text>
            </View>
          </View>
        )}
        <Text variant="medium12" marginLeft={'tiny'}>
          {item.day}
        </Text>
      </View>
    </View>
  );

  return (
    <Screen>
      <View paddingTop={'medium'} backgroundColor={'grey400'}>
        <View backgroundColor={'white'} width={'auto'} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Screen>
  );
};

export default History;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  separator: {
    width: 0.5, // Adjust the width of the separator
    backgroundColor: 'grey', // Color of the separator
    marginHorizontal: 10, // Adjust the horizontal spacing between sections
    height: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Adjust the margin as needed
  },
  icon: {
    width: 25, // Adjust the icon size as needed
    height: 25,
  },
});
