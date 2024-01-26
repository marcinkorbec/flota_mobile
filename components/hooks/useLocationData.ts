import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { isoCurrencyMap } from '../utils/isoCurrencyMap';

export const useLocationData = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [currency, setCurrency] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Brak uprawnień do odczytu lokalizacji');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if (location) {
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                console.log(reverseGeocode);
                if (reverseGeocode.length > 0 && reverseGeocode[0].country) {
                    setCountry(reverseGeocode[0].country);
                } else {
                    console.log('Nie udało się uzyskać danych kraju.');
                }
            }

            if (location) {
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                if (reverseGeocode.length > 0 && reverseGeocode[0].isoCountryCode) {
                    const isoCountryCode = reverseGeocode[0].isoCountryCode;
                    setCountry(reverseGeocode[0].country || 'default');
                    const currency = isoCurrencyMap[isoCountryCode];
                    if (currency) {
                        setCurrency(currency);
                    }
                }
            }
        })();
    }, []);

    return { location, country, currency };
};