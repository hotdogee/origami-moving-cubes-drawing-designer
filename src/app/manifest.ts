import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Origami Moving Cubes Drawing Designer',
    short_name: 'Origami Cubes',
    description: 'Origami Moving Cubes Drawing Designer by Han Lin (hotdogee [at] gmail [dot] com)',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable_icon_x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/maskable_icon_x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
