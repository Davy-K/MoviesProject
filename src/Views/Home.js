/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, StyleSheet,  FlatList } from 'react-native';
import { Movies } from './MoviesList';
import { fetchPopularMovies, fetchTrendingMovies } from '../Providers/callAPI';

export const PromoScreen = () => {
    return (
        <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                source={require('../assets/promo.png')}
                style={{width: '100%'}}
            />
            <Text style={{color: '#fff', fontSize: 20, margin: 10}}>Black Friday is here !</Text>
            <Text style={{color: '#fff', fontSize: 15, margin: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis pulvinar purus, eu luctus est.</Text>
            <TouchableOpacity style={styles.promoButton}>
                <Text style={{color: '#000', fontSize: 20}}>Check details</Text>
            </TouchableOpacity>
        </View>
    );
};
export const Item = ({title, category, setCategory}) => (
    <TouchableOpacity
      style={[
        styles.item,
        category === title && styles.activeItem,
      ]}
      onPress={() => setCategory(title)}>

      <Text style={[
        styles.title,
        category === title && styles.activeTitle,
      ]}>{title}</Text>
    </TouchableOpacity>
);

const HomeScreen = () => {
    const [category, setCategory] = useState('All');
    const DATA = ['All', 'Romance', 'Sport', 'Kids', 'Horror'];
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const getPopularMovies = async () => {
            setMovies(await fetchPopularMovies());
        };
        const getFavoriteMovies = async () => {
            setFavoriteMovies(await fetchTrendingMovies());
        };

        getPopularMovies();
        getFavoriteMovies();
   }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.heroContainer}>
                <Image
                    source={require('../assets/Movies/jurassic-world.jpg')}
                    style={styles.heroImage}
                />
                <View style={styles.navBarCategory} >
                    <FlatList
                        horizontal
                        data={DATA}
                        renderItem={({item}) => <Item title={item} category={category} setCategory={setCategory}/>}
                        keyExtractor={item => item}
                    />
                </View>
                <View style={styles.heroOverlay}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.wishlistButton}>
                            <Text style={{color: '#fff'}}>+ Wishlist</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={{color: '#000'}}>Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <Movies data={movies} title={'Popular Movies'}/>
                <Movies data={favoriteMovies} title={'Favorite Movies'}/>

                <PromoScreen />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    promoButton: {
        backgroundColor: '#F2C94C',
        borderRadius: 5,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    heroContainer: {
        height: 400,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    heroTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 80,
    },
    wishlistButton: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsButton: {
        backgroundColor: '#ffd700',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsButtonText: {
        fontWeight: 'bold',
    },
    navBarCategory: {
        width: '90%',
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 10,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    item: {
        minWidth: 50,
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 4,
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
      },
      activeItem: {
        color: 'black',
        backgroundColor: 'white',
      },
      activeTitle: {
        color: 'black',
        backgroundColor: 'white',
      },
});

export default HomeScreen;
