import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonFullInfo} from '../interfaces/PokemonInterfaces';

interface Props {
  pokemon: PokemonFullInfo;
}

export const PokemonInfo = ({pokemon}: Props) => {
  return (
    <ScrollView style={{...StyleSheet.absoluteFillObject}}>
      <View style={{...styles.viewContainer, marginTop: 390}}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.featureOptions}>
          {pokemon.types.map(({type}) => (
            <Text key={type.name} style={styles.regularText}>
              {type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} lbs</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSpritesImage}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSpritesImage}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSpritesImage}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSpritesImage}
          />
        </ScrollView>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.title}>Abilities</Text>
        <View style={styles.featureOptions}>
          {pokemon.abilities.map(({ability}) => (
            <Text key={ability.name} style={styles.regularText}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.title}>Moves</Text>
        <View style={styles.movesOptions}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={styles.regularText}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={styles.statViewContainer}>
                <Text style={{...styles.regularText, width: 150}}>
                {stat.stat.name}
                </Text>
                <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
                </Text>
            </View>
          ))}
        </View>
      </View>

        <View style={styles.finalViewContainer}>
            <FadeInImage 
                uri={pokemon.sprites.front_default}
                style={styles.basicSpritesImage}
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
    marginRight: 10,
  },
  basicSpritesImage: {
    width: 100,
    height: 100,
  },
  featureOptions: {
    flexDirection: 'row',
  },
  movesOptions: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  statViewContainer:{
    flexDirection: 'row',
  },
  finalViewContainer: {
      marginBottom: 20,
      alignItems: 'center',
  },
});
