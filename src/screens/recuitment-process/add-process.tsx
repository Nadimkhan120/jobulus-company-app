import React, {useMemo} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import SelectionBox from "@/components/drop-down";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { queryClient } from "@/services/api/api-provider";
import { useDepartments } from "@/services/api/settings";
import { useAddProcess, useUpdateProcess, useRecruitMentProcess, } from "@/services/api/recruitment-process";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { DescriptionField } from "@/ui/description-field";
import { useGetUser } from "@/services/api/user";

const schema = z.object({
  processName: z.string({
    required_error: "Process Name is required",
  }),
  ownerName: z.string({
    required_error: "Owner Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),

  department: z.string({
    required_error: "Department is required",
  }),
});

export type AddProcessFormType = z.infer<typeof schema>;

export const AddProcess = ({route}) => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();
  // Inside your AddProcess component
  const paramData = route?.params?.data;
  const isUpdate = route?.params?.isUpdate
  
  useSoftKeyboardEffect();

  const company = useUser((state) => state?.company);

  const { mutate: AddProcessApi, isLoading } = useAddProcess();

  const { mutate: updateProcessApi, updateIsLoading } = useUpdateProcess();

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddProcessFormType>({
    resolver: zodResolver(schema),
  });

  


  const { data: users } = useGetUser({
    variables: {
      id: company?.id,
    },
  });
  
  const { data: departments } = useDepartments({
    variables: {
      id: company?.id,
    },
  });

  const mappedData = useMemo(() => {
    return users?.map((user: { company_user_id: any; person_name: any; }) => {
      return {
        id: user?.company_user_id, // Assuming company_user_id is equivalent to department id
        name: user?.person_name
      };
    });
  }, [users]);


   // Set default values from route params data
   React.useEffect(() => {
    if (isUpdate && paramData) {
      let ownerData = mappedData?.find(item => item?.id === paramData?.process_owner)
      // If it's an update and paramData exists, populate form fields
      setValue("processName", paramData?.process_name);
      setValue("description", paramData?.description);
      setValue("ownerName", ownerData?.id);
      setValue("department", paramData?.department_id);
    }
  }, [isUpdate, paramData, mappedData]);
  

  // @ts-ignore
  const onSubmit = (data: AddProcessFormType) => {
    if(isUpdate){
      // update process
      updateProcessApi(
        {
          id:paramData?.id,
          process_name: data?.processName,
          description: data?.description,
          is_default: "0",
          company_id: company?.id,
          department_id: parseInt(data?.department),
          process_owner: parseInt(data?.ownerName),
        },
        {
          onSuccess: (responseData) => {
            if (responseData?.response?.status === 200) {
              showSuccessMessage(responseData?.response?.message);
              queryClient.invalidateQueries(useRecruitMentProcess.getKey());
              goBack();
            } else {
              showErrorMessage(responseData?.response?.message);
            }
          },
          onError: (error) => {
            //@ts-ignore
            showErrorMessage(error?.response?.data?.message);
          },
        }
      );
    }
    else{
      //add new Process
      AddProcessApi(
        {
          process_name: data?.processName,
          description: data?.description,
          is_default: "0",
          company_id: company?.id,
          department_id: parseInt(data?.department),
          process_owner:  parseInt(data?.ownerName),
        },
        {
          onSuccess: (responseData) => {
            if (responseData?.response?.status === 200) {
              showSuccessMessage(responseData?.response?.message);
              queryClient.invalidateQueries(useRecruitMentProcess.getKey());
              goBack();
            } else {
              showErrorMessage(responseData?.response?.message);
            }
          },
          onError: (error) => {
            //@ts-ignore
            showErrorMessage(error?.response?.data?.message);
          },
        }
      );
    }

    
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title={isUpdate? "Edit Process": "Add Process"} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={"large"} gap={"medium"} paddingHorizontal={"large"}>
          <ControlledInput
            placeholder="Enter process name"
            label="Process Name"
            control={control}
            name="processName"
          />
          <DescriptionField
            placeholder="Enter description"
            label="Description"
            control={control}
            name="description"
          />
          {/* <ControlledInput
            placeholder="Enter owner name"
            label="Owner Name"
            control={control}
            name="ownerName"
          /> */}

          <View>
            <SelectionBox
              label="Owner Name"
              placeholder="Select owner"
              //@ts-ignore
              data={mappedData}
              value={mappedData?.find(item => item?.id === paramData?.process_owner)}
              // value={mappedData[parseInt(paramData?.process_owner)]}
              onChange={(selectedUser) => {
                setValue("ownerName", selectedUser?.id); // Set the name of the selected user as the field value
                setError("ownerName", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {errors?.ownerName?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.ownerName?.message}
              </Text>
            )}
          </View>


          <View>
            <SelectionBox
              label="Department"
              placeholder="Select department"
              //@ts-ignore
              data={departments?.default}
              value={departments?.default?.find((item) => item?.id === parseInt(paramData?.department_id) )}
              onChange={(data) => {
                setValue("department", `${data?.id}`);
                setError("department", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {errors?.department?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.department?.message}
              </Text>
            )}
          </View>

         
        </View>
      </ScrollView>

      <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
        <Button
          label={isUpdate ? "Update Process" : "Add Process"}
          marginHorizontal={"large"}
          loading={isUpdate ? updateIsLoading : isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(100),
  },
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});

