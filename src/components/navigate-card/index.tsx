import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useAppDispatch } from '@store/hooks';
import { selectDestination, setDestination } from '@store/nav/nav.slice';
import { useNavigation } from '@react-navigation/native';
import { CardNavigationProp } from '@navigation/types';
import { NavFavourites } from '@components/nav-favourites';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

export const NavigateCard = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CardNavigationProp>();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Sonny</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where?'
            styles={toInputBoxStyles}
            fetchDetails={true}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'pt-BR',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          onPress={() => navigation.navigate('RideOptionsCard')}>
          <Icon
            name='car'
            type='font-awesome'
            color='white'
            size={16}
            tvParallaxProperties={undefined}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}>
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
            tvParallaxProperties={undefined}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
});
