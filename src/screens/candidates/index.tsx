import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { ScrollMenu } from '@/components/scroll-menu';
import { SearchWithFilter } from '@/components/search-with-filter';
import { data } from '@/constants/applicant-list';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

import ApplicantList from '../applicants/applicants-list';

const menu = ['All', 'Recent', 'Step1', 'Step2', 'Hired'];

export const Candidates = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const renderItem = ({ item }: any) => (
    <ApplicantList
      onPress={() => navigate('Job')}
      showStatus={false}
      data={item}
    />
  );

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <View
        height={scale(50)}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={'large'}
        borderBottomColor={'grey500'}
        borderBottomWidth={1}
      >
        <Text variant={'medium17'} color={'grey100'}>
          Candidate Search
        </Text>
      </View>

      <SearchWithFilter onFilter={() => {}} onSwap={() => null} />

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
