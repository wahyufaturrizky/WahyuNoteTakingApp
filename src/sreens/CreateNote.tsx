/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {Platform, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {SafeAreaView} from '../components/SafeAreaView';
import {StatusBar} from '../components/StatusBar';
import {View} from '../components/View';
import {ListOfNote} from '../interface/note.interface';
import {useCreateNote} from '../services/note/useNote';
import {colors} from '../style/color';

const CreateNoteScreen = ({navigation: {navigate}}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.green.regular,
  };

  const {
    control: controlNote,
    handleSubmit: handleSubmitNote,
    getValues,
    formState: {errors},
  } = useForm<ListOfNote>({
    defaultValues: {
      desc: '',
      title: '',
    },
  });

  useWatch({
    control: controlNote,
    name: 'title',
  });

  useWatch({
    control: controlNote,
    name: 'desc',
  });

  const {mutate: createNote, isLoading: isLoadingNote} = useCreateNote({
    options: {
      onSuccess: (data: any) => {
        if (data) {
          navigate('HomeScreen');
        }
      },
    },
  });

  const onSubmitNote = (data: any) => {
    createNote(data);
  };

  return (
    <SafeAreaView flex={1} backgroundColor={colors.white.lighter}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        padding={24}
        borderBottomColor={colors.white.light}
        backgroundColor={colors.white.regular}
        borderBottomWidth={1}>
        <Input
          isUpperCase
          maxLength={10}
          keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
          borderColor={colors.black.light}
          borderRadius={12}
          borderWidth={4}
          label={'Title'}
          labelColor={colors.black.light}
          labelFontSize={16}
          name="title"
          control={controlNote}
          marginBottom={16}
        />

        <Input
          keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
          borderColor={colors.black.light}
          borderRadius={12}
          borderWidth={4}
          label={'Desc'}
          labelColor={colors.black.light}
          labelFontSize={16}
          name="desc"
          control={controlNote}
        />
      </View>

      <View padding={24}>
        <Button
          backgroundColor={
            Object.keys(errors).length ||
            !getValues('title') ||
            !getValues('desc')
              ? colors.green.lighter
              : colors.green.regular
          }
          disabled={
            isLoadingNote ||
            !getValues('title') ||
            !getValues('desc') ||
            (Object.keys(errors).length ? true : false)
          }
          label={isLoadingNote ? 'Loading...' : 'Create'}
          labelColor={colors.white.regular}
          onPress={handleSubmitNote(onSubmitNote)}
          sizeLabel={20}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateNoteScreen;
