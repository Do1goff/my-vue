<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card tile>
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
            <v-card height="320px">
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        selectedEducation
                          ? (Object.assign({}, selectedEducation.category)
                              .id !== editEducation.category &&
                              Object.assign({}, selectedEducation.category)
                                .id !==
                                Object.assign({}, editEducation.category).id) ||
                            (selectedEducation.category === null &&
                              editEducation.category)
                          : editEducation.category != null
                      "
                      dot
                    >
                      <v-autocomplete
                        class="small-text"
                        v-model="editEducation.category"
                        :items="categoryEducation"
                        item-text="name"
                        item-value="id"
                        label="Категория"
                        @input="sendEducation('category', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        selectedEducation
                          ? formatDateYear(selectedEducation.date_end) !=
                            formatDateYear(editEducation.date_end)
                          : formatDateYear(editEducation.date_end) != null
                      "
                      dot
                    >
                      <v-autocomplete
                        :value="formatDateYear(editEducation.date_end)"
                        :disabled="editEducation.category == null"
                        :items="years"
                        label="Год окончания"
                        @input="sendEducationDate($event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="green"
                      :value="
                        selectedEducation
                          ? selectedEducation.document_education !=
                            editEducation.document_education
                          : editEducation.document_education != null
                      "
                      dot
                    >
                      <v-menu
                        v-model="menuDocumentEducation"
                        :close-on-content-click="false"
                        :nudge-left="150"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            :color="colorBtnDocumentEducation"
                            dark
                            :disabled="editEducation.category == null"
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Документ
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title> Документ об образовании </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="8">
                                  <v-text-field
                                    v-model="editDocumentEducation.number"
                                    label="Номер"
                                  />
                                </v-col>
                                <v-col cols="4">
                                  <v-text-field
                                    v-model="editDocumentEducation.date"
                                    label="Дата"
                                    type="date"
                                  />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              text
                              @click="
                                sendDocumentEducation(editDocumentEducation)
                              "
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-badge>
                  </v-col>
                  <v-col cols="12">
                    <v-badge
                      color="green"
                      :value="
                        selectedEducation
                          ? (Object.assign({}, selectedEducation.institute)
                              .id != editEducation.institute &&
                              Object.assign({}, selectedEducation.institute)
                                .id !=
                                Object.assign({}, editEducation.institute)
                                  .id) ||
                            (selectedEducation.institute === null &&
                              editEducation.institute != null)
                          : editEducation.institute != null
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="editEducation.institute"
                        :items="institutes"
                        :disabled="editEducation.category == null"
                        item-text="name"
                        item-value="id"
                        label="Образовательное учреждение"
                        persistent-hint
                        @input="sendEducationInstitute('institute', $event)"
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
                                      <v-col cols="9">
                                        <v-textarea
                                          class="small-text"
                                          rows="2"
                                          label="Адрес"
                                          :value="newEducationLocation"
                                          readonly
                                        />
                                      </v-col>
                                      <v-col cols="3">
                                        <Location
                                          @send-locationObject="
                                            getLocationEducation($event)
                                          "
                                          @send-locationText="
                                            getLocationTextEducation($event)
                                          "
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
                                  @click="saveInstituteEducation"
                                >
                                  Сохранить
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                    <v-textarea
                      dense
                      class="small-text"
                      :value="educationLocation"
                      :disabled="editEducation.category == null"
                      readonly
                      label="Адрес"
                      rows="2"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card height="320px">
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? (Object.assign(
                              {},
                              selectedUncanceledEducation.category
                            ).id != editUncanceledEducation.category &&
                              Object.assign(
                                {},
                                selectedUncanceledEducation.category
                              ).id !=
                                Object.assign(
                                  {},
                                  editUncanceledEducation.category
                                ).id) ||
                            (selectedUncanceledEducation.category == null &&
                              editUncanceledEducation.category)
                          : editUncanceledEducation.category != null
                      "
                      dot
                    >
                      <v-autocomplete
                        class="small-text"
                        dense
                        v-model="editUncanceledEducation.category"
                        :items="categoryUncanceledEducation"
                        item-text="name"
                        item-value="id"
                        label="Категория"
                        @input="sendUncanceledEducation('category', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? formatDateYear(
                              selectedUncanceledEducation.date_end
                            ) !=
                            formatDateYear(editUncanceledEducation.date_end)
                          : editUncanceledEducation.date_end != null
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        :value="
                          formatDateYear(editUncanceledEducation.date_end)
                        "
                        :items="years"
                        :disabled="editUncanceledEducation.category == null"
                        label="Год окончания"
                        @input="sendUncanceledEducationDate('date_end', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? formatDateYear(
                              selectedUncanceledEducation.date_admission
                            ) !=
                            formatDateYear(
                              editUncanceledEducation.date_admission
                            )
                          : editUncanceledEducation.date_admission != null
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        :value="
                          formatDateYear(editUncanceledEducation.date_admission)
                        "
                        :disabled="editUncanceledEducation.category == null"
                        :items="years"
                        label="Год поступления"
                        @input="
                          sendUncanceledEducationDate('date_admission', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? selectedUncanceledEducation.period_study !=
                            editUncanceledEducation.period_study
                          : editUncanceledEducation.period_study != null
                      "
                      dot
                    >
                      <v-menu
                        v-model="menuPeriodStudy"
                        :close-on-content-click="false"
                        :nudge-left="150"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        @input="closePeriodStudy"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            class="small-text"
                            :value="computedPeriodStudy"
                            :disabled="editUncanceledEducation.category == null"
                            label="Период обучения"
                            v-bind="attrs"
                            v-on="on"
                            dense
                          />
                        </template>
                        <v-card>
                          <v-card-title> Период обучения </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col>
                                  <v-text-field
                                    v-model="editPeriodStudy.years"
                                    label="лет"
                                    type="number"
                                    min="1"
                                    max="10"
                                  />
                                </v-col>
                                <v-col>
                                  <v-text-field
                                    v-model="editPeriodStudy.months"
                                    label="месяцев"
                                    type="number"
                                    min="0"
                                    max="12"
                                  />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              text
                              @click="sendPeriodStudy"
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="4"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? selectedUncanceledEducation.course !=
                            editUncanceledEducation.course
                          : editUncanceledEducation.course != null
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="editUncanceledEducation.course"
                        :disabled="editUncanceledEducation.category == null"
                        :items="courses"
                        label="Курс"
                        @input="sendUncanceledEducation('course', $event)"
                      />
                    </v-badge>
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? selectedUncanceledEducation.semesters_end !=
                            editUncanceledEducation.semesters_end
                          : editUncanceledEducation.semesters_end != null
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="editUncanceledEducation.semesters_end"
                        :disabled="editUncanceledEducation.category == null"
                        :items="semesters"
                        label="Семестров закрыто"
                        @input="
                          sendUncanceledEducation('semesters_end', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="8"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? selectedUncanceledEducation.note !=
                            editUncanceledEducation.note
                          : editUncanceledEducation.note != null
                      "
                      dot
                    >
                      <v-textarea
                        height="75px"
                        class="small-text"
                        dense
                        rows="2"
                        :disabled="editUncanceledEducation.category == null"
                        v-model="editUncanceledEducation.note"
                        label="Примечание"
                        @input="sendUncanceledEducation('note', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="12"
                    dense
                  >
                    <v-badge
                      color="green"
                      :value="
                        selectedUncanceledEducation
                          ? (Object.assign(
                              {},
                              selectedUncanceledEducation.institute
                            ).id != editUncanceledEducation.institute &&
                              Object.assign(
                                {},
                                selectedUncanceledEducation.institute
                              ).id !=
                                Object.assign(
                                  {},
                                  editUncanceledEducation.institute
                                ).id) ||
                            (selectedUncanceledEducation.institute === null &&
                              editUncanceledEducation.institute != null)
                          : editUncanceledEducation.institute != null
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="editUncanceledEducation.institute"
                        :disabled="editUncanceledEducation.category == null"
                        :items="institutes"
                        item-text="name"
                        item-value="id"
                        label="Образовательное учреждение"
                        @input="
                          sendUncanceledEducationInstitute('institute', $event)
                        "
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
                                      <v-col cols="9">
                                        <v-textarea
                                          class="small-text"
                                          rows="2"
                                          label="Адрес"
                                          :value="
                                            newUncanceledEducationLocation
                                          "
                                          readonly
                                        />
                                      </v-col>
                                      <v-col cols="3">
                                        <Location
                                          @send-locationObject="
                                            getLocationUncanceledEducation(
                                              $event
                                            )
                                          "
                                          @send-locationText="
                                            getLocationTextUncanceledEducation(
                                              $event
                                            )
                                          "
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
                                  @click="saveInstituteUncanceledEducation"
                                >
                                  Сохранить
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                    <v-textarea
                      dense
                      class="small-text"
                      :value="uncanceledEducationLocation"
                      :disabled="editUncanceledEducation.category == null"
                      readonly
                      label="Адрес"
                      rows="2"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card tile>
        <v-card-title> Паспорт </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  selectedPassport
                    ? selectedPassport.series != editPassport.series
                    : editPassport.series != null
                "
                dot
              >
                <v-text-field
                  v-model="editPassport.series"
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
                  selectedPassport
                    ? selectedPassport.num != editPassport.num
                    : editPassport.num != null
                "
                dot
              >
                <v-text-field
                  v-model="editPassport.num"
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
                  selectedPassport
                    ? formatDate(selectedPassport.date_issue) !=
                      formatDate(editPassport.date_issue)
                    : formatDate(editPassport.date_issue) != null
                "
                dot
              >
                <v-text-field
                  v-model="editPassport.date_issue"
                  type="date"
                  dense
                  label="Дата выдачи"
                  @input="sendPassportDate('date_issue', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="8">
              <v-badge
                color="green"
                :value="
                  selectedPassport
                    ? (Object.assign({}, selectedPassport.issued_by).id !==
                        editPassport.issued_by &&
                        Object.assign({}, selectedPassport.issued_by).id !==
                          Object.assign({}, editPassport.issued_by).id) ||
                      (selectedPassport.issued_by == null &&
                        editPassport.issued_by != undefined)
                    : editPassport.issued_by != null
                "
                dot
              >
                <v-autocomplete
                  class="small-text"
                  v-model="editPassport.issued_by"
                  :items="passportIssued"
                  :item-text="namePassportIssued"
                  item-value="id"
                  dense
                  label="Кем выдан"
                  @input="sendPassportIssued"
                >
                  <template #no-data>
                    <v-menu
                      v-model="menuPassportIssued"
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
                                    v-model="issued_by.name"
                                    dense
                                    label="Кем выдан"
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="issued_by.department_code"
                                    v-mask="'###-###'"
                                    dense
                                    label="Код подразделения"
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
                            @click="savePassportIssued"
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
              <v-text-field
                v-model="editPassport.department_code"
                readonly
                dense
                label="код подразделения"
              />
            </v-col>
            <v-col cols="12">
              <v-badge
                color="green"
                :value="
                  selectedPassport
                    ? selectedPassport.birthplace != editPassport.birthplace
                    : editPassport.birthplace != null
                "
                dot
              >
                <v-text-field
                  v-model="editPassport.birthplace"
                  class="small-text"
                  dense
                  label="место рождения"
                  @input="sendPassport('birthplace', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
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
      <v-card tile>
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
                  class="small-text"
                  v-model="data.document_secrets_access"
                  dense
                  clearable
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
                :value="
                  data.document_medical_certificate !==
                  abit.document_medical_certificate
                "
                dot
              >
                <v-select
                  class="small-text"
                  v-model="data.document_medical_certificate"
                  dense
                  clearable
                  :items="document_medical_certificate"
                  item-text="title"
                  item-value="value"
                  label="Мед. справка"
                  @change="send('document_medical_certificate', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="9">
                  <v-badge
                    color="green"
                    :value="data.document_ppo_group !== abit.document_ppo_group"
                    dot
                  >
                    <v-select
                      class="small-text"
                      v-model="data.document_ppo_group"
                      dense
                      clearable
                      :items="document_ppo_group"
                      item-text="title"
                      item-value="value"
                      label="Кат. ПП от ВК/ВЧ"
                      @input="send('document_ppo_group', $event)"
                    />
                  </v-badge>
                </v-col>
                <v-col cols="3">
                  <v-badge
                    color="green"
                    :value="
                      data.document_ppo_group_card !==
                      abit.document_ppo_group_card
                    "
                    dot
                  >
                    <v-checkbox
                      hint="др.д"
                      persistent-hint
                      dense
                      class="no-wrap-hint"
                      v-model="data.document_ppo_group_card"
                      @change="send('document_ppo_group_card', $event)"
                    />
                  </v-badge>
                </v-col>
              </v-row>
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
                  clearable
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
                  :disabled="data.document_mvd_availability !== 'true'"
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
      <v-card tile>
        <v-data-table
          :headers="headers"
          :items="schoolMarks"
          height="355px"
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
                @click:outside="clickOutsideMark"
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
                      @click:outside="clickOutsideMarks"
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
                                    v-for="(
                                      n, index
                                    ) in notUsedSchoolMarksSubjects"
                                    :key="index"
                                    cols="6"
                                  >
                                    <v-row>
                                      <v-col cols="5">
                                        {{ n.name }}
                                      </v-col>
                                      <v-col cols="6">
                                        <v-text-field
                                          v-model="markList[index]"
                                          dense
                                          v-mask="'#'"
                                          :rules="[rules.mark]"
                                          :items="marks"
                                          label="Оценка"
                                          @keyup.enter="saveMarkList"
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
                            :items="
                              editList ? notUsedSchoolMarksSubjects : subjects
                            "
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
      <v-card tile>
        <v-card-title>
          Военная служба <v-spacer />
          <v-badge
            color="green"
            :value="
              selectedMilitaryService
                ? selectedMilitaryService.dismissed !=
                  editMilitaryService.dismissed
                : editMilitaryService.dismissed != null
            "
            dot
          >
            <v-checkbox
              v-model="editMilitaryService.dismissed"
              :disabled="editMilitaryService.rank == null"
              dense
              label="В запасе?"
              @change="sendMilitaryService('dismissed', $event)"
            />
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? (Object.assign({}, selectedMilitaryService.rank).id !=
                        editMilitaryService.rank &&
                        Object.assign({}, selectedMilitaryService.rank).id !=
                          Object.assign({}, editMilitaryService.rank).id) ||
                      (selectedMilitaryService.rank === null &&
                        editMilitaryService.rank != null)
                    : editMilitaryService.rank != null
                "
                dot
              >
                <v-select
                  class="small-text"
                  v-model="editMilitaryService.rank"
                  :items="militaryRanks"
                  item-text="name"
                  item-value="id"
                  dense
                  label="Воинское звание"
                  @input="sendMilitaryService('rank', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? selectedMilitaryService.category !=
                      editMilitaryService.category
                    : editMilitaryService.category != null
                "
                dot
              >
                <v-select
                  class="small-text"
                  v-model="editMilitaryService.category"
                  dense
                  :items="categories"
                  item-text="title"
                  item-value="value"
                  :disabled="editMilitaryService.rank == null"
                  label="Категория"
                  @input="sendMilitaryService('category', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? selectedMilitaryService.mobilization !=
                      editMilitaryService.mobilization
                    : editMilitaryService.mobilization != null
                "
                dot
              >
                <v-checkbox
                  v-model="editMilitaryService.mobilization"
                  dense
                  hint="Мобилизован"
                  persistent-hint
                  class="no-wrap-hint"
                  :disabled="editMilitaryService.rank == null"
                  @change="sendMilitaryService('mobilization', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="2">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? selectedMilitaryService.collection !=
                      editMilitaryService.collection
                    : editMilitaryService.collection != null
                "
                dot
              >
                <v-checkbox
                  v-model="editMilitaryService.collection"
                  dense
                  hint="Сборы"
                  persistent-hint
                  class="no-wrap-hint"
                  :disabled="editMilitaryService.rank == null"
                  @change="sendMilitaryService('collection', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? (Object.assign({}, selectedMilitaryService.SVO).id !=
                        editMilitaryService.SVO &&
                        Object.assign({}, selectedMilitaryService.SVO).id !=
                          Object.assign({}, editMilitaryService.SVO).id) ||
                      (selectedMilitaryService.SVO === null &&
                        editMilitaryService.SVO != null)
                    : editMilitaryService.SVO != null
                "
                dot
              >
                <v-select
                  v-model="editMilitaryService.SVO"
                  :items="militarySVO"
                  item-text="name"
                  item-value="id"
                  dense
                  :disabled="editMilitaryService.rank == null"
                  label="СВО"
                  @input="sendMilitaryService('SVO', $event)"
                />
              </v-badge>
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? (Object.assign({}, selectedMilitaryService.place).id !=
                        editMilitaryService.place &&
                        Object.assign({}, selectedMilitaryService.place).id !=
                          Object.assign({}, editMilitaryService.place).id) ||
                      (selectedMilitaryService.place === null &&
                        editMilitaryService.place != null)
                    : editMilitaryService.place != null
                "
                dot
              >
                <v-select
                  v-model="editMilitaryService.place"
                  :items="militaryPlaces"
                  item-text="name"
                  :disabled="editMilitaryService.rank == null"
                  item-value="id"
                  dense
                  label="Где служит"
                  @input="sendMilitaryService('place', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? selectedMilitaryService.post != editMilitaryService.post
                    : editMilitaryService.post != null
                "
                dot
              >
                <v-textarea
                  class="small-text"
                  height="75px"
                  rows="2"
                  :disabled="editMilitaryService.rank == null"
                  v-model="editMilitaryService.post"
                  dense
                  label="Должность"
                  @input="sendMilitaryService('post', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="12">
              <v-badge
                color="green"
                :value="
                  selectedMilitaryService
                    ? (Object.assign({}, selectedMilitaryService.unit).id !=
                        editMilitaryService.unit &&
                        Object.assign({}, selectedMilitaryService.unit).id !=
                          Object.assign({}, editMilitaryService.unit).id) ||
                      (selectedMilitaryService.unit === null &&
                        editMilitaryService.unit != null)
                    : editMilitaryService.unit != null
                "
                dot
              >
                <v-autocomplete
                  dense
                  v-model="editMilitaryService.unit"
                  :items="militaryUnits"
                  item-text="name"
                  item-value="id"
                  :disabled="editMilitaryService.rank == null"
                  label="Воинская часть"
                  @input="sendMilitaryServiceUnit('unit', $event)"
                >
                  <template #no-data>
                    <v-menu
                      v-model="menuMilitaryUnits"
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
                                    v-model="unit.name"
                                    dense
                                    label="Воинская часть"
                                  />
                                </v-col>
                                <v-col cols="9">
                                  <v-textarea
                                    class="small-text"
                                    rows="2"
                                    label="Адрес"
                                    :value="newUnitLocation"
                                    readonly
                                  />
                                </v-col>
                                <v-col cols="3">
                                  <Location
                                    @send-locationObject="
                                      getLocationUnit($event)
                                    "
                                    @send-locationText="
                                      getLocationTextUnit($event)
                                    "
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
                            @click="saveMilitaryUnit"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </v-autocomplete>
                <v-textarea
                  dense
                  class="small-text"
                  :value="unitLocation"
                  :disabled="editMilitaryService.rank == null"
                  readonly
                  label="Адрес"
                  rows="1"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="4">
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
            <v-col cols="8">
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
                  class="no-wrap-label"
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
import Location from '@/components/Location.vue'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DocumentsComponent',
  components: {
    Location,
  },
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
      editMilitaryService: {},
      editEducation: {},
      editUncanceledEducation: {},
      editPassport: {},
      courses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      mark: {},
      markList: [],
      marks: [5, 4, 3, 2],
      tabsEducation: 0,
      institute: {},
      unit: {},
      issued_by: {},
      editDocumentEducation: {},
      editPeriodStudy: {},
      editList: true,
      menuMilitaryUnits: false,
      menuInstitutes: false,
      menuPassportIssued: false,
      menuDocumentEducation: false,
      menuPeriodStudy: false,
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
        { value: 'group_3', title: '3 группа' },
        { value: 'none', title: 'отсутствует' },
      ],
      document_ppo_group: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_3', title: '3 группа' },
        { value: 'group_4', title: '4 группа' },
        { value: 'none', title: 'Отсутствует' },
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
      categories: [
        { value: 'conscription', title: 'По призыву' },
        { value: 'contract', title: 'Контракт' },
      ],
      rules: {
        mark: (value) => value <= 5 || 'Оценка по 5-бальной шкале',
      },
      newEducationLocation: '',
      educationLocation: '',
      locationObjectEducation: {},
      editEducationLocation: {},
      newUncanceledEducationLocation: '',
      uncanceledEducationLocation: '',
      locationObjectUncanceledEducation: {},
      editUncanceledEducationLocation: {},
      newUnitLocation: '',
      unitLocation: '',
      locationObjectUnit: {},
      editUnitLocation: {},
    }
  },
  computed: {
    ...mapGetters([
      'subjects',
      'schoolMarks',
      'institutes',
      'passportIssued',
      'categoryEducation',
      'categoryUncanceledEducation',
      'militaryRanks',
      'militaryPlaces',
      'militarySVO',
      'educations',
      'uncanceledEducations',
      'selectedEducation',
      'selectedUncanceledEducation',
      'selectedMilitaryService',
      'militaryServices',
      'militaryUnits',
      'passports',
      'selectedPassport',
      'locations',
      'location',
      'regions',
      'districts',
      'cities',
      'selectedInstitute',
      'selectedMilitaryUnit',
    ]),
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
    usedSchoolMarksSubjects() {
      return this.schoolMarks.map((item) => item.subject.id)
    },
    notUsedSchoolMarksSubjects() {
      return this.subjects.filter(
        (item) => !this.usedSchoolMarksSubjects.includes(item.id)
      )
    },
    colorBtnDocumentEducation() {
      return (this.selectedEducation
        ? this.selectedEducation.document_education
        : undefined) != undefined
        ? 'green'
        : 'primary'
    },
    computedPeriodStudy() {
      if (this.editPeriodStudy.years && this.editPeriodStudy.months) {
        return `лет-${this.editPeriodStudy.years} мес.-${this.editPeriodStudy.months}`
      } else if (this.editPeriodStudy.years) {
        return `лет-${this.editPeriodStudy.years}`
      } else if (this.editUncanceledEducation.period_study) {
        return this.editUncanceledEducation.period_study
      } else {
        return ''
      }
    },
  },

  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    async data() {
      if (this.data.id) {
        this.fetchSchoolMark(this.data.id)

        await this.selectEducation(this.abit.id)
        if (this.selectedEducation) {
          this.editEducation = Object.assign({}, this.selectedEducation)
          if (this.editEducation.document_education) {
            this.editDocumentEducation = JSON.parse(
              this.editEducation.document_education
            )
          } else {
            this.editDocumentEducation = {}
          }
        } else {
          this.editEducation = {}
        }

        if (this.editEducation.institute) {
          await this.selectInstitute(this.editEducation.institute.id)
          await this.selectLocation(this.selectedInstitute.address.id)
          const foundRegion = this.regions.find(
            (obj) => obj.id === this.location.region.id
          )
          const foundDistrict = this.districts.find(
            (obj) => obj.id === this.location.district.id
          )
          if (this.location.city !== null) {
            const foundCity = this.cities.find(
              (obj) => obj.id === this.location.city.id
            )
            const locationCity =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}` +
              ', ' +
              `${foundCity.status.name}` +
              ' ' +
              `${foundCity.name}`
            this.educationLocation = locationCity
          } else {
            const locationDistrict =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}`
            this.educationLocation = locationDistrict
          }
        } else {
          this.educationLocation = null
        }

        await this.selectUncanceledEducation(this.abit.id)
        if (this.selectedUncanceledEducation) {
          this.editUncanceledEducation = Object.assign(
            {},
            this.selectedUncanceledEducation
          )
        } else {
          this.editUncanceledEducation = {}
        }

        if (this.editUncanceledEducation.institute) {
          await this.selectInstitute(this.editUncanceledEducation.institute.id)
          await this.selectLocation(this.selectedInstitute.address.id)
          const foundRegion = this.regions.find(
            (obj) => obj.id === this.location.region.id
          )
          const foundDistrict = this.districts.find(
            (obj) => obj.id === this.location.district.id
          )
          if (this.location.city !== null) {
            const foundCity = this.cities.find(
              (obj) => obj.id === this.location.city.id
            )
            const locationCity =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}` +
              ', ' +
              `${foundCity.status.name}` +
              ' ' +
              `${foundCity.name}`
            this.uncanceledEducationLocation = locationCity
          } else {
            const locationDistrict =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}`
            this.uncanceledEducationLocation = locationDistrict
          }
        } else {
          this.uncanceledEducationLocation = null
        }

        await this.selectMilitaryService(this.abit.id)
        if (this.selectedMilitaryService) {
          this.editMilitaryService = Object.assign(
            {},
            this.selectedMilitaryService
          )
        } else {
          this.editMilitaryService = {}
        }

        if (this.editMilitaryService.unit) {
          await this.selectMilitaryUnit(this.editMilitaryService.unit.id)
          await this.selectLocation(this.selectedMilitaryUnit.address.id)
          const foundRegion = this.regions.find(
            (obj) => obj.id === this.location.region.id
          )
          const foundDistrict = this.districts.find(
            (obj) => obj.id === this.location.district.id
          )
          if (this.location.city !== null) {
            const foundCity = this.cities.find(
              (obj) => obj.id === this.location.city.id
            )
            const locationCity =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}` +
              ', ' +
              `${foundCity.status.name}` +
              ' ' +
              `${foundCity.name}`
            this.unitLocation = locationCity
          } else {
            const locationDistrict =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}`
            this.unitLocation = locationDistrict
          }
        } else {
          this.unitLocation = null
        }

        await this.selectPassport(this.abit.id)
        if (this.selectedPassport) {
          this.editPassport = Object.assign({}, this.selectedPassport)
          this.editPassport.date_issue = this.formatDate(
            this.selectedPassport.date_issue
          )
        } else {
          this.editPassport = {}
        }
      }
    },
  },

  created() {
    this.fetchSubjects()
    this.fetchInstitutes()
    this.fetchPassportIssued()
    this.fetchCategoryEducation()
    this.fetchCategoryUncanceledEducation()
    this.fetchMilitaryRanks()
    this.fetchMilitaryPlaces()
    this.fetchMilitarySVO()
    this.fetchEducations()
    this.fetchUncanceledEducations()
    this.fetchMilitaryServices()
    this.fetchMilitaryUnits()
    this.fetchPassports()
    this.fetchLocations()
    this.fetchRegions()
    this.fetchDistricts()
    this.fetchCities()
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
      'fetchPassportIssued',
      'addPassportIssued',
      'fetchCategoryEducation',
      'fetchCategoryUncanceledEducation',
      'fetchMilitaryRanks',
      'fetchMilitaryPlaces',
      'fetchMilitarySVO',
      'fetchEducations',
      'fetchUncanceledEducations',
      'selectEducation',
      'selectUncanceledEducation',
      'addEducation',
      'addUncanceledEducation',
      'updateEducation',
      'updateUncanceledEducation',
      'fetchMilitaryServices',
      'selectMilitaryService',
      'addMilitaryService',
      'updateMilitaryService',
      'fetchMilitaryUnits',
      'addMilitaryUnit',
      'fetchPassports',
      'selectPassport',
      'addPassport',
      'updatePassport',
      'fetchLocations',
      'selectLocation',
      'addLocation',
      'updateLocation',
      'fetchRegions',
      'fetchDistricts',
      'fetchCities',
      'selectInstitute',
      'selectMilitaryUnit',
    ]),
    closePeriodStudy(event) {
      if (event == false) {
        this.editPeriodStudy = {}
      }
    },

    namePassportIssued(item) {
      return `(${item.department_code}) ${item.name}`
    },

    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },

    clickOutsideMark() {
      this.mark = {}
    },
    clickOutsideMarks() {
      this.markList = {}
    },

    updateMark(event) {
      this.mark.mark = event
    },
    updateMarkSubject(event) {
      this.mark.subject = this.subjects[event - 1]
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
          subject: this.notUsedSchoolMarksSubjects[key].id,
          abitId: this.abit.id,
        }
        this.addSchoolMark(M)
      }
      this.markList = []
      this.dialogMarkList = false
      this.dialogMark = false
    },
    editMark(item) {
      this.editList = false
      this.mark = item
      this.dialogMark = true
    },

    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
    formatDateYear(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY')
    },
    savePassportIssued() {
      const newPassportIssued = Object.assign({}, this.issued_by)
      this.addPassportIssued(newPassportIssued)
      this.menuPassportIssued = false
      this.fetchPassportIssued()
      this.issued_by = {}
    },

    sendPassportDate(key, event) {
      this.editPassport.date_issue = this.formatDate(event)
      const data = {}
      data[key] = this.editPassport.date_issue
      this.$emit('child-passport', data)
    },
    sendPassport(key, event) {
      this.editPassport[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-passport', data)
    },
    sendPassportIssued(event) {
      this.editPassport.issued_by = event
      this.editPassport.department_code =
        this.passportIssued[event - 1].department_code
      this.sendPassport('issued_by', this.editPassport.issued_by)
      this.sendPassport('department_code', this.editPassport.department_code)
    },

    async saveInstituteEducation() {
      await this.addLocation(this.locationObjectEducation)

      this.institute.address = this.location.id
      this.locationObjectEducation = null

      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
    async saveInstituteUncanceledEducation() {
      await this.addLocation(this.locationObjectUncanceledEducation)

      this.institute.address = this.location.id
      this.locationObjectUncanceledEducation = null

      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
    async sendEducationInstitute(key, event) {
      await this.selectInstitute(this.editEducation.institute)
      await this.selectLocation(this.selectedInstitute.address.id)
      const foundRegion = this.regions.find(
        (obj) => obj.id === this.location.region.id
      )
      const foundDistrict = this.districts.find(
        (obj) => obj.id === this.location.district.id
      )
      if (this.location.city !== null) {
        const foundCity = this.cities.find(
          (obj) => obj.id === this.location.city.id
        )
        const locationCity =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}` +
          ', ' +
          `${foundCity.status.name}` +
          ' ' +
          `${foundCity.name}`
        this.educationLocation = locationCity
      } else {
        const locationDistrict =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}`
        this.educationLocation = locationDistrict
      }

      this.editEducation[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-education', data)
    },
    sendDocumentEducation(event) {
      const data = JSON.stringify(event)
      this.sendEducation('document_education', data)
      this.menuDocumentEducation = false
    },
    sendEducationDate(event) {
      const data = moment(event, 'YYYY').format('YYYY-MM-DD')
      this.sendEducation('date_end', data)
    },
    sendEducation(key, event) {
      this.editEducation[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-education', data)
    },

    async sendUncanceledEducationInstitute(key, event) {
      console.log(1, event)
      await this.selectInstitute(this.editUncanceledEducation.institute)
      await this.selectLocation(this.selectedInstitute.address.id)
      const foundRegion = this.regions.find(
        (obj) => obj.id === this.location.region.id
      )
      const foundDistrict = this.districts.find(
        (obj) => obj.id === this.location.district.id
      )
      if (this.location.city !== null) {
        const foundCity = this.cities.find(
          (obj) => obj.id === this.location.city.id
        )
        const locationCity =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}` +
          ', ' +
          `${foundCity.status.name}` +
          ' ' +
          `${foundCity.name}`
        this.uncanceledEducationLocation = locationCity
      } else {
        const locationDistrict =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}`
        this.uncanceledEducationLocation = locationDistrict
      }

      this.editUncanceledEducation[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-uncanceledEducation', data)
    },
    sendUncanceledEducation(key, event) {
      this.editUncanceledEducation[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-uncanceledEducation', data)
    },
    sendUncanceledEducationDate(key, event) {
      const data = moment(event, 'YYYY').format('YYYY-MM-DD')
      this.sendUncanceledEducation(key, data)
    },
    sendPeriodStudy() {
      const data = this.computedPeriodStudy
      this.editPeriodStudy = {}
      this.menuPeriodStudy = false
      this.sendUncanceledEducation('period_study', data)
    },

    sendMilitaryService(key, event) {
      this.editMilitaryService[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-militaryService', data)
    },
    async sendMilitaryServiceUnit(key, event) {
      await this.selectMilitaryUnit(this.editMilitaryService.unit)
      await this.selectLocation(this.selectedMilitaryUnit.address.id)
      const foundRegion = this.regions.find(
        (obj) => obj.id === this.location.region.id
      )
      const foundDistrict = this.districts.find(
        (obj) => obj.id === this.location.district.id
      )
      if (this.location.city !== null) {
        const foundCity = this.cities.find(
          (obj) => obj.id === this.location.city.id
        )
        const locationCity =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}` +
          ', ' +
          `${foundCity.status.name}` +
          ' ' +
          `${foundCity.name}`
        this.unitLocation = locationCity
      } else {
        const locationDistrict =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}`
        this.unitLocation = locationDistrict
      }

      this.editUnitLocation[key] = event
      const data = {}
      data[key] = event
      /////////////////////////////////////////////////////////////// store добавить
      this.$emit('child-militaryService', data)
    },
    async saveMilitaryUnit() {
      await this.addLocation(this.locationObjectUnit)

      this.unit.address = this.location.id
      this.locationObjectUnit = null

      const newMilitaryUnit = Object.assign({}, this.unit)
      this.addMilitaryUnit(newMilitaryUnit)
      this.menuMilitaryUnits = false
      this.fetchMilitaryUnits()
      this.unit = {}
    },
    getLocationEducation(event) {
      this.locationObjectEducation = event
    },
    getLocationTextEducation(event) {
      this.educationLocation = `${event}`
      this.newEducationLocation = `${event}`
    },
    getLocationUncanceledEducation(event) {
      this.locationObjectUncanceledEducation = event
    },
    getLocationTextUncanceledEducation(event) {
      this.uncanceledEducationLocation = `${event}`
      this.newUncanceledEducationLocation = `${event}`
    },
    getLocationUnit(event) {
      this.locationObjectUnit = event
    },
    getLocationTextUnit(event) {
      this.unitLocation = `${event}`
      this.newUnitLocation = `${event}`
    },
  },
}
</script>
<style>
.no-wrap-hint .v-messages__message {
  white-space: nowrap;
}
.no-wrap-label {
  white-space: nowrap;
}
</style>
