<template>
  <component
    :is="this.component"
    :abit="this.abit || {}"
    @child-event="HandleChild($event)"
    @child-residence="HandleResidence($event)"
  />
</template>

<script>
import Achievements from '@/components/Achievements.vue'
import Admission from '@/components/Admission.vue'
import DataTable from '@/components/DataTable.vue'
import Documents from '@/components/Documents.vue'
import Results from '@/components/Results.vue'
import Calls from '../components/Calls.vue'
import FirstInfo from '../components/FirstInfo.vue'
export default {
  name: 'ComponentView',
  components: {
    DataTable,
    FirstInfo,
    Results,
    Documents,
    Admission,
    Achievements,
    Calls,
  },
  props: ['component', 'abit'],
  data() {
    return {}
  },
  methods: {
    HandleChild(event) {
      const data = [this.component, event]
      this.$emit('child-event', data)
    },
    HandleResidence(event) {
      this.$emit('child-residence', event)
    },
  },
}
</script>
