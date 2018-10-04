import {Vue} from 'vue-property-decorator';
import {MyStore} from '@/store';

export default class extends Vue {

  get myStore() {
    return this.$store as MyStore;
  }

}
