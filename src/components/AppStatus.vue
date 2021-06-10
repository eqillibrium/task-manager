<template>
  <span class="badge" :class="taskStatus" @click="show">{{ taskTextStatus }}</span>
</template>
<script>
import{ computed, reactive } from 'vue'

export default {
  props: ['type'],
  setup (props) {
    const colorsOfStatus = reactive({
      active: 'primary',
      done: '',
      cancelled: 'danger',
      pending: 'warning'
    })
    const textsOfStatus = reactive({
      active: 'Активен',
      done: 'Завершен',
      cancelled: 'Отменен',
      pending: 'В работе'
    })
    const taskStatus = computed(() => colorsOfStatus[props.type])
    const taskTextStatus = computed(() => textsOfStatus[props.type])
    function show () {
      console.log(taskTextStatus)
    }
    return {
      taskStatus,
      taskTextStatus,
      show
    }
  }
}
</script>