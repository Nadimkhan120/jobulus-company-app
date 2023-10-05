import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFooter, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import ActivityIndicator from '@/components/activity-indicator';
import { BottomModal } from '@/components/bottom-modal';
import SelectionBox from '@/components/drop-down';
import { SearchWithFilter } from '@/components/search-with-filter';
import { useCandidates } from '@/services/api/candidate';
import { useUser } from '@/store/user';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

import PersonItem from './candidate-item';

export const Candidates = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const company = useUser((state) => state?.company);

  const { data, isLoading } = useCandidates({
    variables: {
      id: company?.id,
      statusId: 1,
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['85%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index', index);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PersonItem
        data={item}
        onPress={() => navigate('Job', { id: item?.unique_id })}
        onOptionPress={handlePresentModalPress}
      />
    );
  };

  // render footer
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <View
          paddingVertical={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            marginHorizontal={'large'}
            label="Show Results"
            onPress={handleDismissModalPress}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
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

      <SearchWithFilter
        onFilter={handlePresentModalPress}
        onSwap={() => navigate('CandidateProfile')}
      />

      {isLoading ? (
        <View
          flex={1}
          height={scale(300)}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View flex={1} backgroundColor={'white'} paddingTop={'large'}>
          <FlashList
            data={data?.response?.data?.data}
            renderItem={renderItem}
            estimatedItemSize={150}
            ListEmptyComponent={
              <View
                height={scale(300)}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>No Cadidates Found</Text>
              </View>
            }
          />
        </View>
      )}

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'rgb(250,250,253)' }}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View alignSelf={'center'} paddingVertical={'large'}>
            <Text variant={'medium17'} color={'black'}>
              Set Filters
            </Text>
          </View>

          <SelectionBox label="Industry" placeholder="Select industry" />
          <SelectionBox label="Categories" placeholder="Select categories" />
          <SelectionBox
            label="Applied on last job"
            placeholder="Select last job"
          />
          <SelectionBox label="Last job status" placeholder="Select status" />
        </BottomSheetView>
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
