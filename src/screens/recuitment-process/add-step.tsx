import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import SelectionBox from "@/components/drop-down";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { queryClient } from "@/services/api/api-provider";
import { useAddStep, useSteps, useUpdateStep } from "@/services/api/recruitment-process";
import { useUser } from "@/store/user";
import { useGetUser } from "@/services/api/user";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { DescriptionField } from "@/ui/description-field";

const schema = z.object({
  stepName: z.string({
    required_error: "Step Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  order: z.string().optional(),
  contactPerson: z.string({
    required_error: "Contact person is required",
  }),
});

export type AddStepFormType = z.infer<typeof schema>;

function createArrayWithConsecutiveNumbers(count) {
  if (count <= 0) {
    return [];
  }

  const resultArray = [];

  for (let i = 1; i <= count + 1; i++) {
    resultArray.push(i);
  }

  return resultArray;
}

export const AddStep = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();
  const route = useRoute<any>();
  const company = useUser((state) => state?.company);

  const { data: users } = useGetUser({
    variables: {
      id: company?.id,
    },
  });
  
  let paramData = route?.params?.data
  
  const isUpdate = route?.params?.isUpdate
  console.log("OLD DATA",JSON.stringify(paramData, null, 2));
  
  const [selectedOrder, setSelectedOrder] = useState();
  const [contactPerson, setContactPerson] = useState();

  useSoftKeyboardEffect();
  console.log("sort_order", paramData?.sort_order);

  // useEffect(() => { 
  //   if(isUpdate){
  //     setSelectedOrder({name:paramData?.sort_order, id:paramData?.sort_order})
  //   }


  // }, [isUpdate])

  const { mutate: AddStepApi, isLoading } = useAddStep();

  const { mutate: UpdateStepApi, isUpdateLoading } = useUpdateStep();


  const sorderOrders = useMemo(() => {
    let sortOrdersArray = createArrayWithConsecutiveNumbers(route?.params?.stepsCount);

    return sortOrdersArray;
  }, [route?.params]);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddStepFormType>({
    resolver: zodResolver(schema),
    defaultValues: paramData ? {
      stepName: paramData?.step_name || "",
      description: paramData?.description || "",
      order: `${paramData?.sort_order || ""}`, // Set the default value for the order field
      contactPerson: `${paramData?.responsible_person_id || ""}`, // Assuming responsible_person_id is the ID for contactPerson

      // other fields here
    } : {},
  });
  useEffect(() => {
    if (paramData) {
      setSelectedOrder({ name: `${paramData?.sort_order}`, id: `${paramData?.sort_order}` });
      setContactPerson({ name : `${paramData?.name}`, id:`${paramData?.responsible_person_id}`})
    }
  }, [paramData]);

  // @ts-ignore
  const onSubmit = (data: AddStepFormType) => {
    if(isUpdate) {

      UpdateStepApi(
        {
          id:paramData?.id,
          step_name: data?.stepName,
          description: data?.description,
          company_recruitment_process_id: route?.params?.processId,
          responsible_person_id: parseInt(data?.contactPerson),
          sort_order: parseInt(data?.order),
        },
        {
          onSuccess: (responseData) => {
            if (responseData?.response?.status === 200) {
              showSuccessMessage(responseData?.response?.message);
              queryClient.invalidateQueries(useSteps.getKey());
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
    else {
      AddStepApi(
        {
          step_name: data?.stepName,
          description: data?.description,
          company_recruitment_process_id: route?.params?.processId,
          responsible_person_id: parseInt(data?.contactPerson),
          sort_order: parseInt(data?.order),
        },
        {
          onSuccess: (responseData) => {
            if (responseData?.response?.status === 200) {
              showSuccessMessage(responseData?.response?.message);
              queryClient.invalidateQueries(useSteps.getKey());
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
      <ScreenHeader title={isUpdate ? "Edit Step": "Add Step"} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={"large"} gap={"medium"} paddingHorizontal={"large"}>
          <ControlledInput
            placeholder="Enter step name"
            label="Step Name"
            control={control}
            name="stepName"
          />
          <DescriptionField
            placeholder="Enter description"
            label="Description"
            control={control}
            name="description"
          />

          {route?.params?.stepsCount !== 0 ? (
            <View>
              <SelectionBox
                label="Step Order"
                placeholder="Select order"
                value={selectedOrder}
                data={sorderOrders.map(element => ({ id: `${element}`, name: `${element}` }))}
                onChange={(data) => {
                  setSelectedOrder(data);
                  setValue("order", `${data?.id}`);
                  setError("order", {
                    type: "custom",
                    message: "",
                  });
                }}
              />

              {/* <SelectionBox
                label="Step Order"
                placeholder="Select order"
                value={selectedOrder}
                //@ts-ignore
                data={sorderOrders?.map((element) => {
                  return {
                    id: element,
                    name: `${element}`,
                  };
                })}
                onChange={(data) => {
                  setSelectedOrder(data);
                  setValue("order", `${data?.id}`);
                  setError("order", {
                    type: "custom",
                    message: "",
                  });
                }}
              /> */}
              {errors?.order?.message && (
                <Text paddingTop={"small"} variant="regular14" color={"error"}>
                  {errors?.order?.message}
                </Text>
              )}
            </View>
          ) : null}

          <View>
          <SelectionBox
              label="Contact Person"
              placeholder="Select person"
              value={contactPerson} // Set value to contactPerson state
              data={users?.map((element) => ({
                id: `${element?.user_id}`,
                name: element?.person_name,
              }))}
              onChange={(data) => {
                // Update contact person state
                setContactPerson(data);
                setValue("contactPerson", `${data?.id}`);
                setError("contactPerson", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {/* <SelectionBox
              label="Contact Person"
              placeholder="Select person"
              value={contactPerson}
              //@ts-ignore
              data={users?.map((element) => {
                return {
                  id: parseInt(element?.user_id),
                  name: element?.person_name,
                };
              })}
              onChange={(data) => {
                setContactPerson(data);
                setValue("contactPerson", `${data?.id}`);
                setError("contactPerson", {
                  type: "custom",
                  message: "",
                });
              }}
            /> */}
            {errors?.contactPerson?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.contactPerson?.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
        <Button
          label={isUpdate ? "Edit Step": "Add Process"}
          marginHorizontal={"large"}
          loading={isUpdate ? isUpdateLoading : isLoading}
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

