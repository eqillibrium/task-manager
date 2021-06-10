<template>
  <h3 class="text-white center">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup () {
    const id = useRoute().path
    return {
      id
    }
  }
}
</script>

<style scoped>

</style>