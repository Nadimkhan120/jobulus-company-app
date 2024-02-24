import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import ActivityIndicator from "@/components/activity-indicator";
import { AddButton } from "@/components/add-button";
import { BottomModal } from "@/components/bottom-modal";
import { ScreenHeader } from "@/components/screen-header";
import { ScrollMenu } from "@/components/scroll-menu";
import { SearchField } from "@/components/search-field";
import { SelectModalItem } from "@/components/select-modal-item";
import { useGetRoles, useDeleteRole } from "@/services/api/roles";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Screen, Text, View } from "@/ui";
import { queryClient } from "@/services/api/api-provider";
import { RoleItem } from "./role-item";
import { showErrorMessage, showSuccessMessage } from "@/utils";

const data2 = [
  {
    icon: "pencl",
    title: "Edit Role",
  },
  {
    icon: "delete",
    title: "Delete Role",
  },
];

export const Roles = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  const snapPoints2 = useMemo(() => ["25%"], []);
  const [selectedRole, setSelectedRole] = useState(null)

  const company = useUser((state) => state?.company);

  const { mutate: deleteRoleApi } = useDeleteRole();

  const { data, isLoading, refetch } = useGetRoles({
    variables: {
      id: company?.id,
    },
  });

  const listData = useMemo(() => {
    let dataToRender = [];
    if (data && !isLoading) {
      if (selectedIndex === 0) {
        dataToRender = [...data?.default, ...data?.company_roles];
      }

      if (selectedIndex === 1) {
        dataToRender = [...data?.default];
      }
      if (selectedIndex === 2) {
        dataToRender = [...data?.company_roles];
      }
    }

    return dataToRender;
  }, [data, selectedIndex, setSelectedIndex]);

  // show bottom modal
  const handlePresentOptionsModalPress = useCallback((item) => {
    
    // Save or use the item data here
    setSelectedRole(item)
    bottomSheetOptionsModalRef.current?.present();
  }, []);

  const handleNavigateToAddRole = () => {
    
    navigate("AddRole", {isUpdate: true, data : selectedRole})
    handleDismissOptionsModalPress();
  }


  // dismiss bottom modal
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef.current?.dismiss();
  }, []);


// delete Role
  const handleDeleteRole = () => {
    deleteRoleApi({
      role_id: selectedRole?.id,
    },
    {
      onSuccess: (responseData) => {
        if (responseData?.status === 200) {
          showSuccessMessage(responseData?.message);
          queryClient.invalidateQueries(useGetRoles.getKey());
           handleDismissOptionsModalPress()

          // goBack();
          // resetData();
        } else {
          showErrorMessage(responseData?.message);
        }
      },
      onError: (error) => {
        //@ts-ignore
        showErrorMessage(error?.response?.data?.message);
      },
    }
    );
   
  };

  const renderOptionItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={() => item.title === "Delete Role" ? handleDeleteRole(): handleNavigateToAddRole()} // Pass item to handleNavigateToAddProcess

        // onPress={(data) => {
        //   handleDismissOptionsModalPress();
        // }}
      />
    );
  }, [selectedRole]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <RoleItem
        onPress={() => null}
        showStatus={true}
        data={item}
        onOptionPress={() => handlePresentOptionsModalPress(item)} // Pass item data here
        />
    );
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader
        title="Roles"
        showBorder={true}
        rightElement={<AddButton label="Role" onPress={() => navigate("AddRole")} />}
      />
      <View
        backgroundColor={"grey500"}
        paddingVertical={"large"}
        // flexDirection={"row"}
        // alignItems={"center"}
        paddingHorizontal={"large"}
        columnGap={"medium"}
        paddingBottom={"medium"}
        width={"100%"}
      >
        <SearchField placeholder="Search by name" showBorder={true} />
      </View>

      <ScrollMenu
        selectedIndex={selectedIndex}
        data={[
          { name: "All", id: 0 },
          { name: "Default", id: 1 },
          { name: "Custom", id: 2 },
        ]}
        onChangeMenu={(index) => {
          setSelectedIndex(index?.id);
        }}
      />
      <View height={scale(10)} backgroundColor={"grey500"} />
      {isLoading ? (
        <View
          flex={1}
          height={scale(300)}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View flex={1} backgroundColor={"grey500"}>
          <FlashList
            //@ts-ignore
            data={listData}
            renderItem={renderItem}
            estimatedItemSize={150}
            ListEmptyComponent={
              <View height={scale(300)} justifyContent={"center"} alignItems={"center"}>
                <Text>No Roles Found</Text>
              </View>
            }
          />
        </View>
      )}

      <BottomModal
        ref={bottomSheetOptionsModalRef}
        index={0}
        snapPoints={snapPoints2}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOptionItem}
        />
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
