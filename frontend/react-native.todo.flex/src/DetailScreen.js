import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Priority} from './ItemSchema';
import {Picker} from '@react-native-picker/picker';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
export const DetailScreen = ({navigation, route}) => {
  const [priority, setPriority] = useState(Priority.High);
  const Stack = createNativeStackNavigator();
  const onPress = () => {
    navigation.goBack();
  };
  const {detailscreensummary, detailscreensubsummary} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: '#001e1f'}}>
      <SafeAreaView style={{backgroundColor: '#001e1f', borderRadius: 15}}>
        <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>
          Detail
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              color: 'white',
              left: 20,
              bottom: 23,
            }}>
            {'< Back'}
          </Text>
        </TouchableOpacity>
        <View style={{height: 20, width: 20}} />
        <Text style={styles.header}>Task</Text>
        <View style={styles.container}>
          <Text style={styles.inputField}> {detailscreensummary}</Text>
        </View>
        <Text style={styles.header2}>Assigned to</Text>
        <View style={styles.container2}>
          <Text style={styles.inputField3}>{detailscreensubsummary}</Text>
        </View>
        <View style={{marginTop: 10, borderColor: '#fff', borderWidth: 2}} />
        <View style={styles.container3}>
          <Text style={styles.inputField4}>
            {' '}
            {Priority[priority]} Completed.
          </Text>
        </View>
        <Picker
          style={{
            top: 20,
            width: '80%',
            color: 'white',
            backgroundColor: '#016f7a',
            borderRadius: 20,
            alignSelf: 'center',
          }}
          selectedValue={priority}
          onValueChange={value => setPriority(value)}>
          {Priority.map(priority => (
            <Picker.Item
              key={priority}
              label={priority}
              value={Priority[priority]}
            />
          ))}
        </Picker>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '90%',
    backgroundColor: '#016f7a', //#001c1f
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  container2: {
    height: 50,
    width: '90%',
    backgroundColor: '#016f7a', //#001c1f
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  container3: {
    height: 50,
    width: '90%',
    backgroundColor: '#016f7a', //#001c1f
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'flex-start',
    top: 10,
  },
  header: {
    marginLeft: 22,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  header2: {
    marginLeft: 22,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  inputField: {
    color: '#fff',
    flex: 1,
    top: 15,
    marginLeft: 10,
  },
  inputField2: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    bottom: 25,
  },
  inputField3: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    top: 15,
  },
  inputField4: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    top: 15,
  },
  textinput: {
    marginBottom: 25,
    height: 50,
    width: '90%',
    backgroundColor: '#016f7a', //#001c1f
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  Button: {
    marginTop: 350,
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#016f7a',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addbutton: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  cancelbutton: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  dropdown: {
    backgroundColor: '#016f7a',
    height: 50,
    width: 200,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
});
