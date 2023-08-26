import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { closeDrawer, openDrawer, useApp } from '@/store/app';
import { PressableScale, Screen, Text, View } from '@/ui';

import { Avatar } from '../avatar';
import { CompanyButton } from '../company-button';

const { width } = Dimensions.get('screen');

type AppDrawer = {
  children: React.ReactNode;
};

export function AppDrawer({ children }: AppDrawer) {
  const drawerStatus = useApp((state) => state.drawerStatus);

  return (
    <Drawer
      open={drawerStatus}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerStyle={{ width: width * 0.8 }}
      renderDrawerContent={() => {
        return (
          <Screen>
            <View flex={1}>
              <View
                paddingHorizontal={'large'}
                flexDirection={'row'}
                paddingTop={'medium'}
                alignItems={'center'}
              >
                <Avatar source={icons.logo} size="medium" />
                <View>
                  <Text
                    variant={'medium16'}
                    paddingLeft={'medium'}
                    color={'black'}
                  >
                    Rifat Sarkar 👋
                  </Text>
                  <Text
                    variant={'regular14'}
                    paddingLeft={'medium'}
                    paddingTop={'tiny'}
                    color={'grey200'}
                  >
                    View profile
                  </Text>
                </View>
              </View>

              <View
                backgroundColor={'grey500'}
                paddingVertical={'small'}
                paddingHorizontal={'large'}
                marginTop={'medium'}
              >
                <Text variant={'regular13'} color={'grey100'}>
                  Your Companies
                </Text>
              </View>

              {['vFairs', 'Hr Executive'].map((item, index) => {
                return (
                  <PressableScale key={index}>
                    <View
                      flexDirection={'row'}
                      alignItems={'center'}
                      paddingHorizontal={'large'}
                      //backgroundColor={"info"}
                      paddingVertical={'small'}
                      borderBottomColor={'grey500'}
                      borderBottomWidth={StyleSheet.hairlineWidth * 2}
                    >
                      <View
                        flex={1}
                        flexDirection={'row'}
                        alignItems={'center'}
                      >
                        <CompanyButton
                          backgroundColor={'black'}
                          icon="finance"
                          onPress={() => null}
                          size={scale(48)}
                          imageSize={scale(48)}
                        />
                        <View paddingLeft={'small'}>
                          <Text variant={'semiBold14'} color={'black'}>
                            {item}
                          </Text>
                          <Text
                            variant={'regular12'}
                            paddingTop={'tiny'}
                            color={'black'}
                          >
                            {item}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text>arrow</Text>
                      </View>
                    </View>
                  </PressableScale>
                );
              })}
            </View>
          </Screen>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
