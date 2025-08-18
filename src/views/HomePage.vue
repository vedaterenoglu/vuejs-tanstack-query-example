<!--
/**
 * @file HomePage.vue
 * @role Home page view component
 * @atomic template
 * @patterns Container Pattern, Template Pattern
 * @solid SRP (Home page display only)
 * @ssot Router for navigation state
 */
-->
<template>
  <Layout>
    <div class="min-h-screen bg-background">
      <!-- Main Container with proper constraints matching React -->
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <header class="mb-6">
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold mb-2">Find Local Events</h1>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              Select your city and discover exciting events happening near you
            </p>
            
            <!-- View All Events Button -->
            <div class="flex justify-center pt-2">
              <Button
                @click="handleGetAllEvents"
                variant="outline"
                size="lg"
                class="group transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <Calendar class="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                View All Events
                <span class="ml-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Button>
            </div>
          </div>
        </header>
        
        <!-- Search Section with Error Boundary -->
        <ErrorBoundary
          fallback-title="Search unavailable"
          fallback-message="The search feature is temporarily unavailable. Please try refreshing the page."
          :show-reset="true"
        >
          <SearchSection
            :on-refresh="handleRefresh"
            placeholder="Search for your city..."
            :debounce-ms="300"
            :auto-focus="false"
            :show-refresh-button="true"
            :search-query="searchQuery"
            :on-search-change="setSearchQuery"
          />
        </ErrorBoundary>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-500">
          <p>Failed to load cities. Please try again.</p>
          <button @click="() => refetch()" class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
            Retry
          </button>
        </div>
        
        <!-- Cities Grid with Error Boundary -->
        <ErrorBoundary
          v-else-if="cities"
          fallback-title="Unable to display cities"
          fallback-message="There was an error loading the city grid. Please refresh the page."
          :show-reset="true"
        >
          <CityGrid 
            :cities="filteredCities"
            :is-search-active="!!searchQuery"
            :search-query="searchQuery"
            :filtered-count="filteredCities.length"
          />
        </ErrorBoundary>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * HomePage - City selection landing page with search
 * 
 * Displays searchable cities grid with navigation to city-specific events.
 * Matches React HomePage with header, search, and filtering functionality.
 * 
 * Design Patterns:
 * - Container Pattern: Orchestrates data fetching and UI state
 * - Composition Pattern: Header + Search + Cities Grid
 * - Facade Pattern: Uses composable to simplify data access
 */
import { Calendar } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { ErrorBoundary } from '@/components/boundaries'
import { CityGrid } from '@/components/cities'
import Layout from '@/components/layout/Layout.vue'
import { SearchSection } from '@/components/sections'
import { Button } from '@/components/ui/button'
import { useCities } from '@/composables/useCities'

// Router for navigation
const router = useRouter()

// Fetch cities data using TanStack Query
const { data: cities, isLoading, error, refetch } = useCities()

// Search state management
const searchQuery = ref('')

// Filter cities based on search query
const filteredCities = computed(() => {
  if (!cities.value) return []
  if (!searchQuery.value.trim()) return cities.value
  
  const query = searchQuery.value.toLowerCase()
  return cities.value.filter(city =>
    city.city?.toLowerCase().includes(query) ||
    city.citySlug?.toLowerCase().includes(query) ||
    city.alt?.toLowerCase().includes(query)
  )
})

// Event handlers
const handleGetAllEvents = () => {
  void router.push('/events')
}

const handleRefresh = () => {
  searchQuery.value = '' // Clear search first
  void refetch() // Then refresh cities data
}

const setSearchQuery = (value: string) => {
  searchQuery.value = value
}
</script>
