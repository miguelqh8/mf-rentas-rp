<template>
  <div class="base-layout">
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLayout",
});
</script>

<style lang="scss">
.base-layout {
  min-height: 100vh;
  background-color: var(--color-background);
}

.main-content {
  padding: var(--spacing-3xl) 0;
}
</style>
