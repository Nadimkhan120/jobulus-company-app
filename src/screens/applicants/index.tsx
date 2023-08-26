import React from 'react';
import { FlatList } from 'react-native';

import { data } from '@/constants/applicant-list';
import { Screen, View } from '@/ui';

import ApplicantList from './applicants-list';
const Applicants = () => {
  const renderItem = ({ item }: any) => (
    <View>
      <ApplicantList
        title={item.title}
        detail={item.detail}
        address={item.address}
        status={item.status}
        time={item.time}
        color={item.color}
      />
    </View>
  );
  return (
    <Screen>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Screen>
  );
};

export default Applicants;
