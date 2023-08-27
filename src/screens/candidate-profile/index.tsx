import React from 'react';
import { scale } from 'react-native-size-matters';

import { BoxButton } from '@/components/boxbutton';
import { MessageBox } from '@/components/iconbox';
import { Text, View } from '@/ui';

import Header from '../job/header';
import Tags from './tags';
const CandidateProfile = () => {
  return (
    <View>
      <View
        backgroundColor={'white'}
        marginHorizontal={'3xl'}
        width={scale(300)}
        height={scale(600)}
        marginVertical={'4xl'}
        borderRadius={20}
      >
        <Header />
        <Tags />
        <View
          width={'auto'}
          backgroundColor={'grey400'}
          height={scale(1)}
          position={'relative'}
          bottom={scale(160)}
        />
        <View position={'relative'} bottom={scale(130)}>
          <Text variant={'medium14'} textAlign={'center'}>
            I live and breathe SaaS! 💕I'm a two-times founder & bootstrapper in
            SaaS / marketing technology / social media marketing. Angel investor
            😇 connecting and sharing knowledge & war stories with fellow
            entrepreneurs (SaaS & beyond) worldwide. 🌍
          </Text>
        </View>
        <View
          justifyContent={'space-evenly'}
          alignItems={'center'}
          marginBottom={'large'}
          flexDirection={'row'}
        >
          <BoxButton label="Schedule Interview" onPress={() => null} />
          <MessageBox icon="message" onPress={() => null} />
        </View>
      </View>
    </View>
  );
};

export default CandidateProfile;
