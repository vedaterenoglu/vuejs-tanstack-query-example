/**
 * @file lazyLoad.directive.ts
 * @role Lazy loading directive for images
 * @patterns Directive Pattern, Observer Pattern
 * @solid SRP (Lazy loading only), OCP (Extensible options)
 */

import type { DirectiveBinding, ObjectDirective } from 'vue'

/**
 * Lazy load options
 */
export interface LazyLoadOptions {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number | number[]
  placeholder?: string
  errorImage?: string
  loading?: 'lazy' | 'eager' | 'auto'
}

/**
 * Extended HTMLImageElement with lazy load binding
 */
interface LazyLoadElement extends HTMLImageElement {
  __lazyLoadBinding?: DirectiveBinding<string | LazyLoadOptions>
}

/**
 * Default placeholder image
 */
const DEFAULT_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3C/svg%3E'

/**
 * Default error image
 */
const DEFAULT_ERROR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23fee2e2"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23dc2626"%3EError%3C/text%3E%3C/svg%3E'

/**
 * Intersection observer instance
 */
let observer: IntersectionObserver | null = null

/**
 * Image load handler
 */
const loadImage = (el: HTMLImageElement, binding: DirectiveBinding<string | LazyLoadOptions>) => {
  const options = typeof binding.value === 'string' 
    ? { placeholder: DEFAULT_PLACEHOLDER } 
    : binding.value || {}

  const src = typeof binding.value === 'string' ? binding.value : el.dataset.src

  if (!src) return

  // Create new image to preload
  const img = new Image()
  
  img.onload = () => {
    el.src = src
    el.classList.add('lazy-loaded')
    el.classList.remove('lazy-loading')
  }

  img.onerror = () => {
    el.src = options.errorImage || DEFAULT_ERROR
    el.classList.add('lazy-error')
    el.classList.remove('lazy-loading')
  }

  el.classList.add('lazy-loading')
  img.src = src
}

/**
 * Create intersection observer
 */
const createObserver = (options: LazyLoadOptions = {}) => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as LazyLoadElement
        const binding = el.__lazyLoadBinding
        if (binding) {
          loadImage(el, binding)
          observer?.unobserve(el)
        }
      }
    })
  }, {
    root: options.root || null,
    rootMargin: options.rootMargin || '50px',
    threshold: options.threshold || 0.01,
  })
}

/**
 * Lazy load directive
 */
export const vLazyLoad: ObjectDirective<LazyLoadElement, string | LazyLoadOptions> = {
  mounted(el, binding) {
    // Store binding for later use
    el.__lazyLoadBinding = binding

    const options = typeof binding.value === 'string' 
      ? {} 
      : binding.value || {}

    // Set placeholder
    if (!el.src) {
      el.src = options.placeholder || DEFAULT_PLACEHOLDER
    }

    // Native lazy loading support
    if ('loading' in HTMLImageElement.prototype && options.loading !== 'eager') {
      el.loading = 'lazy'
      const src = typeof binding.value === 'string' ? binding.value : el.dataset.src
      if (src) {
        el.src = src
      }
      return
    }

    // Fallback to Intersection Observer
    if (!observer) {
      observer = createObserver(options)
    }

    observer.observe(el)
  },

  updated(el, binding) {
    // Update binding reference
    el.__lazyLoadBinding = binding
  },

  unmounted(el) {
    observer?.unobserve(el)
    delete el.__lazyLoadBinding
  },
}

/**
 * Export directive for registration
 */
export default vLazyLoad