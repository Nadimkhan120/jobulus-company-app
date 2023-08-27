import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { BoxButton } from '@/components/boxbutton';
import { IconBox } from '@/components/iconbox';
import { View } from '@/ui';
const Footer = () => {
  const navigation = useNavigation();
  const handleViewApplicants = () => {
    navigation.navigate('Applicants'); // Navigate to the "Applicants" screen
  };
  return (
    <View>
      <View
        flexDirection={'row'}
        backgroundColor={'white'}
        width={scale(350)}
        height={scale(80)}
        borderColor={'grey100'}
        borderTopWidth={1}
        justifyContent={'space-around'}
        paddingTop={'medium'}
      >
        <View flexDirection={'column'}>
          <BoxButton label="View Applicant" onPress={handleViewApplicants} />
        </View>
        <View flexDirection={'column'}>
          <IconBox icon="dot" onPress={() => null} />
        </View>
      </View>
    </View>
  );
};

export default Footer;
