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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";

GoogleSignin.configure({
  // webClientId:
  //   "1056415638644-k402ue7fdihbgui3sdnace1dsh3g877m.apps.googleusercontent.com", //"225407803373-k7hufmcv49tl3577eb8r6hk9oh294fu0.apps.googleusercontent.com",
  // offlineAccess: false,
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
                  publishableKey="pk_test_51OrztbFDn735berjksvaQ6oyIDDuneWRJGewGHQauD1nsvXUyVqn2p3VjoMHBCwZOb5m6Gi9RrXZ71cXpN4nJJpV00lutFhZJR"
                  // publishableKey={
                  //   "pk_test_51OLJsBLNk4NTWnZrnYmBAM0WTJ9T3RHOKWY2eXQJ6BZ31BKf9gJm36R2aYhDrE5ZR0i9hY2sbOKxEwmJNIXKl3Q400qGJegeQP"
                  // }
                >
                  <Root />
                </StripeProvider>
                <Toast position="top" />
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
