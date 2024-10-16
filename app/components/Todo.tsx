import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from './Checkbox';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTodoReducer} from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Todo({id, text, isCompleted, isToday, hour}) {
  const [thisTodoIsToday, setThisTodoIsToday] = hour
    ? useState(moment(new Date(hour)).isSame(moment(), 'day'))
    : useState(false);
  const [localHour, setLocalHour] = useState(new Date(hour));
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        'Todos',
        JSON.stringify(todos.filter(todo => todo.id !== id)),
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={thisTodoIsToday}
          hour={hour}
        />
        <View>
          <Text
            style={
              isCompleted
                ? [
                    styles.text,
                    {textDecorationLine: 'line-through', color: '#73737330'},
                  ]
                : styles.text
            }>
            {text}
          </Text>
          <Text
            style={
              isCompleted
                ? [
                    styles.time,
                    {textDecorationLine: 'line-through', color: '#73737330'},
                  ]
                : styles.time
            }>
            {moment(localHour).format('LT')}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleDeleteTodo}
        accessibilityLabel="Eliminar tarea"
        accessibilityRole="button">
        <Icon name="trash-outline" size={24} color={'black'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737373',
  },
  time: {
    fontSize: 15,
    color: '#a3a3a3',
    fontWeight: '500',
  },
});
