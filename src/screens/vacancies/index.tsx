import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { ScrollMenu } from '@/components/scroll-menu';
import { SearchWithFilter } from '@/components/search-with-filter';
import { VacanciesData } from '@/constants/vacancies-data';
import type { Theme } from '@/theme';
import { Screen, View } from '@/ui';

import Header from './header';
import VecanciesList from './vacancies-list';

const data = ['All', 'Drafts', 'Closed', 'Published', 'Expiring'];

const renderItem = ({ item }: any) => <VecanciesList data={item} />;

export const Vacancies = () => {
  const { colors } = useTheme<Theme>();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <Screen edges={['top']} backgroundColor={colors.white}>
      <Header />

      <SearchWithFilter onFilter={() => {}} />

      <ScrollMenu
        selectedIndex={selectedIndex}
        data={data}
        onChangeMenu={(index) => {
          setSelectedIndex(index);
        }}
      />

      <View height={scale(10)} backgroundColor={'grey500'} />

      <View flex={1} backgroundColor={'grey500'}>
        <FlatList
          data={VacanciesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Screen>
  );
};
