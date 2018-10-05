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

    mounted() {
      this.onRouteChange(this.$route);
      this.myStore.commit(`init`, undefined)
    }

    @Watch('$route')
    onRouteChange(to: {path: string}) {
      this.currentPath = to.path
    }
  }
</script>
