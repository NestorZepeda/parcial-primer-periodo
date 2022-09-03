import React, {useState} from "react";
import {StyleSheet, Text, View, FlatList,TouchableOpacity, Image } from "react-native";
import {SearchBar} from "react-native-elements";
import Constants from 'expo-constants';

const HomeScreen = ({navigation}) =>{
    const [lista, setLista]= useState([]);
    const [pelicula,setPelicula]= useState("");
    const [total, setTotal]=useState(0);
    const [consultado, setConsultado]=useState(false);

    const buscar=(peli)=>
    {
        setConsultado(true);
        const api_url =`http://www.omdbapi.com/?s=${peli}&apikey=759d2167`;

        fetch(api_url)
        .then(data => {
                return data.json();
            })
        .then(resultado => {
                  //  console.log(resultado)
                    const {Search = []}= resultado;

                    setLista(Search);
                    setTotal(Search.length)
                });

    };
    const renderItem =({item})=>(
        <TouchableOpacity
        onPress={()=> navigation.navigate('DetailScreen',{movie:item})}
        >
            
            {
                item.Poster==="N/A"
                ?
                <Image
                    style={styles.images}
                    source={require('../../assets/images/palomitasdemaiz.png')}
                />
                :
                <Image
                    style={styles.images}
                    source={{uri:item.Poster}}
                />
            }
        </TouchableOpacity>
    )
    return(
       <View style={styles.container}>
            <Text style={styles.texto}>Buscardor de peliculas</Text>
            <SearchBar
                round
                containerStyle={{
                    backgroundColor:'transparent',
                    borderTopwidth: 0,
                    borderBottomWidth:0,
                }}
                inputStyle={{backgroundColor:'white'}}
                onChangeText={(texto)=>{
                    setPelicula(texto);
                    buscar(texto);
                }}
                onClear={()=>{
                    setPelicula("");
                    setConsultado(false);
                    setLista([])
                }}
                value={pelicula}
                placeholder="Escribe aqui..."
            
            />
            <View style={{margin:10, fontSize:20}}>
                {
                    
                    consultado
                    ?
                    <Text style={styles.texto}>
                        Hay {total} resultados
                    </Text>
                    :
                    <Text style={styles.texto}>
                        Realiza una busqueda
                    </Text>


                }
                
                
            </View>

            <FlatList
                contentContainerStyle={{alignItems:"center"}}
                data={lista}
                numColumns={3}
                keyExtractor={item => item.imdbID}
                renderItem={renderItem}
            />
       </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            justifyContent: 'flex-start',
            backgroundColor: '#4c4949',
        },
        images:{
            width: 100,
            height: 150,
            margin: 5,
        },
        texto:{
            color: '#F1E9D2',
            textAlign: 'center',
            fontSize: 20,
            margin: 10,
            fontWeight: 'bold',
        }
    });