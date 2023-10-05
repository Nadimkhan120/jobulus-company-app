import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ColorSchemeName } from 'react-native';
import {
  Appearance,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import { ScreenHeader } from '@/components/screen-header';
import { setPostJobDescription } from '@/store/post-job';
import type { Theme } from '@/theme';
import { Button, Screen, View } from '@/ui';

interface IProps {
  navigation: any;
  theme?: ColorSchemeName;
}

function createContentStyle(theme: ColorSchemeName) {
  // Can be selected for more situations (cssText or contentCSSText).
  const contentStyle = {
    backgroundColor: '#2e3847',
    color: '#fff',
    caretColor: 'red',
    placeholderColor: 'gray',

    contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
  };
  if (theme === 'light') {
    contentStyle.backgroundColor = '#fff';
    contentStyle.color = '#000033';
    contentStyle.placeholderColor = '#a9a9a9';
  }
  return contentStyle;
}

export function JobDescription(props: IProps) {
  const { colors } = useTheme<Theme>();
  const { height } = useWindowDimensions();
  const { theme: initTheme = Appearance.getColorScheme(), navigation } = props;
  const richText = useRef<RichEditor>(null);

  const scrollRef = useRef<ScrollView>(null);
  // save on html
  const contentRef = useRef();

  const [theme] = useState(initTheme);

  const contentStyle = useMemo(() => createContentStyle(theme), [theme]);

  // on save to preview
  const handleSave = useCallback(() => {
    //const result = `${contentRef.current},${getContentCSS()}`;

    setPostJobDescription({
      content: contentRef.current,
      css: getContentCSS(),
    });

    navigation.navigate('PostJobDetail');
  }, [navigation]);

  // editor change data
  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    // @ts-ignore
    contentRef.current = html;
  }, []);

  const editorInitializedCallback = useCallback(() => {
    // richText.current.registerToolbar(function (items) {
    // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
  }, []);

  // editor height change
  const handleHeightChange = useCallback((height: number) => {
    console.log('editor height change:', height);
  }, []);

  const handlePaste = useCallback((data: any) => {
    console.log('Paste:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyUp = useCallback(() => {
    // console.log('KeyUp:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyDown = useCallback(() => {
    // console.log('KeyDown:', data);
  }, []);

  const handleInput = useCallback(() => {
    // console.log(inputType, data)
  }, []);

  const handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  const handleBlur = useCallback(() => {
    console.log('editor blur');
  }, []);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="Job Description" />
      <ScrollView
        style={[styles.scroll]}
        keyboardDismissMode={'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
      >
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
        />
        <RichEditor
          // initialFocus={true}
          initialFocus={false}
          firstFocusEnd={false}
          editorStyle={contentStyle} // default light style
          ref={richText}
          style={styles.rich}
          useContainer={true}
          initialHeight={height * 0.6}
          enterKeyHint={'done'}
          containerStyle={{ borderRadius: 24 }}
          placeholder={'Write Your Job Description'}
          //initialContentHTML={initHTML}
          editorInitializedCallback={editorInitializedCallback}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onPaste={handlePaste}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
        />
      </ScrollView>
      <View
        paddingVertical={'large'}
        marginVertical={'large'}
        borderTopWidth={1}
        borderTopColor={'grey400'}
      >
        <Button label="Next" marginHorizontal={'large'} onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});
