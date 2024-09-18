import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {TodoList} from '../components/TodoList';
import {todosData} from '../data/todos';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hideComplitedReducer, setTodosReducer} from '../redux/todosSlice';

function Home(): React.JSX.Element {
  const todos = useSelector(state => state.todos.todos);
  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('Todos');
        if (todos !== null) {
          dispatch(setTodosReducer(JSON.parse(todos)));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTodos();
  }, []);

  const handleHidePress = async () => {
    if (isHidden) {
      setIsHidden(false);
      const todos = await AsyncStorage.getItem('Todos');
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(true);
    dispatch(hideComplitedReducer());
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg',
        }}
        style={styles.pic}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={{color: '#3478f6'}}>
            {isHidden ? 'Show Completed' : 'Hide Completed'}
          </Text>
        </TouchableOpacity>
      </View>

      <TodoList todosData={todos.filter(todo => todo.isToday)} />

      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todosData={todos.filter(todo => !todo.isToday)} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 15,
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 50,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: '#fff',
    position: 'absolute',
    top: -9,
    left: 9,
  },
});

export default Home;
