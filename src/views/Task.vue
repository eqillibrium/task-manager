<template>
  <div class="card">
    <h2 @click="show">{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button
          class="btn"
          @click="changeStatus('pending')"
      >Взять в работу
      </button>
      <button
          class="btn primary"
          @click="changeStatus('done')"
      >Завершить
      </button>
      <button
          class="btn danger"
          @click="changeStatus('cancelled')"
      >Отменить
      </button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: { AppStatus },
  setup () {
    const route = useRoute()
    const store = useStore()
    const taskId = route.params.id
    const task = computed(() => store.getters.allTasks.find(el => el.id === taskId))
    async function changeStatus (newStatus) {
      task.value.status = newStatus
      await store.dispatch('changeStatus', task )
    }

    return {
      task,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>