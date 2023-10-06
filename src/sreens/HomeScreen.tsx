/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

const HomeScreen = ({navigation: {navigate}}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.green.regular,
  };

  const {control: controlTruck, setValue: setValueTruck} =
    useForm<FormValuesListOfNote>({
      defaultValues: {
        listOfNote: [],
      },
    });

  const {fields: fieldsTruck} = useFieldArray({
    control: controlTruck,
    name: 'listOfNote',
  });

  useWatch({
    control: controlTruck,
    name: 'listOfNote',
  });

  const renderFooter = () => (
    <View>
      <Spinner size="small" color={colors.green.regular} />
      <Text
        label={'strings.common.noMoreData'}
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
        label={'strings.newFFbGrading.noTrucksWillBeDisplayed'}
        fontSize={14}
        fontWeight="400"
        color={colors.black.regular}
        textAlign="center"
      />
    </View>
  );

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
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={1}>
        <Text
          label={'strings.newFFbGrading.numberOfTruck'}
          fontSize={18}
          fontWeight="400"
          color={colors.black.regular}
        />
      </View>

      <FlatList
        data={fieldsTruck}
        renderItem={({item}) => {
          return (
            <CardItem
              onPress={() => navigate('DetailFFBGrading', {detailData: item})}
              data={item}
            />
          );
        }}
        // ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
