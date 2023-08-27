import React from 'react';
import { scale } from 'react-native-size-matters';

import { BoxButton } from '@/components/boxbutton';
import { IconBox } from '@/components/iconbox';
import { Text, View } from '@/ui';

const OverView = () => {
  return (
    <View paddingHorizontal={'large'} paddingTop={'medium'}>
      <Text variant={'heading'} color={'black'}>
        About
      </Text>
      <Text variant={'regular14'} color={'grey200'} marginVertical={'large'}>
        I live and breathe SaaS! 💕I'm a two-times founder & bootstrapper in
        SaaS / marketing technology / social media marketing. Angel investor 😇
        connecting and sharing knowledge & war stories with fellow entrepreneurs
        (SaaS & beyond) worldwide. 🌍
      </Text>
      <View
        position={'relative'}
        top={scale(190)}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
      >
        <BoxButton label="Schedule Interview" onPress={() => null} />
        <IconBox icon="message" onPress={() => null} />
      </View>
    </View>
  );
};

export default OverView;
