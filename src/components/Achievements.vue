<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-title> Квота </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :value="abit.personal_file_number"
                label="№ личного дела"
                @input="updateData('personal_file_number', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Льгота </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :value="abit.personal_file_number"
                label="№ личного дела"
                @input="updateData('personal_file_number', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title> Индивидуальные достижения </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AchievementsComponent',
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
