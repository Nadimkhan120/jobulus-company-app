import * as React from 'react';
import {} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import { icons } from '@/assets/icons';
import { closeDrawer, openDrawer, useApp } from '@/store/app';
import { PressableScale, Screen, Text, View } from '@/ui';

import { Avatar } from '../avatar';
import { CompanyButton } from '../company-button';

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

              {[0, 1].map((item, index) => {
                return (
                  <PressableScale key={index}>
                    <View
                      flexDirection={'row'}
                      alignItems={'center'}
                      paddingHorizontal={'xLarge'}
                    >
                      <View
                        flex={1}
                        flexDirection={'row'}
                        alignItems={'center'}
                      >
                        <CompanyButton icon="finance" onPress={() => null} />
                        <Text>{item}</Text>
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
