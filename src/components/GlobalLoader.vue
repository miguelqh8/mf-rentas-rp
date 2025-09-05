<template>
  <BaseLoader
    v-if="loaderState.isVisible"
    :overlay="loaderState.overlay"
    :text="loaderState.text"
    :size="loaderState.size"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLoader } from '@/composables/useLoader';

export default defineComponent({
  name: 'GlobalLoader',
  setup() {
    const { loaderState } = useLoader();
    
    return {
      loaderState
    };
  }
});
</script>
