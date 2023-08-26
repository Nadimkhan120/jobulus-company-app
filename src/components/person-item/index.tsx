import React from 'react';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

import { Avatar } from '../avatar';

export const PersonItem = () => {
  return (
    <View flexDirection={'row'} marginBottom={'large'}>
      <View>
        <Avatar source={icons.google} />
      </View>
      <View flex={1} paddingHorizontal={'medium'}>
        <Text variant={'semiBold14'} color={'black'}>
          PersonItem
        </Text>
        <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
          <Text variant={'regular13'} color={'grey300'}>
            Applied For:{' '}
          </Text>
          <Text variant={'regular13'} color={'grey100'}>
            Product Designer
          </Text>
        </View>

        <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
          <Text variant={'regular13'} color={'grey300'}>
            Applied on:{' '}
          </Text>
          <Text variant={'regular13'} color={'grey100'}>
            15 Jan 2023
          </Text>
        </View>
        <View
          flexDirection={'row'}
          gap={'medium'}
          alignItems={'center'}
          paddingTop={'small'}
        >
          {['cv', 'cover letter'].map((item, index) => {
            return (
              <View
                backgroundColor={'grey500'}
                key={index}
                borderRadius={scale(16)}
                height={scale(31)}
                paddingHorizontal={'medium'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text variant={'regular13'} color={'grey100'}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <Text>...</Text>
      </View>
    </View>
  );
};
