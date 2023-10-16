import React from "react";
import {} from "react-native";
import { scale } from "react-native-size-matters";

import { ImageButton } from "@/components/image-button";
import { openDrawer } from "@/store/app";
import { View } from "@/ui";

import { CompanyButton } from "../company-button";
import { SearchField } from "../search-field";

export const TopHeader = () => {
  return (
    <View
      height={scale(72)}
      flexDirection={"row"}
      backgroundColor={"primary"}
      alignItems={"center"}
      justifyContent={"center"}
      paddingHorizontal={"large"}
    >
      <View flexDirection={"row"} alignItems={"center"}>
        <CompanyButton
          icon="company"
          size={scale(40)}
          imageSize={scale(40)}
          backgroundColor={"error"}
          onPress={openDrawer}
        />
        <View flex={1} marginHorizontal={"medium"}>
          <SearchField placeholder="Start search here" />
        </View>

        <ImageButton
          icon="message-icon"
          size={scale(40)}
          backgroundColor={"black"}
          onPress={() => null}
        />
        <View width={scale(10)} />
        <ImageButton
          icon="bell"
          size={scale(40)}
          backgroundColor={"black"}
          onPress={() => null}
        />
      </View>
    </View>
  );
};
