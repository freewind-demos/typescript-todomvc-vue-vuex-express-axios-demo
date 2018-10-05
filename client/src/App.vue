<template>
  <div id="app">
    <TodoMvc v-bind:currentPath="currentPath"/>
  </div>
</template>

<script lang="ts">
  import {Component, Watch} from 'vue-property-decorator';
  import TodoMvc from './components/TodoMvc.vue';
  import MyVue from './MyVue';

  @Component({
    components: {
      TodoMvc,
    },
  })
  export default class App extends MyVue {
    currentPath: string | null = null;

    async mounted() {
      await this.myStore.dispatch('fetchTodos', undefined);
      this.onRouteChange(this.$route);
    }

    @Watch('$route')
    onRouteChange(to: {path: string}) {
      this.currentPath = to.path
    }

  }
</script>
