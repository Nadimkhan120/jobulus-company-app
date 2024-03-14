import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BootSplash from "react-native-bootsplash";
import { useAppFonts } from "@/hooks";
import { NavigationContainer, Root } from "@/navigation";
import { APIProvider } from "@/services/api/api-provider";
import { getToken } from "@/storage";
import { login } from "@/store/auth";
import { theme } from "@/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shopify/restyle";
import { StripeProvider } from "@stripe/stripe-react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '1056415638644-vu2fbrmnkgcmki8toton39h2pqfj23jd.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const App = () => {
  const appFontsLoaded = useAppFonts();

  const appInit = async () => {
    let token = getToken();

    if (token) {
      login(token);
    }
  };

  useEffect(() => {
    appInit().finally(async () => {
      if (appFontsLoaded) {
        await BootSplash.hide({ fade: true });
      }
    });
  }, [appFontsLoaded]);

  if (!appFontsLoaded) return;

  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <NavigationContainer>
            <APIProvider>
              <BottomSheetModalProvider>
                <StripeProvider
                  publishableKey={
                    "pk_test_51OLJsBLNk4NTWnZrnYmBAM0WTJ9T3RHOKWY2eXQJ6BZ31BKf9gJm36R2aYhDrE5ZR0i9hY2sbOKxEwmJNIXKl3Q400qGJegeQP"
                  }
                >
                  <Root />
                </StripeProvider>
                <Toast position='top' />
                <FlashMessage position="bottom" />
              </BottomSheetModalProvider>
            </APIProvider>
          </NavigationContainer>
        </ActionSheetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
