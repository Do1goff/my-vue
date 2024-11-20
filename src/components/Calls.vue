<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile>
        <v-card-title>Вызов абитуриента</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="abit.call_number != data.call_number"
                dot
              >
                <v-text-field
                  v-model="data.call_number"
                  label="Исх.№"
                  @input="send('call_number', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="abit.call_date != data.call_date"
                dot
              >
                <v-text-field
                  :value="formatDate(data.call_date)"
                  type="date"
                  label="Дата"
                  @input="sendDate('call_date', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="abit.call_result != data.call_result"
                dot
              >
                <v-text-field
                  v-model="data.call_result"
                  label="Решение"
                  @input="send('call_result', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="abit.call_note !== data.call_note"
                dot
              >
                <v-textarea
                  v-model="data.call_note"
                  dense
                  rows="2"
                  label="Примечание"
                  @input="send('call_note', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card tile>
        <v-card-title>Сборы</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  formatDate(abit.collect_date_admission) !=
                  formatDate(data.collect_date_admission)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.collect_date_admission)"
                  label="Дата прибытия"
                  type="date"
                  @input="sendDate('collect_date_admission', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="abit.collect_food != data.collect_food"
                dot
              >
                <v-switch
                  v-model="data.collect_food"
                  hint="Постановка на довольствие"
                  persistent-hint
                  class="no-wrap-hint"
                  color="success"
                  @change="send('collect_food', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CallsComponent',
  props: {
    abit: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      data: {},
      differences: {},
    }
  },
  computed: {
    ...mapGetters([]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {},
  methods: {
    ...mapActions([]),
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendDate(key, value) {
      this.data[key] = value
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style>
.v-badge {
  display: block;
}
.small-text {
  font-size: 0.9em;
}
.no-wrap-hint .v-messages__message {
  white-space: nowrap;
}
</style>
