<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.establishedQuota).id !==
                    data.establishedQuota &&
                    Object.assign({}, abit.establishedQuota).id !==
                      Object.assign({}, data.establishedQuota).id) ||
                  (abit.establishedQuota === null && data.establishedQuota)
                "
                dot
              >
                <v-autocomplete
                  v-model="data.establishedQuota"
                  dense
                  :items="establishedQuota"
                  item-text="name"
                  item-value="id"
                  clearable
                  label="Установленная квота"
                  @input="send('establishedQuota', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                dot
                :value="
                  abit.establishedQuota_test != data.establishedQuota_test
                "
              >
                <v-switch
                  :disabled="data.establishedQuota == null"
                  hint="Подтверждение"
                  persistent-hint
                  class="no-wrap-hint"
                  color="success"
                  dense
                  v-model="data.establishedQuota_test"
                  @change="send('establishedQuota_test', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.separateQuota).id !==
                    data.separateQuota &&
                    Object.assign({}, abit.separateQuota).id !==
                      Object.assign({}, data.separateQuota).id) ||
                  (abit.separateQuota === null && data.separateQuota)
                "
                dot
              >
                <v-autocomplete
                  v-model="data.separateQuota"
                  dense
                  :items="separateQuota"
                  clearable
                  item-text="name"
                  item-value="id"
                  label="Отдельная квота"
                  @input="send('separateQuota', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                dot
                :value="abit.separateQuota_test != data.separateQuota_test"
              >
                <v-switch
                  :disabled="data.separateQuota == null"
                  hint="Подтверждение"
                  persistent-hint
                  class="no-wrap-hint"
                  color="success"
                  dense
                  v-model="data.separateQuota_test"
                  @change="send('separateQuota_test', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-badge
                color="success"
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
                  class="small-text"
                  v-model="data.priorityRight"
                  dense
                  :items="priorityRight"
                  clearable
                  item-text="name"
                  item-value="id"
                  label="Преимущественное право"
                  @input="send('priorityRight', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                dot
                :value="abit.priorityRight_test != data.priorityRight_test"
              >
                <v-switch
                  :disabled="data.priorityRight == null"
                  hint="Подтверждение"
                  persistent-hint
                  class="no-wrap-hint"
                  color="success"
                  dense
                  v-model="data.priorityRight_test"
                  @change="send('priorityRight_test', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
        height="120px"
        tile
      >
        <v-card-text>
          <v-badge
            color="success"
            :value="abit.note !== data.note"
            dot
          >
            <v-textarea
              v-model="data.note"
              dense
              label="Примечания"
              rows="3"
              @input="send('note', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="6">
      <v-card tile>
        <v-data-table
          :headers="headers"
          :items="personalAchievements"
          height="338px"
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
                <v-form
                  ref="formAchievement"
                  v-model="formAchievementValid"
                >
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
                              :rules="[rules.required]"
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
                        :disabled="!formAchievementValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-menu>
            </v-toolbar>
          </template>
          <template #item.test="{ item }">
            <v-switch
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
      editAchievement: {},
      menuAchievement: false,
      headers: [
        { value: 'achievement.name', text: 'Наименование' },
        { value: 'test', text: 'Подтверждение' },
      ],
      formAchievementValid: false,
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
    }
  },
  computed: {
    ...mapGetters([
      'establishedQuota',
      'separateQuota',
      'priorityRight',
      'listAchievements',
      'personalAchievements',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    async data() {
      if (this.data.id) {
        this.fetchPersonalAchievements(this.data.id)
      }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchEstablishedQuota()
    this.fetchSeparateQuota()
    this.fetchPriorityRight()
    this.fetchListAchievements()
  },
  methods: {
    ...mapActions([
      'fetchEstablishedQuota',
      'fetchSeparateQuota',
      'fetchPriorityRight',
      'fetchListAchievements',
      'fetchPersonalAchievements',
      'addPersonalAchievements',
      'putPersonalAchievements',
    ]),
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
    async savePersonalAchievements() {
      this.editAchievement.abitId = this.abit.id
      await this.addPersonalAchievements(this.editAchievement)
      this.editAchievement = { name: '' }
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
.v-row {
  display: flex;
  align-items: stretch;
}
.v-col {
  flex: 1;
}
.no-wrap-hint .v-messages__message {
  white-space: nowrap;
}
</style>
