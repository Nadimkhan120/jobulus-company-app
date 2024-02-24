import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import ActivityIndicator from "@/components/activity-indicator";
import { AddButton } from "@/components/add-button";
import { BottomModal } from "@/components/bottom-modal";
import { ScreenHeader } from "@/components/screen-header";
import { SelectModalItem } from "@/components/select-modal-item";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Screen, Text, View } from "@/ui";
import { StepItem } from "./step-item";
import { useDeleteStep, useSteps } from "@/services/api/recruitment-process";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { showErrorMessage, showSuccessMessage } from "@/utils";

const data3 = [
  {
    icon: "pencl",
    title: "Edit Step",
  },
  {
    icon: "delete",
    title: "Delete Step",
  },
];

export const Steps = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const route = useRoute<any>();

  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ["25%"], []);
  
  const [selectedStep, setSelectedStep] = useState(null)

  const company = useUser((state) => state?.company);

  const { mutate : deleteStepApi } = useDeleteStep()

  const { data, isLoading, refetch } = useSteps({
    variables: {
      companyId: company?.id,
      processId: route?.params?.id,
    },
  });


  
  // show bottom modal
  const handlePresentOptionsModalPress = useCallback((item) => {
    bottomSheetOptionsModalRef?.current?.present();
    setSelectedStep(item);
  }, []);
  
  // dismiss bottom modal
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef?.current?.dismiss();
  }, []);

  const handleDeletePress = () => {
    deleteStepApi(
      {
        id: parseInt(selectedStep?.id)
      },
      {
        onSuccess: (responseData) => {
          if (responseData?.status === 200) {
            showSuccessMessage(responseData?.message);
            refetch()
            handleDismissOptionsModalPress()
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
  }

  const handleEditPress = () => {
    
    navigate("AddStep", {
      processId: route?.params?.id,
      stepsCount: data?.response?.data?.length -1,
      isUpdate : true, 
      data : selectedStep
    })
    handleDismissOptionsModalPress()
  } 

  const renderOptionItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={() => {
          item?.title =="Edit Step" ? handleEditPress(): handleDeletePress()
        }}
      />
    );
  }, [selectedStep]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <StepItem
        data={item}
        onPress={(data) => console.log("hello", data)}
        onOptionPress={() =>handlePresentOptionsModalPress(item)}
        // onOptionPress={(data) => {handlePresentOptionsModalPress(), setSelectedStep(data)}}
      />
    );
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader
        title="Steps"
        showBorder={true}
        rightElement={
          <AddButton
            label="Step"
            onPress={() =>
              navigate("AddStep", {
                processId: route?.params?.id,
                stepsCount: data?.response?.data?.length,
              })
            }
          />
        }
      />

      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View flex={1} backgroundColor={"white"}>
          <FlashList
            //@ts-ignore
            data={data?.response?.data}
            renderItem={renderItem}
            estimatedItemSize={150}
            ListEmptyComponent={
              <View height={scale(300)} justifyContent={"center"} alignItems={"center"}>
                <Text>No Process Found</Text>
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
          data={data3}
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
