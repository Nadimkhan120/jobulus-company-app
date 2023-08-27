import { Image } from 'expo-image';
import React from 'react';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';

type TabBarIconProps = {
  color?: string;
  name: IconTypes;
  focused: boolean;
  size?: number;
};

const HOME = 'Home';
const Vacancies = 'Vacancies';
const AddPost = 'AddPost';
const Candidates = 'Candidates';
const Settings = 'Settings';
// get icon when tab is not focused
const getIcon = (name) => {
  switch (name) {
    case HOME:
      return 'home';
    case Vacancies:
      return 'vacancies';
    case AddPost:
      return 'plus';
    case Candidates:
      return 'candidates';
    case Settings:
      return 'more';
    default:
      break;
  }
};

//get icon when tab is focused
const getIconFocused = (name) => {
  switch (name) {
    case HOME:
      return 'Home';
    case Vacancies:
      return 'Vacancies';
    case AddPost:
      return 'plus';
    case Candidates:
      return 'Candidates';
    case Settings:
      return 'More';
    default:
      break;
  }
};

// get icon when tab is focused
// const getIconFocused = (name) => {
//   switch (name) {
//     case HOME:
//       return "home";
//     case Vacancies:
//       return "vacancies";
//     case AddPost:
//       return "plus";
//     case Candidates:
//       return "candidates";
//     case Settings:
//       return "more";
//     default:
//       break;
//   }
// };

const TabBarIcon = ({
  color,
  name,
  focused,
  size = scale(18),
}: TabBarIconProps) => {
  console.log(getIconFocused(name));

  return (
    <Image
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
      // @ts-ignore
      source={focused ? icons[getIconFocused(name)] : icons[getIcon(name)]}
      //   source={icons[focused ? getIconFocused(name) : getIcon(name)]}
      contentFit="contain"
    />
  );
};

export default TabBarIcon;
