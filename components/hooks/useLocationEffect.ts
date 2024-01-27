import { useEffect } from 'react';

interface Location {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export const useCustomEffect = <T extends object>(
    setData: React.Dispatch<React.SetStateAction<T>>,
    location: Location | null,
    country: string | null,
    currency: string | undefined,
    photo: string | undefined
) => {
    const handleInputChange = (name: keyof T, value: string) => {
        setData((prevState: T) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setData((prevState: T) => ({
            ...prevState,
            date: today as keyof T & string,
            country: country as keyof T & string || prevState['country'],
            currency: currency as keyof T & string || prevState['currency'],
        }));

        if (location) {
            const coordinates = `${location.coords.latitude}, ${location.coords.longitude}`;
            handleInputChange('coordinates' as keyof T, coordinates);
        }
    }, [setData, location, country, currency]);

    useEffect(() => {
        if (photo !== undefined) {
            setData((prevState: T) => ({
                ...prevState,
                photo: photo as keyof T & string
            }));
        }
    }, [setData, photo]);

    return handleInputChange;
};
