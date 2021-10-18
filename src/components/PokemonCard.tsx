import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useNavigation} from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColorimage, setBgColorimage] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(colors => {
      if (!isMounted.current) return;
      colors.platform === 'android'
        ? setBgColorimage(colors.dominant || 'grey')
        : setBgColorimage(colors.background || 'grey');
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColorimage})
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColorimage,
        }}>
        <View>
          <Text style={styles.textName}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaImageView}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.imagePokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    left: 10,
    top: 20,
  },
  imagePokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  pokebolaImageView: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokemonImage: {
    width: 90,
    height: 90,
    right: -8,
    position: 'absolute',
    bottom: -5,
  },
});
