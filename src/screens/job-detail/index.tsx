import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';

import { data } from '@/constants/applicant-list';
import { Text, View } from '@/ui';

import ApplicantList from '../applicants/applicants-list';
import Footer from './footer-chart';
import OverviewJob from './overview-job';
import VacanciesStatus from './vacancy-status';

const JobDetail = () => {
  const renderItem = ({ item }: any) => (
    <ApplicantList
      title={item.title}
      detail={item.detail}
      address={item.address}
      status={item.status}
      time={item.time}
      color={item.color}
    />
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <OverviewJob />
      <VacanciesStatus />
      <View
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingHorizontal={'large'}
        alignItems={'center'}
        height={scale(40)}
      >
        <Text>High Matches</Text>

        <View borderBottomWidth={1} borderColor={'primary'}>
          <Text color={'primary'}>View All</Text>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <Footer />
    </ScrollView>
  );
};

export default JobDetail;
