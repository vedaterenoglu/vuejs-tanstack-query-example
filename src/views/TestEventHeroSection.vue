<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-4">Testing EventHeroSection Component</h1>
    <p class="text-muted-foreground mb-8">
      Event: Austin Emerging Artists Showcase
    </p>

    <EventHeroSection :event="austinEvent" :formatted-price="formattedPrice" />

    <div class="mt-8 p-4 bg-muted rounded-lg">
      <h2 class="font-semibold mb-2">Event Data:</h2>
      <pre class="text-sm">{{ JSON.stringify(austinEvent, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventHeroSection from '@/components/event/organisms/EventHero.vue'
import { formatEventPrice } from '@/lib/utils/events'

// Austin Emerging Artists Showcase event data
const austinEvent = {
  id: 77,
  name: 'Austin Emerging Artists Showcase',
  slug: 'austin-emerging-artists-showcase',
  city: 'Austin',
  citySlug: 'austin',
  location: 'The Continental Club',
  date: '2029-01-25T19:00:00.000Z',
  organizerName: 'ATX Music Scene',
  imageUrl:
    'https://res.cloudinary.com/driebgbfe/image/upload/t_ve-temp/v1747235579/077-austin-emerging-artists-showcase_hpcdok.jpg',
  alt: 'Photo by Natalia Blauth on Unsplash',
  description:
    "Discover Austin's next wave of musical talent in an intimate showcase setting.",
  price: 45,
}

// Format the price
const formattedPrice = formatEventPrice(austinEvent.price)
</script>
