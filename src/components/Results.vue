<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    :value="abit.personal_file_number"
                    label="№ личного дела"
                    @input="updateData('personal_file_number', $event)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

        {{ abit }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResultsComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
    }
  },
  computed: {},
  created() {},
  methods: {
    updateData(fieldName, event) {
      this.data[fieldName] = event
    },
  },
}
</script>
