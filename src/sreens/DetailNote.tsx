/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {Platform, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {SafeAreaView} from '../components/SafeAreaView';
import {StatusBar} from '../components/StatusBar';
import {View} from '../components/View';
import {ListOfNote} from '../interface/note.interface';
import {useDeleteNote, useUpdateNote} from '../services/note/useNote';
import {colors} from '../style/color';

const DetailNoteScreen = ({route, navigation: {navigate}}: any) => {
  const {title, desc, id} = route.params.detailData;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.green.regular,
  };

  const {
    control: controlNote,
    handleSubmit: handleSubmitNote,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<ListOfNote>({
    defaultValues: {
      title: '',
      desc: '',
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

  useEffect(() => {
    setValue('title', title);
    setValue('desc', desc);
  }, [desc, route.params.detailData, setValue, title]);

  const {mutate: updateNote, isLoading: isLoadingNote} = useUpdateNote({
    id,
    options: {
      onSuccess: (data: any) => {
        if (data) {
          navigate('HomeScreen');
        }
      },
    },
  });

  const {mutate: deleteNote, isLoading: isLoadinNote} = useDeleteNote({
    options: {
      onSuccess: (data: any) => {
        if (data) {
          navigate('HomeScreen');
        }
      },
    },
  });

  const onSubmitNote = (data: any) => {
    updateNote(data);
  };

  const handleDeleteNote = () => {
    deleteNote({id});
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
          label={isLoadingNote ? 'Loading...' : 'Save'}
          labelColor={colors.white.regular}
          onPress={handleSubmitNote(onSubmitNote)}
          sizeLabel={20}
          marginBottom={16}
        />

        <Button
          backgroundColor={colors.red.regular}
          label={isLoadinNote ? 'Loading...' : 'Delete'}
          disabled={isLoadinNote}
          labelColor={colors.white.regular}
          onPress={() => handleDeleteNote()}
          sizeLabel={20}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailNoteScreen;
