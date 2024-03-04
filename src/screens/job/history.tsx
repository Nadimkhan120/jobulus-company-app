import React from 'react';

import { Tag } from '@/components/tag';
import { Text, View } from '@/ui';
import { useHisotyrDetail } from '@/services/api/candidate';
import moment from 'moment';

const data = [
  {
    property: 'For UI/UXDesigner',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Applied',
    hasCV: true,
    tags: ['cv', 'cover letter'],
    job: 'UI/UX DESIGNER',
  },
  {
    property: 'By Liam Smith',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Shortlisted',
    job: 'React native developer',
    tags: [],
  },
  {
    property: 'Scheduled By Liam Smith',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Interview',
    day: '20 June 2023',
    job: 'Laravel developer',
    tags: [],
  },
];

const History = ({data}) => {

  // company/company_recruitment_process_step_persons/person_applied_jobs_id/1
  // const { data: historyData } = useHisotyrDetail({
  //   unique_id:1
  // });  
  // console.log("historyData ",historyData);
  
  return (
    <View paddingVertical={'2xl'}>
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            backgroundColor="white"
            paddingHorizontal={'large'}
            flexDirection={'row'}
          >
            <View paddingVertical={'large'}>
              <Text variant={'regular12'} color={'black'}>
                {moment(item?.updated_at).format('DD MMM')}
              </Text>
              <Text variant={'regular12'} color={'black'}>
              {moment(item?.updated_at).format('h:mm A')}
                {/* {item.time} */}
              </Text>
            </View>
            <View
              width={0.5}
              backgroundColor={'grey400'}
              marginHorizontal={'small'}
            />
            <View paddingVertical={'large'} marginLeft={'medium'}>
              <Text variant={'medium14'} color={'black'}>
                {/* {item.status} */}
                {item?.step_name}
              </Text>
              <Text
                variant="regular12"
                paddingTop={'small'}
                marginLeft={'tiny'}
                color={'grey300'}
              >
                For{' '}
                <Text variant="regular12" color={'grey100'}>
                  {/* {item?.job} */}
                  {item?.description}
                </Text>
              </Text>

              <View flexDirection={'row'} gap={'medium'} paddingTop={'small'}>
                {item?.tags?.map((element, tagIndex) => {
                  return <Tag key={tagIndex} icon={'cv'} name={element} />;
                })}
              </View>

              <Text variant="medium12" marginLeft={'tiny'}>
                {item.day}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default History;
