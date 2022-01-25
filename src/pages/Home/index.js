import React, {useState} from "react";
import { View, Text, StyleSheet, Alert, Button, ScrollView, Image, } from "react-native";


const pokemonIniciais = [
    {id: 1, nome: "Bulbasauro"},
    {id: 4, nome: "Charmander"},
    {id: 7, nome: "Squirtle"}  
];

function PokeHome() {

    const [ Meupokemon, setMeuPokemon ] = useState(null);

    const getPokemonData = (idPokemon) => {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

         fetch(endpoint)
            .then(resposta => resposta.json())
                .then ( json => {
                    const pokemon = {
                        nome: json.name,
                        img: json.sprites.other["official-artwork"].front_default,
                        peso: json.weight,
                    };
                    console.log('Poke', pokemon)

                    setMeuPokemon(pokemon)
                })
                .catch( () => {
                    Alert.alert('Erro', 'Não foi carregar o poke!');
            });
    }

    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerTop}> Meus Pokémons! </Text>
            </View>

            {Meupokemon != null && (
                <View style={styles.pokemonBox}>
                    <Text style={styles.pokemonNome}> Nome: {Meupokemon.nome} </Text>
                    <Text style={styles.pokemonPeso}> Peso: {Meupokemon.peso} </Text>
                    <Image resizeMode='stretch' source={{uri:Meupokemon.img}} style={styles.pokemonImg}></Image>
                </View>
            )}
            <ScrollView>    
                {pokemonIniciais.map( pokemon => (
                    <View key={pokemon.id} style={styles.cardContainer}>
                        <Text style={styles.cardTitle}> {pokemon.nome} </Text>
                        <Button title="Dados do Pokémon" onPress={() => getPokemonData(pokemon.id)}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default PokeHome; 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 80,
        marginBottom: 20,
        backgroundColor: '#e73e33',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTop: {
        fontSize: 22,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center', 
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: '#d5d5d5',
        borderRadius: 4,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 10
    },
    cardTitle: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
        color: '#656565'
    },
    pokemonBox: {
        alignItems: 'center',
        marginBottom: 10,
    },
    pokemonNome: {
        fontSize: 22
    },
    pokemonPeso: {
        fontSize: 18
    },
    pokemonImg: {
        width: 150,
        height: 150,
    }
})
