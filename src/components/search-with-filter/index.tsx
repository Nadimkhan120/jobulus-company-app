import React from 'react';
import {} from 'react-native';

import { SearchField } from '@/components/search-field';
import { View } from '@/ui';

import { ImageButton } from '../image-button';

type SearchWithFilterProp = {
  onFilter: () => void;
  onSwap?: () => void;
};

export const SearchWithFilter = ({
  onFilter,
  onSwap,
}: SearchWithFilterProp) => {
  return (
    <View
      backgroundColor={'grey500'}
      paddingVertical={'large'}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'large'}
      columnGap={'medium'}
    >
      <View flex={1}>
        <SearchField placeholder="Search by name" showBorder={true} />
      </View>

      <ImageButton icon="filter" backgroundColor={'black'} onPress={onFilter} />
      {onSwap ? (
        <ImageButton icon="swap" backgroundColor={'black'} onPress={onFilter} />
      ) : null}
    </View>
  );
};
