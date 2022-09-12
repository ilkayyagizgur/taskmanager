import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Priority} from './ItemSchema';

const TaskInputField = props => {
  const {onSubmit} = props;
  const [summary, setSummary] = useState(null);
  const [subsummary, setSubsummary] = useState(null);
  const [detail, setDetail] = useState();
  const [priority, setPriority] = useState(Priority.High);

  const handle = () => {
    setSummary(null);
  };
  const onPress = () => {
    onSubmit({summary, priority, subsummary});
  };

  return (
    <SafeAreaView style={{backgroundColor: '#001e1f', borderRadius: 15}}>
      {/*<Text style={{color: '#016f7a'}}>*/}
      {/*  {' '}*/}
      {/*  ───────────────────────────*/}
      {/*</Text>*/}
      {/*<View style={{borderBottomColor: '#016f7a', borderBottomWidth: 10}} />*/}
      <TouchableOpacity
        style={{
          width: styles.addbutton.width,
          height: styles.addbutton.height,
          left: 340,
          top: 15,
        }}
        onPress={onPress}>
        <Image
          source={require('../src/assets/plus.png')}
          style={styles.addbutton}
        />
      </TouchableOpacity>
      {/*<TouchableOpacity*/}
      {/*  // onPress={() => navigation.goBack()}*/}
      {/*  style={styles.cancelbutton}>*/}
      {/*  <Text style={{fontSize: 17, color: '#017bff'}}>Cancel</Text>*/}
      {/*</TouchableOpacity>*/}
      <View style={{height: 20, width: 20}} />
      <Text style={styles.header}>Task</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder={'Title'}
          onChangeText={setSummary}
          placeholderTextColor={'rgba(255,255,255,0.44)'}
        />
        <Text style={{bottom: 30, color: 'white'}}>
          {' '}
          ────────────────────────
        </Text>
        <TextInput
          style={styles.inputField2}
          placeholder={'Detail'}
          value={detail}
          onChangeText={text => setDetail(text)}
          placeholderTextColor={'rgba(255,255,255,0.44)'}
          multiline={true}
        />
      </View>
      <Text style={styles.header2}>Assigned</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.inputField3}
          placeholder={'E-mail'}
          onChangeText={setSubsummary}
          placeholderTextColor={'rgba(255,255,255,0.44)'}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
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
    bottom: 10,
    marginLeft: 10,
  },
  inputField2: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    bottom: 30,
  },
  inputField3: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
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
});

export default TaskInputField;
