import { createStore, createLogger } from 'vuex'
import { get } from '../functions/requests'

export default createStore({
  plugins:[createLogger()],
  state: {
    tasks: []
  },
  mutations: {
    addTasksToState (state, payload) {
      state.tasks = payload
      console.log(state.tasks)
    },
    addNewTaskToState (state, payload) {
      state.tasks.push(payload)
    },
    removeTaskFromState (state, payload) {
      let task = state.tasks.find( el => el.id === payload)
      let idx = state.tasks.indexOf(task)
      state.tasks.splice(idx, 1)
    }
  },
  actions: {
    async getTasks(context) {
      try {
        const response = await fetch('https://vue-with-http-5cd5c-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
        const result = await response.json()
        const items = Object.keys(result).map(key => {
          return {
            id: key,
            ...result[key]
          }
        })
        context.commit('addTasksToState', items)
        get('hello from get function')
      } catch (e) {
        console.log(e)
      }
    },
    async createTask(context, payload) {
      try {
        const response = await fetch(`https://vue-with-http-5cd5c-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payload)
        })
        const result = await response.json()
        const newTask = {
          id: result.name,
          ...payload
        }
        context.commit('addNewTaskToState', newTask)
      } catch (e) {
        console.log(e)
      }
    },
    async changeStatus(context, payload) {
      try {
        const response = await fetch(`https://vue-with-http-5cd5c-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.value.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payload.value)
        })
        const result = await response.json()
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteTask (context, payload) {
      try {
        const response = await fetch(`https://vue-with-http-5cd5c-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
        const result = await response.json()
        context.commit('removeTaskFromState', payload)
        console.log(result)
      } catch (e) { console.log(e) }
    }
  },
  getters: {
    allTasks (state) {
      return state.tasks
    },
    activeTasks (state) {
      return state.tasks.filter( el => el.status !== 'done' && el.status !== 'cancelled')
    }
  },
  modules: {
  }
})
