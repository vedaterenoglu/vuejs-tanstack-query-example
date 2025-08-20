/**
 * @file useKeyboardNavigation.ts
 * @role Keyboard navigation composable for accessibility
 * @patterns Composition API, Command Pattern
 * @solid SRP (Keyboard handling only), OCP (Extensible shortcuts)
 */

import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  handler: (event: KeyboardEvent) => void
  description?: string
}

/**
 * Keyboard navigation options
 */
export interface UseKeyboardNavigationOptions {
  shortcuts?: KeyboardShortcut[]
  enableGrid?: boolean
  containerRef?: Ref<HTMLElement | null>
  preventDefault?: boolean
}

/**
 * Keyboard navigation return interface
 */
export interface UseKeyboardNavigationReturn {
  registerShortcut: (shortcut: KeyboardShortcut) => void
  unregisterShortcut: (key: string) => void
  getShortcuts: () => KeyboardShortcut[]
  enableNavigation: () => void
  disableNavigation: () => void
}

/**
 * Composable for keyboard navigation
 * 
 * Features:
 * - Custom keyboard shortcuts
 * - Grid navigation support
 * - Modifier key support
 * - Dynamic shortcut registration
 * 
 * @param options - Configuration options
 * @returns Keyboard navigation utilities
 */
export function useKeyboardNavigation(
  options: UseKeyboardNavigationOptions = {}
): UseKeyboardNavigationReturn {
  const {
    shortcuts: initialShortcuts = [],
    enableGrid = false,
    containerRef,
    preventDefault = true,
  } = options

  const shortcuts = new Map<string, KeyboardShortcut>()
  let isEnabled = true

  // Initialize shortcuts
  initialShortcuts.forEach(shortcut => {
    shortcuts.set(getShortcutKey(shortcut), shortcut)
  })

  // Get shortcut key identifier
  function getShortcutKey(shortcut: KeyboardShortcut): string {
    const modifiers = []
    if (shortcut.ctrl) modifiers.push('ctrl')
    if (shortcut.shift) modifiers.push('shift')
    if (shortcut.alt) modifiers.push('alt')
    if (shortcut.meta) modifiers.push('meta')
    modifiers.push(shortcut.key.toLowerCase())
    return modifiers.join('+')
  }

  // Check if event matches shortcut
  function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
    return (
      event.key.toLowerCase() === shortcut.key.toLowerCase() &&
      !!event.ctrlKey === !!shortcut.ctrl &&
      !!event.shiftKey === !!shortcut.shift &&
      !!event.altKey === !!shortcut.alt &&
      !!event.metaKey === !!shortcut.meta
    )
  }

  // Handle keyboard event
  function handleKeydown(event: KeyboardEvent) {
    if (!isEnabled) return

    // Check if event target is inside container (if specified)
    if (containerRef?.value && !containerRef.value.contains(event.target as Node)) {
      return
    }

    // Check shortcuts
    for (const shortcut of shortcuts.values()) {
      if (matchesShortcut(event, shortcut)) {
        if (preventDefault) {
          event.preventDefault()
          event.stopPropagation()
        }
        shortcut.handler(event)
        return
      }
    }
  }

  // Register new shortcut
  function registerShortcut(shortcut: KeyboardShortcut) {
    shortcuts.set(getShortcutKey(shortcut), shortcut)
  }

  // Unregister shortcut
  function unregisterShortcut(key: string) {
    shortcuts.delete(key)
  }

  // Get all shortcuts
  function getShortcuts(): KeyboardShortcut[] {
    return Array.from(shortcuts.values())
  }

  // Enable navigation
  function enableNavigation() {
    isEnabled = true
  }

  // Disable navigation
  function disableNavigation() {
    isEnabled = false
  }

  // Lifecycle
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    registerShortcut,
    unregisterShortcut,
    getShortcuts,
    enableNavigation,
    disableNavigation,
  }
}