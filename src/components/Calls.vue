<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile>
        <v-card-title>Вызов абитуриента</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="2">
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
            <v-col cols="2">
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
            <v-col cols="2">
              <v-badge
                color="success"
                :value="abit.call_date_admission != data.call_date_admission"
                dot
              >
                <v-text-field
                  :value="formatDate(data.call_date_admission)"
                  type="date"
                  label="Дата прибытия"
                  @input="sendDate('call_date_admission', $event)"
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
      if (typeof value == 'number' && isNaN(value)) {
        this.differences[key] = null
        this.data[key] = null
      } else if (value != '') {
        this.differences[key] = value
      } else if (value === false) {
        this.differences[key] = false
      } else {
        this.differences[key] = null
        this.data[key] = null
      }
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendDate(key, value) {
      if (value != '') {
        this.data[key] = new Date(value)
        this.differences[key] = new Date(value)
      } else {
        this.data[key] = null
        this.differences[key] = null
      }
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
