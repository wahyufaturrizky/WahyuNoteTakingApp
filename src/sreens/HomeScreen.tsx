/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {useFieldArray, useForm, useWatch} from 'react-hook-form';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CardItem} from '../components/CardItem';
import {FlatList} from '../components/FlatList';
import {SafeAreaView} from '../components/SafeAreaView';
import {Spinner} from '../components/Spinner';
import {StatusBar} from '../components/StatusBar';
import {Text} from '../components/Text';
import {View} from '../components/View';
import {colors} from '../style/color';
import {FormValuesListOfNote} from '../interface/note.interface';
import {useNoteList} from '../services/note/useNote';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.green.regular,
  };

  const {control: controlNote, setValue: setValueNote} =
    useForm<FormValuesListOfNote>({
      defaultValues: {
        listOfNote: [],
      },
    });

  const {fields: fieldsNote} = useFieldArray({
    control: controlNote,
    name: 'listOfNote',
    keyName: 'noteId',
  });

  useWatch({
    control: controlNote,
    name: 'listOfNote',
  });

  const {isLoading: isLoadingNoteList, refetch: refetchNoteList} = useNoteList({
    options: {
      onSuccess: (data: any) => {
        console.log('@data', data);
        setValueNote('listOfNote', data.data);
      },
    },
  });

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      refetchNoteList();
    }, []),
  );

  const renderFooter = () => (
    <View>
      <Spinner size="small" color={colors.green.regular} />
      <Text
        label={'Load more data'}
        fontSize={14}
        fontWeight="400"
        color={colors.black.regular}
        textAlign="center"
      />
    </View>
  );

  const renderEmpty = () => (
    <View>
      <Text
        label={'Empty note'}
        fontSize={14}
        fontWeight="400"
        color={colors.black.regular}
        textAlign="center"
      />
    </View>
  );

  console.log('@fieldsNote', fieldsNote);

  return (
    <SafeAreaView flex={1} backgroundColor={colors.white.lighter}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {isLoadingNoteList ? (
        <Spinner size="small" color={colors.green.regular} />
      ) : (
        <FlatList
          data={fieldsNote}
          renderItem={({item}) => {
            return (
              <CardItem
                onPress={() =>
                  navigation.navigate('DetailNote', {detailData: item})
                }
                data={item}
              />
            );
          }}
          // ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          keyExtractor={(item, index) => index}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
