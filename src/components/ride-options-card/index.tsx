import { CardNavigationProp } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@store/hooks';
import { selectTravelTimeInformation } from '@store/nav/nav.slice';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export interface RideOptionItem {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}

const data: RideOptionItem[] = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber Lux',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE = 1.5;

export const RideOptionsCard = () => {
  const navigation = useNavigation<CardNavigationProp>();
  const [selected, setSelected] = useState<RideOptionItem | null>(null);
  const travelTimeInformation = useAppSelector(selectTravelTimeInformation);

  const travelTimeInfoDistanceText = travelTimeInformation?.distance.text;
  const travelTimeInfoDurationText = travelTimeInformation?.duration.text;
  const travelTimeInfoDurationValue = travelTimeInformation?.duration.value;

  const calculatePrice = (values: number[]): number => {
    return values.reduce((acc, cur) => acc * cur, 1) / 100;
  };

  const convertPriceForReal = (number: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon
            name='chevron-left'
            type='font-awesome'
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInfoDistanceText}
        </Text>
      </View>

      <FlatList
        style={tw`h-3`}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, image, multiplier, title }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id ? 'bg-gray-200' : ''
            }`}>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInfoDurationText} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {travelTimeInfoDurationValue &&
                convertPriceForReal(
                  calculatePrice([
                    travelTimeInfoDurationValue,
                    SURGE_CHARGE_RATE,
                    multiplier,
                  ])
                )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected ? 'bg-gray-300' : ''}`}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
