<template>
<!--  <div v-for="task in tasks" :key="task.id">-->
    <div class="card">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date}}
          </small>
          <small>
            id: {{ task.id}}
          </small>
        </strong>
      </p>
      <div class="inline">
        <router-link :to="`/task/${task.id}`">
          <button class="btn primary">Посмотреть</button>
        </router-link>
        <button
            class="btn danger"
            @click="deleteTask"
        >Удалить
        </button>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
import AppStatus from './AppStatus'
import { useStore } from 'vuex'
export default {
  props: {
    task: {
      type: Object
    }
  },
  components: {
    AppStatus
  },
  setup (props) {
    const store = useStore()
    async function deleteTask () {
      await store.dispatch('deleteTask', props.task.id)
    }
    return {
      deleteTask
    }
  }
}
</script>