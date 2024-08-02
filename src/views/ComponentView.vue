<template>
  <component
    :is="this.component"
    :abit="this.abit || {}"
    @child-event="HandleChild($event)"
    @child-residence="HandleResidence($event)"
    @child-passport="HandlePassport($event)"
    @child-education="HandleEducation($event)"
    @child-uncanceledEducation="HandleUncanceledEducation($event)"
    @child-militaryService="HandleMilitaryService($event)"
  />
</template>

<script>
import Achievements from '@/components/Achievements.vue'
import Admission from '@/components/Admission.vue'
import DataTable from '@/components/DataTable.vue'
import Documents from '@/components/Documents.vue'
import Results from '@/components/Results.vue'
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
    HandleEducation(event) {
      this.$emit('child-education', event)
    },
    HandleUncanceledEducation(event) {
      this.$emit('child-uncanceledEducation', event)
    },
    HandleMilitaryService(event) {
      this.$emit('child-militaryService', event)
    },
    HandlePassport(event) {
      this.$emit('child-passport', event)
    },
  },
}
</script>
