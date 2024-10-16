import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  AccessibilityInfo,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {addTodoReducer} from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function AddTodo() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const listTodos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: isToday
        ? date.toISOString()
        : new Date(date).getTime() + 24 * 60 * 60 * 1000,
      isToday: isToday,
      isComplited: false,
    };
    try {
      await AsyncStorage.setItem(
        'Todos',
        JSON.stringify([...listTodos, newTodo]),
      );
      dispatch(addTodoReducer(newTodo));
      navigation.goBack();
      AccessibilityInfo.announceForAccessibility('Nueva tarea agregada');
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Task"
          placeholderTextColor="#00000030"
          onChangeText={text => {
            setName(text);
          }}
          accessibilityLabel="Task name input"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hour</Text>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.dateButton}
          accessibilityLabel="Agregar hora"
          accessibilityRole="button">
          <Text style={styles.dateText}>
            {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{width: '80%'}}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Today</Text>
        <Switch
          value={isToday}
          onValueChange={value => {
            setIsToday(value);
          }}
          accessibilityLabel="Activar tarea para hoy"
          accessibilityState={{checked: isToday}}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={addTodo}
        accessible={true}
        accessibilityLabel="Confirmar creacion de tarea"
        accessibilityRole="button">
        <Text style={{color: 'white'}}>Done</Text>
      </TouchableOpacity>
      <Text style={{color: '#00000040'}}>
        If you disable today, the task will be considered as tomorrow
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  textInput: {
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    width: '80%',
  },
  inputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 46,
    borderRadius: 11,
  },
});
