import React from 'react';
import { FlatList } from 'react-native';

import { VacanciesData } from '@/constants/vacancies-data';
import { Screen, View } from '@/ui';

import Header from './header';
import OptionsHeader from './option-header';
import VecanciesList from './vacancies-list';

export const Vacancies = () => {
  const renderItem = ({ item }: any) => (
    <View>
      <VecanciesList
        title={item.title}
        company={item.company}
        address={item.address}
        work={item.work}
        applicant={item.applicant}
        status={item.status}
        postedTime={item.postedTime}
        expiryDate={item.expiryDate}
        color={item.color}
      />
    </View>
  );

  return (
    <Screen>
      <Header />
      <OptionsHeader />
      <FlatList
        data={VacanciesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </Screen>
  );
};
