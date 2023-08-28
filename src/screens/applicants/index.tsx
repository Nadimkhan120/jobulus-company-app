import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { ScreenHeader } from '@/components/screen-header';
import { ScrollMenu } from '@/components/scroll-menu';
import { SearchWithFilter } from '@/components/search-with-filter';
import { data } from '@/constants/applicant-list';
import type { Theme } from '@/theme';
import { Screen, View } from '@/ui';

import ApplicantList from './applicants-list';

const menu = ['All', 'Recent', 'Step1', 'Step2', 'Hired'];

const Applicants = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const renderItem = ({ item }: any) => (
    <ApplicantList
      onPress={() => navigate('Job')}
      showStatus={true}
      data={item}
    />
  );

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="Applicants" showBorder={true} />
      <SearchWithFilter onFilter={() => {}} />

      <ScrollMenu
        selectedIndex={selectedIndex}
        data={menu}
        onChangeMenu={(index) => {
          setSelectedIndex(index);
        }}
      />

      <View height={scale(10)} backgroundColor={'grey500'} />
      <View flex={1} backgroundColor={'grey500'}>
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
