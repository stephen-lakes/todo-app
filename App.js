import { useState } from 'react';
import * as Font from 'expo-font';

import { StatusBar } from 'expo-status-bar';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

import Task from './components/Task';
import { globalStyles } from './styles/Global';

const getFonts = () => {
  return Font.loadAsync({
    'sora-regular': require('./assets/Fonts/Sora-Regular.ttf'),
    'sora-bold': require('./assets/Fonts/Sora-Bold.ttf'),
  })
}

getFonts();

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task !== "") {
      setTaskItems([...taskItems, task]);
    }
    setTask("");
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={globalStyles.container}>
    
    {/* Today's taks */}
    <View style={styles.taskswrapper}>
      <Text style={globalStyles.sectionTitle}>Today's tasks</Text>
      <View style={styles.items}>
        {/* This is where the tasks will go */}
        {
          taskItems.map((item, index) => {
            return(
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>

            ) 
          })
        }
      </View>
    </View>

    {/* Write a task */}
    <KeyboardAvoidingView
      behaviour={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} value={task} placeholder={"Write a task"} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

    </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  taskswrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {

  }
});
