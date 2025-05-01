import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Origami Moving Cubes Drawing Designer',
    short_name: 'Origami Cubes',
    description: 'Origami Moving Cubes Drawing Designer by Han Lin (hotdogee [at] gmail [dot] com)',
    start_url: '/',
    scope: '/',
    display: 'fullscreen',
    orientation: 'any',
    background_color: '#1f2937',
    theme_color: '#1f2937',
    icons: [
      { src: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      {
        src: '/icons/maskable_icon_x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/maskable_icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
