/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export const MarvelMovies = ({data, title}) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{color: '#fff', fontSize: 20, margin: 10}}>{title}</Text>
                <Text style={{color: '#ffd700', marginTop: 15, marginRight: '8%'}}>See more</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('Detail', { poster_path: item.poster_path, title: item.title, description: item.overview })}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{width:150, height:200, borderRadius: 10}} />
                         <Text style={{ color: '#fff', fontSize: 12 }}>
                            {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{margin: 10}}
            />
        </>
    );
};
