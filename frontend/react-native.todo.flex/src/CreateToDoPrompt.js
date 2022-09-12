import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Priority} from './ItemSchema';

Icon.loadFont(); // load FontFamily font

export function CreateToDoPrompt(props) {
  const {onSubmit} = props;
  const [summary, setSummary] = useState(null);
  const [subsummary, setSubsummary] = useState(null);
  const [priority, setPriority] = useState(Priority.High);
  console.log(summary);
  return (
    <View style={styles.modalWrapper}>
      <Text h4 style={styles.addItemTitle}>
        Add Task
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder={'Task'}
        onChangeText={setSummary}
        placeholderTextColor={'rgba(0,0,0,0.44)'}
      />
      <TextInput
        style={styles.inputField1}
        placeholder={'E-mail'}
        onChangeText={setSubsummary}
        placeholderTextColor={'rgba(0,0,0,0.44)'}
      />
      <Picker
        style={{width: '80%'}}
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
      <TouchableOpacity
        style={{
          width: styles.addbutton.width,
          height: styles.addbutton.height,
        }}
        onPress={() => onSubmit({summary, priority, subsummary})}>
        <Image
          source={require('../src/assets/plus.png')}
          style={styles.addbutton}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: 300,
    minHeight: 400,
    borderRadius: 4,
    alignItems: 'center',
  },
  addItemTitle: {
    margin: 20,
  },
  saveButton: {
    width: 280,
  },
  addbutton: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  inputField: {
    backgroundColor: 'rgba(0,0,0,0.24)',
    color: '#fff',
    bottom: 10,
    width: 300,
    height: 50,
    borderRadius: 20,
    padding: 10,
  },
  inputField1: {
    backgroundColor: 'rgba(0,0,0,0.24)',
    color: '#fff',
    top: 10,
    bottom: 10,
    width: 300,
    height: 50,
    borderRadius: 20,
    padding: 10,
  },
});
