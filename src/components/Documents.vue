<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-tabs
          v-model="tabsEducation"
          fixed-tabs
          background-color="red"
          dark
        >
          <v-tab> Образование </v-tab>
          <v-tab> Текущее </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabsEducation">
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.education &&
                          JSON.parse(abit.education).category !==
                            educationJSON.category) ||
                        (!abit.education && educationJSON.category !== ``)
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="educationJSON.category"
                        :items="categoriesEducation"
                        dense
                        label="Категория"
                        @input="sendEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.education &&
                          JSON.parse(abit.education).document_education !==
                            educationJSON.document_education) ||
                        (!abit.education &&
                          educationJSON.document_education !== ``)
                      "
                      dot
                    >
                      <v-text-field
                        v-model="educationJSON.document_education"
                        dense
                        label="Документ"
                        @input="sendEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.education &&
                          JSON.parse(abit.education).date_end !==
                            educationJSON.date_end) ||
                        (!abit.education && educationJSON.date_end !== ``)
                      "
                      dot
                    >
                      <v-autocomplete
                        :value="formatDateYear(educationJSON.date_end)"
                        dense
                        :items="years"
                        label="Год окончания"
                        @input="changeDateEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="12">
                    <v-badge
                      color="green"
                      :value="
                        (abit.education &&
                          JSON.parse(abit.education).institute !==
                            educationJSON.institute) ||
                        (!abit.education && educationJSON.institute !== ``)
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="educationJSON.institute"
                        :items="institutes"
                        item-text="name"
                        item-value="id"
                        dense
                        label="Образовательное учреждение"
                        @input="sendEducationInstitute"
                      >
                        <template #no-data>
                          <v-menu
                            v-model="menuInstitutes"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="500"
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
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Добавить</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="institute.name"
                                          dense
                                          label="Образовательное учреждение"
                                        />
                                      </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="institute.address"
                                          dense
                                          label="Адрес"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>

                              <v-card-actions>
                                <v-spacer />
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  dense
                                  @click="saveInstitute"
                                >
                                  Сохранить
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="educationJSON.address"
                      dense
                      label="Адрес"
                      @input="sendEducation"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).category !==
                            uncanceledEducationJSON.category) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.category !== ``)
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="uncanceledEducationJSON.category"
                        :items="categoriesUncanceledEducation"
                        dense
                        label="Категория"
                        @input="sendUncanceledEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation)
                            .date_admission !==
                            uncanceledEducationJSON.date_admission) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.date_admission !== ``)
                      "
                      dot
                    >
                      <v-select
                        :value="
                          formatDateYear(uncanceledEducationJSON.date_admission)
                        "
                        dense
                        :items="years"
                        label="Год поступления"
                        @input="changeDateUncanceledEducationAdmission"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).date_end !==
                            uncanceledEducationJSON.date_end) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.date_end !== ``)
                      "
                      dot
                    >
                      <v-select
                        :value="
                          formatDateYear(uncanceledEducationJSON.date_end)
                        "
                        dense
                        :items="years"
                        label="Год окончания"
                        @input="changeDateUncanceledEducationEnd"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="12">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).institute !==
                            uncanceledEducationJSON.institute) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.institute !== ``)
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="uncanceledEducationJSON.institute"
                        :items="institutes"
                        item-text="name"
                        item-value="id"
                        dense
                        label="Образовательное учреждение"
                        @input="sendUncanceledEducation"
                      >
                        <template #no-data>
                          <v-menu
                            v-model="menuInstitutes"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="500"
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
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Добавить</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="institute.name"
                                          dense
                                          label="Образовательное учреждение"
                                        />
                                      </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="institute.address"
                                          dense
                                          label="Адрес"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>

                              <v-card-actions>
                                <v-spacer />
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  dense
                                  @click="saveInstitute"
                                >
                                  Сохранить
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).period_study !==
                            uncanceledEducationJSON.period_study) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.period_study !== ``)
                      "
                      dot
                    >
                      <v-text-field
                        v-model="uncanceledEducationJSON.period_study"
                        dense
                        label="Срок обучения"
                        @input="sendUncanceledEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).course !==
                            uncanceledEducationJSON.course) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.course !== ``)
                      "
                      dot
                    >
                      <v-text-field
                        v-model="uncanceledEducationJSON.course"
                        dense
                        label="Курс"
                        @input="sendUncanceledEducation"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        (abit.uncanceledEducation &&
                          JSON.parse(abit.uncanceledEducation).semesters_end !==
                            uncanceledEducationJSON.semesters_end) ||
                        (!abit.uncanceledEducation &&
                          uncanceledEducationJSON.semesters_end !== ``)
                      "
                      dot
                    >
                      <v-text-field
                        v-model="uncanceledEducationJSON.semesters_end"
                        dense
                        label="Семестров закрыто"
                        @input="sendUncanceledEducation"
                      />
                    </v-badge>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card>
        <v-card-title> Паспорт </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).series !==
                      passportJSON.series) ||
                  (!abit.document_passport && passportJSON.series !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="passportJSON.series"
                  v-mask="'####'"
                  dense
                  label="серия"
                  @input="sendPassport('series', parseInt($event, 10))"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).num !==
                      passportJSON.num) ||
                  (!abit.document_passport && passportJSON.num !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="passportJSON.num"
                  v-mask="'######'"
                  dense
                  label="номер"
                  @input="sendPassport('num', parseInt($event, 10))"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).date_issue !==
                      passportJSON.date_issue) ||
                  (!abit.document_passport && passportJSON.date_issue !== ``)
                "
                dot
              >
                <v-menu
                  v-model="menuPassportDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      dense
                      :value="formatDate(passportJSON.date_issue)"
                      label="Дата выдачи"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker @input="changePassportDate" />
                </v-menu>
              </v-badge>
            </v-col>
            <v-col cols="8">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).issued_by !==
                      passportJSON.issued_by) ||
                  (!abit.document_passport && passportJSON.issued_by !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="passportJSON.issued_by"
                  dense
                  label="кем выдан"
                  @input="sendPassport"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).department_code !==
                      passportJSON.department_code) ||
                  (!abit.document_passport &&
                    passportJSON.department_code !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="passportJSON.department_code"
                  v-mask="'###-###'"
                  dense
                  label="код подразделения"
                  @input="sendPassport"
                />
              </v-badge>
            </v-col>
            <v-col cols="12">
              <v-badge
                color="green"
                :value="
                  (abit.document_passport &&
                    JSON.parse(abit.document_passport).birthplace !==
                      passportJSON.birthplace) ||
                  (!abit.document_passport && passportJSON.birthplace !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="passportJSON.birthplace"
                  dense
                  label="место рождения"
                  @input="sendPassport"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.document_inn !== abit.document_inn"
                dot
              >
                <v-text-field
                  v-model="data.document_inn"
                  v-mask="'############'"
                  dense
                  label="ИНН"
                  @input="send('document_inn', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.document_snils !== abit.document_snils"
                dot
              >
                <v-text-field
                  v-model="data.document_snils"
                  v-mask="'###-###-### ##'"
                  dense
                  label="СНИЛС"
                  @input="send('document_snils', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  data.document_secrets_access !== abit.document_secrets_access
                "
                dot
              >
                <v-select
                  v-model="data.document_secrets_access"
                  dense
                  :items="document_secrets_access"
                  item-text="title"
                  item-value="value"
                  label="Допуск к ССГТ"
                  @input="send('document_secrets_access', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="data.document_ppo_group !== abit.document_ppo_group"
                dot
              >
                <v-select
                  v-model="data.document_ppo_group"
                  dense
                  :items="document_ppo_group"
                  item-text="title"
                  item-value="value"
                  label="Категория ПП от ВК/ВЧ"
                  @input="send('document_ppo_group', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  data.document_medical_certificate !==
                  abit.document_medical_certificate
                "
                dot
              >
                <v-select
                  v-model="data.document_medical_certificate"
                  dense
                  :items="document_medical_certificate"
                  item-text="title"
                  item-value="value"
                  label="Мед. справка"
                  @change="send('document_medical_certificate', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="5">
              <v-badge
                color="green"
                :value="
                  data.document_mvd_availability !==
                  abit.document_mvd_availability
                "
                dot
              >
                <v-select
                  v-model="data.document_mvd_availability"
                  dense
                  :items="document_mvd_availability"
                  item-text="title"
                  item-value="value"
                  label="Справка МВД"
                  @change="send('document_mvd_availability', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="7">
              <v-badge
                color="green"
                :value="
                  data.document_mvd_prosecution !==
                  abit.document_mvd_prosecution
                "
                dot
              >
                <v-select
                  v-model="data.document_mvd_prosecution"
                  dense
                  :items="document_mvd_prosecution"
                  item-text="title"
                  label="Привлечение к ответственности"
                  multiple
                  chips
                  @input="send('document_mvd_prosecution', $event)"
                >
                  <template #selection="{ item, index }">
                    <v-chip v-if="index < 1">
                      <span>{{ item.title }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="black--text text-caption"
                    >
                      (+{{ data.document_mvd_prosecution.length - 1 }})
                    </span>
                  </template>
                </v-select>
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="schoolMarks"
          height="354px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> Оценки в документе о СОО/СПО </v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialogMark"
                max-width="500px"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="editList = true"
                  >
                    Добавить
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    {{ computedEditMark }}
                    <v-spacer />
                    <v-dialog
                      v-model="dialogMarkList"
                      max-width="800px"
                      v-if="editList"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Список
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          Добавить
                          <v-spacer />
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-row>
                                  <v-col
                                    v-for="(n, index) in subjects"
                                    :key="index"
                                    cols="6"
                                  >
                                    <v-row>
                                      <v-col cols="6">
                                        {{ n.name }}
                                      </v-col>
                                      <v-col cols="6">
                                        <v-text-field
                                          v-model="markList[index]"
                                          v-mask="'#'"
                                          :rules="[rules.mark]"
                                          :items="marks"
                                          label="Оценка"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            text
                            @click="saveMarkList"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-autocomplete
                            :value="mark.mark"
                            :items="marks"
                            label="Оценка"
                            @input="updateMark(parseInt($event, 10))"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="mark.subject"
                            :items="subjects"
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="updateMarkSubject"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="saveMark"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              @click="editMark(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-card>
        <v-card-title> Военная служба </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).rank !==
                      militaryServiceJSON.rank) ||
                  (!abit.militaryService && militaryServiceJSON.rank !== ``)
                "
                dot
              >
                <v-select
                  v-model="militaryServiceJSON.rank"
                  :items="ranks"
                  dense
                  label="Воинское звание"
                  @input="sendMilitaryService"
                />
              </v-badge>
            </v-col>
            <v-col cols="8">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).post !==
                      militaryServiceJSON.post) ||
                  (!abit.militaryService && militaryServiceJSON.post !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="militaryServiceJSON.post"
                  dense
                  label="Должность"
                  @input="sendMilitaryService"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).place !==
                      militaryServiceJSON.place) ||
                  (!abit.militaryService && militaryServiceJSON.place !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="militaryServiceJSON.place"
                  dense
                  label="Где служит"
                  @input="sendMilitaryService"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).unit !==
                      militaryServiceJSON.unit) ||
                  (!abit.militaryService && militaryServiceJSON.unit !== ``)
                "
                dot
              >
                <v-text-field
                  v-model="militaryServiceJSON.unit"
                  dense
                  label="Воинская часть"
                  @input="sendMilitaryService"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).category !==
                      militaryServiceJSON.category) ||
                  (!abit.militaryService && militaryServiceJSON.category !== ``)
                "
                dot
              >
                <v-select
                  v-model="militaryServiceJSON.category"
                  dense
                  :items="categories"
                  item-text="title"
                  item-value="value"
                  label="Категория"
                  @input="sendMilitaryService"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  (abit.militaryService &&
                    JSON.parse(abit.militaryService).dismissed !==
                      militaryServiceJSON.dismissed) ||
                  (!abit.militaryService &&
                    militaryServiceJSON.dismissed !== ``)
                "
                dot
              >
                <v-checkbox
                  v-model="militaryServiceJSON.dismissed"
                  dense
                  label="Уволен?"
                  @click="sendMilitaryService"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.personal_number !== abit.personal_number"
                dot
              >
                <v-text-field
                  v-model="data.personal_number"
                  v-mask="'XX-######'"
                  dense
                  label="Личный номер"
                  @input="send('personal_number', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  data.personal_number_giving !== abit.personal_number_giving
                "
                dot
              >
                <v-checkbox
                  v-model="data.personal_number_giving"
                  dense
                  label="Выдача личного номера"
                  @change="send('personal_number_giving', $event)"
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
  name: 'DocumentsComponent',
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
      mark: {},
      markList: [],
      marks: [5, 4, 3, 2],
      tabsEducation: 0,
      institute: {},
      editList: true,
      menuInstitutes: false,
      menuPassportDate: false,
      dialogMark: false,
      dialogMarkList: false,
      headers: [
        { value: 'subject.name', text: 'Предмет' },
        { value: 'mark', text: 'Оценка' },
        { value: 'actions', text: 'Действие' },
      ],
      document_secrets_access: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_1_in_process', title: '1 группа (в процессе)' },
        { value: 'group_2_in_process', title: '2 группа (в процессе)' },
        { value: 'none', title: 'отсутствует' },
      ],
      document_ppo_group: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_3', title: '3 группа' },
        { value: 'group_4', title: '4 группа' },
      ],
      document_medical_certificate: [
        { value: 'true', title: 'Имеется' },
        { value: 'false', title: 'Отсутствует' },
      ],
      document_mvd_availability: [
        { value: 'true', title: 'Имеется' },
        { value: 'false', title: 'Отсутствует' },
      ],
      document_mvd_prosecution: [
        { value: 'criminal', title: 'Уголовная' },
        { value: 'administrative', title: 'Административная' },
        { value: 'accounting', title: 'Факт учёта в ОПДН' },
      ],
      ranks: [
        'Рядовой',
        'Ефрейтор',
        'Младший сержант',
        'Сержант',
        'Старший сержант',
        'Старшина',
        'Прапорщик',
        'Старший прапорщик',
      ],
      categories: [
        { value: 'conscription', title: 'По призыву' },
        { value: 'contract', title: 'Контракт' },
      ],
      categoriesEducation: ['СОО', 'СПО'],
      categoriesUncanceledEducation: ['ВУЗ', 'СПО', 'НПО'],
      rules: {
        mark: (value) => value <= 5 || 'Оценка по 5-бальной шкале',
      },
    }
  },
  computed: {
    ...mapGetters(['subjects', 'schoolMarks', 'institutes']),
    passportJSON() {
      return this.data.document_passport
        ? JSON.parse(this.data.document_passport)
        : {
            series: '',
            num: '',
            date_issue: '',
            issued_by: '',
            department_code: '',
            birthplace: '',
          }
    },
    militaryServiceJSON() {
      return this.data.militaryService
        ? JSON.parse(this.data.militaryService)
        : {
            rank: '',
            post: '',
            place: '',
            unit: '',
            category: '',
            dismissed: '',
          }
    },
    educationJSON() {
      return this.data.education
        ? JSON.parse(this.data.education)
        : {
            category: '',
            document_education: '',
            date_end: '',
            institute: '',
          }
    },
    uncanceledEducationJSON() {
      return this.data.uncanceledEducation
        ? JSON.parse(this.data.uncanceledEducation)
        : {
            category: '',
            date_admission: '',
            date_end: '',
            institute: '',
            period_study: '',
            course: '',
            semesters_end: '',
          }
    },
    years() {
      const array = []
      for (let i = moment().year() - 20; i <= moment().year() + 10; i++) {
        array.push(i.toString())
      }
      return array
    },
    computedEditMark() {
      return this.editList ? 'Добавить' : 'Изменить'
    },
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    data() {
      if (this.data.id) {
        this.fetchSchoolMark(this.data.id)
      }
    },
  },
  created() {
    this.fetchSubjects()
    this.fetchInstitutes()
  },
  mounted() {
    this.data = { ...this.abit }
  },
  methods: {
    ...mapActions([
      'addSchoolMark',
      'fetchSubjects',
      'fetchSchoolMark',
      'putSchoolMark',
      'fetchInstitutes',
      'addInstitutes',
    ]),
    updateMark(event) {
      this.mark.mark = event
    },
    updateMarkSubject(event) {
      this.mark.subject = this.subjects[event - 1]
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    formatDateYear(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY')
    },
    changePassportDate(event) {
      this.passportJSON.date_issue = new Date(event).toISOString()
      this.menuPassportDate = false
      this.sendPassport()
    },
    changeDateEducation(event) {
      this.educationJSON.date_end = new Date(`${event}-01-01`).toISOString()
      this.sendEducation()
    },
    changeDateUncanceledEducationEnd(event) {
      this.uncanceledEducationJSON.date_end = new Date(event).toISOString()
      this.sendUncanceledEducation()
    },
    changeDateUncanceledEducationAdmission(event) {
      this.uncanceledEducationJSON.date_admission = new Date(
        event
      ).toISOString()
      this.sendUncanceledEducation()
    },
    saveMark() {
      if (!this.mark.abitSubjectId) {
        this.mark.abitId = this.abit.id
        this.addSchoolMark(this.mark)
        this.mark.mark = ''
        this.mark.subject = ''
        this.dialogMark = false
      } else {
        this.putSchoolMark(this.mark)
        this.dialogMark = false
      }
    },
    saveMarkList() {
      for (var key in this.markList) {
        const M = {
          mark: parseInt(this.markList[key], 10),
          subject: this.subjects[key].id,
          abitId: this.abit.id,
        }
        this.addSchoolMark(M)
      }
      this.dialogMarkList = false
      this.dialogMark = false
    },
    editMark(item) {
      this.editList = false
      this.mark = item
      this.dialogMark = true
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
      console.log(value)
    },
    sendPassport() {
      this.data.document_passport = JSON.stringify(this.passportJSON)
      this.send('document_passport', this.data.document_passport)
    },
    sendEducation() {
      this.data.education = JSON.stringify(this.educationJSON)
      this.send('education', this.data.education)
    },
    sendEducationInstitute(event) {
      this.educationJSON.institute = event
      this.educationJSON.address = this.institutes[event - 1].address
      this.sendEducation()
    },
    sendUncanceledEducation() {
      this.data.uncanceledEducation = JSON.stringify(
        this.uncanceledEducationJSON
      )
      this.send('uncanceledEducation', this.data.uncanceledEducation)
    },
    sendMilitaryService() {
      this.data.militaryService = JSON.stringify(this.militaryServiceJSON)
      this.send('militaryService', this.data.militaryService)
    },
    saveInstitute() {
      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
  },
}
</script>
