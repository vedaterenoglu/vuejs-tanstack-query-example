<!--
/**
 * @file TestCardInfo.vue
 * @role Test card info molecule - displays test payment card details
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Test card display only)
 */
-->
<template>
  <div :class="['test-card-info', className]">
    <!-- Header with Icon -->
    <div class="flex items-start gap-3">
      <CreditCard
        :class="[
          'h-5 w-5 mt-0.5 flex-shrink-0',
          'text-green-600 dark:text-green-400',
          iconClass,
        ]"
      />
      
      <div class="w-full">
        <!-- Title -->
        <h3
          :class="[
            'font-semibold mb-3',
            'text-green-800 dark:text-green-200',
            titleClass,
          ]"
        >
          {{ title }}
        </h3>

        <!-- Card Details Box -->
        <div
          :class="[
            'bg-white dark:bg-gray-700 rounded border p-3',
            'font-mono text-sm',
            cardBoxClass,
          ]"
        >
          <!-- Card Details Grid -->
          <div class="grid grid-cols-2 gap-2">
            <!-- Card Number -->
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs">
                {{ cardNumberLabel }}
                <span v-if="showCopyHint" class="text-xs">({{ copyHintText }})</span>
              </span>
              <div
                :class="[
                  'font-bold cursor-pointer',
                  'text-green-700 dark:text-green-300',
                  'hover:bg-green-50 dark:hover:bg-green-900/20',
                  'p-1 rounded select-all',
                ]"
                :title="copyTooltip"
                @click="handleCopyCardNumber"
              >
                {{ formattedCardNumber }}
              </div>
            </div>

            <!-- Expiry -->
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs">
                {{ expiryLabel }}
              </span>
              <div class="font-bold text-green-700 dark:text-green-300">
                {{ expiryText }}
              </div>
            </div>

            <!-- CVC -->
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs">
                {{ cvcLabel }}
              </span>
              <div class="font-bold text-green-700 dark:text-green-300">
                {{ cvcText }}
              </div>
            </div>

            <!-- ZIP -->
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs">
                {{ zipLabel }}
              </span>
              <div class="font-bold text-green-700 dark:text-green-300">
                {{ zipText }}
              </div>
            </div>
          </div>

          <!-- Copy Hint -->
          <div
            v-if="showCopyHint"
            class="mt-2 text-xs text-gray-500 dark:text-gray-400 italic"
          >
            💡 {{ copyInstructionText }}
          </div>
        </div>

        <!-- Additional Instructions Slot -->
        <slot name="instructions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TestCardInfo Molecule Component
 *
 * Features:
 * - Displays test credit card details
 * - Click to copy card number
 * - Formatted card number display
 * - Dark mode compatible
 * - Customizable labels and text
 * - Instructions slot for additional info
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 * - SOLID: Single Responsibility (test card info display only)
 */
import { CreditCard } from 'lucide-vue-next'

interface TestCardInfoProps {
  /** Section title */
  title?: string
  /** Test card number */
  cardNumber?: string
  /** Card number label */
  cardNumberLabel?: string
  /** Expiry label */
  expiryLabel?: string
  /** Expiry text */
  expiryText?: string
  /** CVC label */
  cvcLabel?: string
  /** CVC text */
  cvcText?: string
  /** ZIP label */
  zipLabel?: string
  /** ZIP text */
  zipText?: string
  /** Show copy hint */
  showCopyHint?: boolean
  /** Copy hint text */
  copyHintText?: string
  /** Copy instruction text */
  copyInstructionText?: string
  /** Copy tooltip */
  copyTooltip?: string
  /** Additional CSS classes */
  className?: string
  /** Additional CSS classes for title */
  titleClass?: string
  /** Additional CSS classes for icon */
  iconClass?: string
  /** Additional CSS classes for card box */
  cardBoxClass?: string
}

const props = withDefaults(defineProps<TestCardInfoProps>(), {
  title: 'Use This Test Card',
  cardNumber: '4242424242424242',
  cardNumberLabel: 'Card Number',
  expiryLabel: 'Expiry',
  expiryText: 'Any future date',
  cvcLabel: 'CVC',
  cvcText: 'Any 3 digits',
  zipLabel: 'ZIP',
  zipText: 'Any 5 digits',
  showCopyHint: true,
  copyHintText: 'click to copy',
  copyInstructionText: 'Click the card number above to copy it to your clipboard',
  copyTooltip: 'Click to copy card number',
  className: '',
  titleClass: '',
  iconClass: '',
  cardBoxClass: '',
})

const emit = defineEmits<{
  'copy-success': []
  'copy-error': [error: Error]
}>()

/**
 * Format card number with spaces
 */
const formattedCardNumber = props.cardNumber.replace(/(.{4})/g, '$1 ').trim()

/**
 * Handle copy card number to clipboard
 */
const handleCopyCardNumber = async () => {
  try {
    await navigator.clipboard.writeText(props.cardNumber)
    emit('copy-success')
  } catch (error) {
    emit('copy-error', error as Error)
  }
}
</script>