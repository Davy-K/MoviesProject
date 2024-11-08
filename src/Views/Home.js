/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {
  fecthTrendingMovies,
  fetchBestMovies,
  fetchMarvelMovies,
} from '../Providers/callAPI';
import LinearGradient from 'react-native-linear-gradient';
import { MarvelMovies } from './MovieList/MarvelMovies';
import { BestMovies } from './MovieList/BestMovies';

const {width} = Dimensions.get('window');

export const PromoScreen = () => {
  return (
    <View style={{margin: 6, marginRight: '8%'}}>
      <Image source={require('../assets/promo.png')} style={{width: '100%'}} />
      <Text style={{color: '#fff', fontSize: 20, marginTop: 10}}>
        Black Friday is here!
      </Text>
      <Text style={{color: 'gray', fontSize: 15, marginTop: 10, marginBottom: 15}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis
        pulvinar purus, eu luctus est.
      </Text>
      <TouchableOpacity style={styles.promoButton}>
        <Text style={{color: '#000', fontSize: 20}}>Check details</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Item = ({title, value, category, setCategory}) => (
  <TouchableOpacity
    style={[styles.item, category.label === title && styles.activeItem]}
    onPress={() => setCategory({label: title, value})}>
    <Text
      style={[styles.title, category.label === title && styles.activeTitle]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const DATA = [
  {label: 'All', value: 0},
  {label: 'Action', value: 28},
  {label: 'Romance', value: 10749},
  {label: 'Comedy', value: 35},
  {label: 'Horror', value: 27},
  {label: 'Family', value: 10751},
];
const gradientColorLigth = {
  gradientColor: 'rgba(255, 255, 255, 1)',
  gradientColor2: 'rgba(255, 255, 255, 0)',
};

const gradientColorDark = {
  gradientColor: 'rgba(0, 0, 0, 1)',
  gradientColor2: 'rgba(0, 0, 0, 0)',
};

export const gradientColor = isDarkMode => {
  return isDarkMode ? gradientColorDark : gradientColorLigth;
};

const HomeScreen = () => {
  const [category, setCategory] = useState(DATA[0]);
  const [bestMovies, setBestMovies] = useState([]);
  const [bestMoviesFiltered, setBestMoviesFiltered] = useState([]);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [marvelMoviesFiltered, setMarvelMoviesFiltered] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);
  const colorScheme = useColorScheme(); // Returns 'light' or 'dark'

  const onChangeCategory = item => {
    let newBestMovies = bestMovies;
    let newMarvelMovies = marvelMovies;
    if (item.label !== 'All') {
      newBestMovies = bestMovies.filter(movie =>
        movie.genre_ids.includes(item.value),
      );
      newMarvelMovies = marvelMovies.filter(movie =>
        movie.genre_ids.includes(item.value),
      );
    }
    setBestMoviesFiltered(newBestMovies);
    setMarvelMoviesFiltered(newMarvelMovies);
    setCategory(item);
  };

  useEffect(() => {
    const getMovies = async () => {
      setBestMovies(await fetchBestMovies());
      setMarvelMovies(await fetchMarvelMovies());
      setTrendingMovies(await fecthTrendingMovies());
    };

    getMovies();
  }, []);


  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (trendingMovies.length > 0) {
        const nextIndex = currentIndex === trendingMovies.length - 1 ? 0 : currentIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentIndex, trendingMovies.length]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <FlatList
          ref={flatListRef}
          data={trendingMovies}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          renderItem={({item}) => (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}`,
              }}
              style={styles.heroImage}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <LinearGradient
          colors={[
            gradientColor(colorScheme).gradientColor,
            gradientColor(colorScheme).gradientColor2,
          ]}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={[styles.containerBottom, styles.absolute, {bottom: 0}]}
        />
        <View style={styles.navBarCategory}>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <Item
                title={item.label}
                value={item.value}
                category={category}
                setCategory={newItem => onChangeCategory(newItem)}
              />
            )}
            keyExtractor={item => item.value.toString()}
          />
        </View>
        <View style={styles.dotContainer}>
          {trendingMovies.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <View style={styles.heroOverlay}>
          <View
            style={{
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 40,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 16}}>My list</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 16}}>Discover</Text>
            </TouchableOpacity>
          </View>
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
      <View style={{marginLeft: '5%'}}>
        <MarvelMovies
          data={category.label === 'All' ? marvelMovies : marvelMoviesFiltered}
          title={'Marvel Movies'}
        />
        <BestMovies
          data={category.label === 'All' ? bestMovies : bestMoviesFiltered}
          title={'Best Movies'}
        />
        <PromoScreen  />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  containerBottom: {
    width: '110%',
    height: '90%',
  },
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
    width,
    height: '100%',
    resizeMode: 'cover',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#ffd700',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginLeft: '5%',
    marginRight: '5%',
  },
  wishlistButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarCategory: {
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    backgroundColor : '#42423FCC',
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
    backgroundColor: 'white',
  },
  activeTitle: {
    color: 'black',
  },
});

export default HomeScreen;
