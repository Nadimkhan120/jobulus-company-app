import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, {useMemo, useRef, useEffect, useCallback, useState} from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { BottomModal } from "@/components/bottom-modal";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { icons } from '@/assets/icons';
import { useCandidateStatuses, type Candidate, useUpdateCandidateStatus } from '@/services/api/candidate';
import { Button, PressableScale, Text, View } from '@/ui';
import { useTheme } from "@shopify/restyle";
import { Avatar } from '../avatar';
import type { Theme } from "@/theme";
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ApplicantMenuItems } from '../applicantMenu';
import SelectionBox from '../drop-down';
import { DescriptionField } from '@/ui/description-field';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorMessage, showSuccessMessage } from '@/utils';

const schema = z.object({
  status: z.string({
    required_error: "Status is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

export type ChangeStatusFormType = z.infer<typeof schema>;

const data3 = [
  {
    icon: "eye",
    title: "View Details",
  },
  {
    icon: "pencl",
    title: "Change States",
  },
];

type PersonItemProps = {
  data: Candidate;
};

export const PersonItem = ({ data }: PersonItemProps) => {
  // console.log(JSON.stringify(data, null, 2));
  
  const { colors } = useTheme<Theme>();
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetOptionsModalRef2 = useRef<BottomSheetModal>(null);

  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["25%"], []);
  const snapPoints2 = useMemo(() => ["92%"], []);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<ChangeStatusFormType>({
    resolver: zodResolver(schema),
  });

  const { data: status } = useCandidateStatuses({});

  const {mutate : updateStatusApi} = useUpdateCandidateStatus(); 

  // show bottom modal
  const handlePresentOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef?.current?.present();
  }, []);
  
  // dismiss bottom modal
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef?.current?.dismiss();
  }, []);

  //click on View Details
  const handleViewDetails = () => {
    navigation?.navigate('Job', { id: data?.unique_id });
    handleDismissOptionsModalPress()
  }

    //click on Change status
  const handleClickOnChangeStatus = () => {
    handleDismissOptionsModalPress(); //close previous bottom sheet 
    handlePresentOptionsModalPress2(); // open new bottom sheet
  }

  const renderOptionItem = useCallback(({ item }: any) => {
    return (
      <ApplicantMenuItems 
        title={item?.title}
        icon={item?.icon}
        onPress={() => {
          item?.title =="View Details" ? handleViewDetails(): handleClickOnChangeStatus();
        }}
      />
    );
  }, []);




  // show bottom modal 2
  const handlePresentOptionsModalPress2 = useCallback(() => {
    bottomSheetOptionsModalRef2?.current?.present();
  }, []);
  
  // dismiss bottom modal 2
  const handleDismissOptionsModalPress2 = useCallback(() => {
    bottomSheetOptionsModalRef2?.current?.dismiss();
  }, []);
  

  const onSubmit = () => {
    updateStatusApi({
      id:data?.id,
      person_applied_jobs_id: parseInt(data.job_id),
      comments: getValues('description'),
      status: parseInt(getValues('status')),
      stage_purpose: '',
      recommendation: '',
    },
    {
      onSuccess: (data) => {
        if (data?.response?.status === 200) {
          // goBack();
          showSuccessMessage("Status update successfully");
          handleDismissOptionsModalPress2()

          // queryClient.invalidateQueries(useCompanies.getKey());
          // setSelectedLocation("");
        } else {
          showErrorMessage(data.response.message);
        }
      },
      onError: (error) => {
        // An error happened!
      },
    }
    )


  }

  return (
    <PressableScale
      onPress={() => {
        navigation?.navigate('Job', { id: data?.unique_id });
      }}
    >
      <View
        flexDirection={'row'}
        marginBottom={'large'}
        paddingHorizontal={'large'}
      >
        <View>
          <Avatar
            source={{ uri: data?.profile_pic }}
            placeholder={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            transition={1000}
          />
        </View>
        <View flex={1} paddingHorizontal={'medium'}>
          <Text variant={'semiBold14'} color={'black'}>
            {data?.full_name}
          </Text>
          <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
            <Text variant={'regular13'} color={'grey300'}>
              Applied For:{' '}
            </Text>
            <Text variant={'regular13'} color={'grey100'}>
              {'React Native Developer'}
            </Text>
          </View>

          <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
            <Text variant={'regular13'} color={'grey300'}>
              Applied on:{' '}
            </Text>
            <Text variant={'regular13'} color={'grey100'}>
              {data?.applied_on}
            </Text>
          </View>
          <View
            flexDirection={'row'}
            gap={'medium'}
            alignItems={'center'}
            paddingTop={'small'}
          >
            {/* {tags.map((item, index) => {
            return <Tag key={index} name={item} icon="cv" />;
          })} */}
          </View>
        </View>

        <PressableScale onPress={handlePresentOptionsModalPress}>
          <Image
            source={icons['more-horizontal']}
            contentFit="contain"
            style={styles.image}
          />
        </PressableScale>
      </View>

      <BottomModal
        ref={bottomSheetOptionsModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={data3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOptionItem}
        />
      </BottomModal>


      <BottomModal
        ref={bottomSheetOptionsModalRef2}
        index={0}
        snapPoints={snapPoints2}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <View style={{flex: 1, margin:scale(20)}}>
          <SelectionBox
              label="Candidate Status"
              placeholder="Select person"
              // value={status} // Set value to contactPerson state
              data={status}
              onChange={(data) => {
                setValue("status", `${data?.id}`)
                setError("status", {
                  type: "custom",
                  message: "",
                });
              }}
            />

          <DescriptionField
            placeholder="Enter description"
            label="Description"
            control={control}
            name="description"
          />

      <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
        <Button
          label={"Change Status"}
          marginHorizontal={"large"}
          // loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
        </View>
      </BottomModal>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },

  image: {
    height: scale(24),
    width: scale(24),
  },
});
