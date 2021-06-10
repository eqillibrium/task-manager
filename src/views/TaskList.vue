<template>
    <div v-if="!isTaskExists">
      <h1 class="text-white center">Задач пока нет</h1>
    </div>
    <div v-else>
      <h3 class="text-white">Всего активных задач: {{ activeTasks.length }}, в сортировке: {{ sortedTasks.length }} </h3>
      <div class="form-control card">
        <label for="sortedTasks">Отсортировать по статусу:</label>
        <select name="sortedTasks" id="sortedTasks" v-model="sortCondition">
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="done">Завершенные</option>
          <option value="cancelled">Отмененные</option>
          <option value="pending">В работе</option>
        </select>
      </div>
      <div v-for="task in sortedTasks" :key="task.id">
        <TaskListElement :task="task"></TaskListElement>
      </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'
import TaskListElement from '../components/TaskListElement'
export default {
  setup () {
    const store = useStore()
    let tasks = ref([])
    onMounted(async () => {
      await store.dispatch('getTasks')
      tasks.value = store.getters.allTasks
    })
    const sortCondition = ref('all')
    const activeTasks = computed(() => store.getters.activeTasks)
    const isTaskExists = computed(() => store.getters.allTasks.length !== 0)
    const sortedTasks = computed(() => {
      if(sortCondition.value === 'all') {
        return store.getters.allTasks
      }
      return store.getters.allTasks.filter( el => el.status === sortCondition.value)
    })
    return {
      tasks,
      activeTasks,
      isTaskExists,
      sortedTasks,
      sortCondition
    }
  },
  components: {
    TaskListElement
  }
}
</script>
