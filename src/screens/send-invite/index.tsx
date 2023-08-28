import { zodResolver } from '@hookform/resolvers/zod';
//import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import { SelectOptionButton } from '@/components/select-option-button';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';

const labels = ['Registration', 'Information', 'Invite'];

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type CompanyInformationFormType2 = z.infer<typeof schema>;

export const SendInvite = () => {
  const { colors } = useTheme<Theme>();
  //const { navigate } = useNavigation();

  const { handleSubmit, control } = useForm<CompanyInformationFormType2>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: CompanyInformationFormType2) => {
    console.log('data', data);

    //navigate("SendInvite");
  };

  return (
    <Screen backgroundColor={colors.white} edges={['top', 'bottom']}>
      <ScreenHeader />

      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={3} currentPosition={2} labels={labels} />
      </View>

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(12)} />

        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Invite Colleague
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Complete your profile by adding further information
          </Text>
        </View>

        <View paddingTop={'large'} flexDirection={'row'}>
          <View flex={0.7} marginRight={'medium'}>
            <ControlledInput
              placeholder="Enter email"
              label="Email"
              control={control}
              name="email"
            />
          </View>

          <View flex={0.3}>
            <SelectOptionButton
              label="Role"
              isSelected={false}
              selectedText={'hello'}
              icon="arrow-ios-down"
              onPress={() => null}
            />
          </View>
        </View>

        <View flex={1} justifyContent={'flex-end'} paddingBottom={'large'}>
          <View
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <View width={scale(100)}>
              <Button
                backgroundColor={'black'}
                label="Finish"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View width={scale(100)}>
              <Button
                label="Skip"
                onPress={handleSubmit(onSubmit)}
                backgroundColor={'grey300'}
              />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};
