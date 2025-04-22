import localFont from 'next/font/local';

// Define the Poppins font family with all needed weights
export const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/PoppinsRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PoppinsMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PoppinsSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PoppinsBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
});

// Export a function to get font class names
export function getFontClassName() {
  return poppins.className;
}