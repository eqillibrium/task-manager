<template>
  <form class="card" @submit.prevent="create">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="newTask.title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="newTask.date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="newTask.description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isTextValid || !isDateExists">Создать</button>
  </form>
</template>

<script>
import {reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const newTask = reactive({
      title: '',
      date: '',
      description: '',
      status: 'active'
    })
    const isTextValid = computed(() => newTask.title.length && newTask.description.length >= 4 )
    const isDateValid = computed(() => {
      let dateOfTask = new Date(newTask.date).toLocaleDateString()
      let currentDate = new Date().toLocaleDateString()
      return dateOfTask >= currentDate
    })
    const isDateExists = computed(() => newTask.date !== '')
    function create () {
      if (isDateValid.value) {
        store.dispatch('createTask', newTask)
        router.push('/')
      } else {
        newTask.status = 'done'
        store.dispatch('createTask', newTask)
        router.push('/')
      }
    }
    return {
      newTask,
      isTextValid,
      isDateValid,
      isDateExists,
      create
    }
  }
}
</script>