import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import { PokemonInfo } from './PokemonInfo';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.viewContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.buttonBackArrow, top: top + 5}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={'#FFF'} size={35} />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'}#{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebolaImage}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {
        isLoading 
          ? <View style={styles.activityIndicator}>
              <ActivityIndicator color={color} size={50} />
            </View> 
          :
            <PokemonInfo pokemon={pokemon}/>
      }
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  viewContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  buttonBackArrow: {
    position: 'absolute',
    left: 10,
  },
  pokemonName: {
    color: '#FFF',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebolaImage: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
