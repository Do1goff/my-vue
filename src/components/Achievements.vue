<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-text>
          <v-badge
            color="green"
            :value="
              (Object.assign({}, abit.quota).id !== data.quota &&
                Object.assign({}, abit.quota).id !==
                  Object.assign({}, data.quota).id) ||
              (abit.quota === null && data.quota)
            "
            dot
          >
            <v-autocomplete
              v-model="data.quota"
              dense
              :items="quota"
              item-text="name"
              item-value="id"
              label="Квота"
              @input="send('quota', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-badge
            color="green"
            :value="
              (Object.assign({}, abit.priorityRight).id !==
                data.priorityRight &&
                Object.assign({}, abit.priorityRight).id !==
                  Object.assign({}, data.priorityRight).id) ||
              (abit.priorityRight === null && data.priorityRight)
            "
            dot
          >
            <v-autocomplete
              v-model="data.priorityRight"
              dense
              :items="priorityRight"
              item-text="name"
              item-value="id"
              label="Преимущественное право"
              @input="send('priorityRight', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-badge
            color="green"
            :value="
              (Object.assign({}, abit.cossack_society).id !==
                data.cossack_society &&
                Object.assign({}, abit.cossack_society).id !==
                  Object.assign({}, data.cossack_society).id) ||
              (abit.cossack_society === null && data.cossack_society)
            "
            dot
          >
            <v-autocomplete
              v-model="data.cossack_society"
              dense
              :items="cossack_society"
              item-text="name"
              item-value="id"
              label="Казачье общество"
              @input="send('cossack_society', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-badge
            color="green"
            :value="abit.note !== data.note"
            dot
          >
            <v-textarea
              v-model="data.note"
              dense
              label="Примечания"
              rows="2"
              @input="send('note', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="6">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="personalAchievements"
          height="303px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> Индивидуальные достижения </v-toolbar-title>
              <v-spacer />
              <v-menu
                v-model="menuAchievement"
                :close-on-content-click="false"
                :nudge-left="150"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Добавить
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title> Добавить </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-select
                            :value="editAchievement.name"
                            label="Достижение"
                            :items="listAchievements"
                            item-text="name"
                            item-value="id"
                            @input="updatePersonalAchievements"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="savePersonalAchievements"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-toolbar>
          </template>
          <template #item.value="{ item }">
            <v-switch
              v-model="item.value"
              dense
              @change="
                changeValueListAchievements(item.abitAchievementId, $event)
              "
            />
          </template>
          <template #item.test="{ item }">
            <v-checkbox
              v-model="item.test"
              dense
              @change="
                changeTestListAchievements(item.abitAchievementId, $event)
              "
            />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AchievementsComponent',
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
      menuAchievement: false,
      editAchievement: {},
      headers: [
        { value: 'achievement.name', text: 'Наименование' },
        { value: 'value', text: 'Наличие' },
        { value: 'test', text: 'Проверка' },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'quota',
      'priorityRight',
      'listAchievements',
      'personalAchievements',
      'cossack_society',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
      this.fetchPersonalAchievements(this.data.id)
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchQuota()
    this.fetchPriorityRight()
    this.fetchListAchievements()
    this.fetchCossackSociety()
  },
  methods: {
    ...mapActions([
      'fetchQuota',
      'fetchPriorityRight',
      'fetchListAchievements',
      'fetchPersonalAchievements',
      'addPersonalAchievements',
      'putPersonalAchievements',
      'fetchCossackSociety',
    ]),
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    changeValueListAchievements(key, value) {
      this.editAchievement.abitAchievementId = key
      this.editAchievement.value = value
      this.editAchievement.abitId = this.abit.id
      this.putPersonalAchievements(this.editAchievement)
      this.editAchievement = {}
    },
    changeTestListAchievements(key, value) {
      this.editAchievement.abitAchievementId = key
      this.editAchievement.test = value
      this.editAchievement.abitId = this.abit.id
      this.putPersonalAchievements(this.editAchievement)
      this.editAchievement = {}
    },
    updatePersonalAchievements(event) {
      this.editAchievement.achievementId = event
    },
    savePersonalAchievements() {
      this.editAchievement.abitId = this.abit.id
      this.addPersonalAchievements(this.editAchievement)
    },
  },
}
</script>

<style>
.v-badge {
  display: block;
}
</style>
