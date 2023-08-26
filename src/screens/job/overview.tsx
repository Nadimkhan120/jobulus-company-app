import { Image } from 'expo-image';
import React from 'react';
import {} from 'react-native';
import { scale } from 'react-native-size-matters';

import { Button, Text, View } from '@/ui';

const OverView = () => {
  return (
    <View padding={'3xl'}>
      <Text variant={'heading'} color={'black'}>
        About
      </Text>
      <Text variant={'medium14'} color={'black'} marginVertical={'large'}>
        I live and breathe SaaS! 💕I'm a two-times founder & bootstrapper in
        SaaS / marketing technology / social media marketing. Angel investor 😇
        connecting and sharing knowledge & war stories with fellow entrepreneurs
        (SaaS & beyond) worldwide. 🌍
      </Text>
      <View top={170} flexDirection={'row'}>
        <View width={scale(250)} marginRight={'small'}>
          <Button
            onPress={() => null}
            variant="primary" // Set the variant to "outlined"
            // backgroundColor="transparent" // Set the inner background to transparent
            borderColor="primary"
            borderWidth={1}
            label="Schedule InterView"
          />
        </View>
        <Image
          source={require('src/assets/images/button.png')}
          style={{ width: scale(50), height: scale(45) }}
        />
      </View>
    </View>
  );
};

export default OverView;
