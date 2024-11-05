import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Image,  StyleSheet, TouchableOpacity } from 'react-native';

const DetailScreen = ({route, navigation}) => {
    const {poster_path, title, description} = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                style={styles.image}
            />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 1,
    },
    container: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        color: 'white',
    },
});
