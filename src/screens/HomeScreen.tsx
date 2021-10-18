import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPagination} from '../hooks/usePokemonPagination';
import {styles} from '../theme/AppTheme';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons, isLoading} = usePokemonPagination();

  return (
    <SafeAreaView>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaImg}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          numColumns={2}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color={'blue'} />
          }
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10
              }}>
              Pokedex
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
