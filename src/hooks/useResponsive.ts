import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

/**
 * Custom hook untuk menghitung layout responsif berdasarkan dimensi layar.
 * Menggunakan useMemo agar perhitungan tidak dilakukan ulang setiap render
 * kecuali dimensi layar berubah.
 */
export const useResponsive = () => {
    const { width, height } = useWindowDimensions();

    return useMemo(() => {
        const isSmallDevice = width < 375;
        const isMediumDevice = width >= 375 && width < 768; // Tablet portrait / Large phone
        const isLargeDevice = width >= 768; // Tablet landscape / Desktop

        // Base padding & margin logic
        const baseSpacing = isSmallDevice ? 16 : 24;

        return {
            width,
            height,
            isSmallDevice,
            isMediumDevice,
            isLargeDevice,
            spacing: {
                xs: baseSpacing / 4,
                sm: baseSpacing / 2,
                md: baseSpacing,
                lg: baseSpacing * 1.5,
                xl: baseSpacing * 2,
            },
            fontSize: {
                xs: isSmallDevice ? 10 : 12,
                sm: isSmallDevice ? 12 : 14,
                md: isSmallDevice ? 14 : 16,
                lg: isSmallDevice ? 18 : 20,
                xl: isSmallDevice ? 24 : 32,
                xxl: isSmallDevice ? 32 : 40,
            },
            iconSize: {
                sm: isSmallDevice ? 16 : 20,
                md: isSmallDevice ? 24 : 28,
                lg: isSmallDevice ? 32 : 40,
            }
        };
    }, [width, height]);
};
