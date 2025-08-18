/**
 * @file cities.ts
 * @role Mock cities data for development
 * @patterns Mock Data Pattern
 * @solid SRP (Mock data only)
 */

import type { City } from '@/lib/types'

export const mockCities: City[] = [
  {
    city: 'Albuquerque',
    citySlug: 'albuquerque',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374557/Albuquerque-512_tt6ghx.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Arlington',
    citySlug: 'arlington',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374556/Arlington-512_bkpkpg.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Atlanta',
    citySlug: 'atlanta',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374556/Atlanta-512_cqpt6t.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Austin',
    citySlug: 'austin',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374557/Austin-512_qmblfl.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Baltimore',
    citySlug: 'baltimore',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374558/Baltimore-512_groado.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Boston',
    citySlug: 'boston',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374557/Boston-512_dqsscx.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Charlotte',
    citySlug: 'charlotte',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374558/Charlotte-512_dis7jp.jpg',
    alt: 'This image is created by Gemini AI',
  },
  {
    city: 'Chicago',
    citySlug: 'chicago',
    url: 'https://res.cloudinary.com/driebgbfe/image/upload/v1751374558/Chicago-512_n9sdmi.jpg',
    alt: 'This image is created by Gemini AI',
  },
]