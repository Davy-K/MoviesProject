/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';

export const Movies = ({data, title}) => {
    const navigation = useNavigation();

    return (
        <>
            <Text style={{color: '#fff', fontSize: 20, margin: 10}}>{title}</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{marginRight: 10, alignItems: 'center'}} onPress={() => navigation.navigate('Detail', { poster_path: item.poster_path, title: item.title, description: item.overview })}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{width:150, height:200, borderRadius: 10}} />
                        <Text style={{color: '#fff', fontSize: 12}}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{margin: 10}}
            />
        </>
    );
};
