import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Todo} from './Todo';


export function TodoList({todosData}) {
  return (
    <FlatList
      data={todosData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Todo {...item}/>}
    />
  );
}
