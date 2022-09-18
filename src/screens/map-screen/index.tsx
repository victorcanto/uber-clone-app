import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Map } from '@components/map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigateCard } from '@components/navigate-card';
import { RideOptionsCard } from '@components/ride-options-card';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@navigation/types';

export const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={tw`bg-gray-100 absolute top-12 left-8 z-50 p-3 rounded-full`}>
        <Icon name='menu' tvParallaxProperties={undefined} />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};
