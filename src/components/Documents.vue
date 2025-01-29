<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card tile>
        <v-tabs
          v-model="tabsEducation"
          fixed-tabs
          background-color="info"
          dark
        >
          <v-tab> Образование </v-tab>
          <v-tab> Текущее </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabsEducation">
          <v-tab-item>
            <v-card height="280px">
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-badge
                      color="success"
                      :value="
                        (Object.assign({}, abit.education_category).id !==
                          data.education_category &&
                          Object.assign({}, abit.education_category).id !==
                            Object.assign({}, data.education_category).id) ||
                        (abit.education_category === null &&
                          data.education_category)
                      "
                      dot
                    >
                      <v-autocomplete
                        class="small-text"
                        v-model="data.education_category"
                        :items="categoryEducation"
                        item-text="name"
                        return-object
                        clearable
                        item-value="id"
                        label="Категория"
                        @input="inputSend('education_category', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="success"
                      :value="
                        formatDateYear(abit.education_date_end) !==
                        formatDateYear(data.education_date_end)
                      "
                      dot
                    >
                      <v-autocomplete
                        :value="formatDateYear(data.education_date_end)"
                        :disabled="data.education_category == null"
                        :items="years"
                        label="Год окончания"
                        @input="sendDate('education_date_end', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col cols="4">
                    <v-badge
                      color="success"
                      :value="
                        data.education_document != abit.education_document
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
                            :disabled="data.education_category == null"
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
                      color="success"
                      :value="
                        (Object.assign({}, abit.education_institute).id !==
                          data.education_institute &&
                          Object.assign({}, abit.education_institute).id !==
                            Object.assign({}, data.education_institute).id) ||
                        (abit.education_institute === null &&
                          data.education_institute)
                      "
                      dot
                    >
                      <v-autocomplete
                        v-model="data.education_institute"
                        :items="getInstitutes"
                        :disabled="data.education_category == null"
                        item-text="name"
                        item-value="id"
                        label="Образовательное учреждение"
                        clearable
                        return-object
                        persistent-hint
                        @input="
                          sendEducationInstitute('education_institute', $event)
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

                            <v-form
                              ref="formEducationInstitute"
                              v-model="formEducationInstituteValid"
                            >
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
                                          :rules="[rules.required]"
                                          label="Образовательное учреждение"
                                        />
                                      </v-col>
                                      <v-col cols="12">
                                        <v-textarea
                                          class="small-text"
                                          rows="1"
                                          label="Адрес"
                                          :rules="[rules.required]"
                                          v-model="institute.address"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions>
                                  <v-spacer />
                                  <v-btn
                                    color="primary"
                                    text
                                    dense
                                    @click="saveInstituteEducation"
                                    :disabled="!formEducationInstituteValid"
                                  >
                                    Сохранить
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-form>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                    <v-textarea
                      dense
                      class="small-text"
                      :value="data.education_institute?.address"
                      :disabled="data.education_category == null"
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
            <v-card height="280px">
              <v-card-text>
                <v-row dense>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        (Object.assign({}, abit.uncanceledEducation_category)
                          .id !== data.uncanceledEducation_category &&
                          Object.assign({}, abit.uncanceledEducation_category)
                            .id !==
                            Object.assign({}, data.uncanceledEducation_category)
                              .id) ||
                        (abit.uncanceledEducation_category === null &&
                          data.uncanceledEducation_category)
                      "
                      dot
                    >
                      <v-autocomplete
                        class="small-text"
                        dense
                        v-model="data.uncanceledEducation_category"
                        :items="categoryUncanceledEducation"
                        item-text="name"
                        item-value="id"
                        clearable
                        label="Категория"
                        @input="
                          inputSend('uncanceledEducation_category', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        formatDateYear(data.uncanceledEducation_date_end) !=
                        formatDateYear(abit.uncanceledEducation_date_end)
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        :value="
                          formatDateYear(data.uncanceledEducation_date_end)
                        "
                        :items="years"
                        :disabled="data.uncanceledEducation_category == null"
                        label="Год окончания"
                        @input="
                          sendDate('uncanceledEducation_date_end', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        formatDateYear(
                          data.uncanceledEducation_date_admission,
                        ) !=
                        formatDateYear(abit.uncanceledEducation_date_admission)
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        :value="
                          formatDateYear(
                            data.uncanceledEducation_date_admission,
                          )
                        "
                        :disabled="data.uncanceledEducation_category == null"
                        :items="years"
                        label="Год поступления"
                        @input="
                          sendDate('uncanceledEducation_date_admission', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        data.uncanceledEducation_period_study !=
                        abit.uncanceledEducation_period_study
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
                            :disabled="
                              data.uncanceledEducation_category == null
                            "
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
                      color="success"
                      :value="
                        data.uncanceledEducation_course !=
                        abit.uncanceledEducation_course
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="data.uncanceledEducation_course"
                        :disabled="data.uncanceledEducation_category == null"
                        :items="courses"
                        label="Курс"
                        @input="send('uncanceledEducation_course', $event)"
                      />
                    </v-badge>
                    <v-badge
                      color="success"
                      :value="
                        data.uncanceledEducation_semesters_end !=
                        abit.uncanceledEducation_semesters_end
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="data.uncanceledEducation_semesters_end"
                        :disabled="data.uncanceledEducation_category == null"
                        :items="semesters"
                        label="Семестров закрыто"
                        @input="
                          send('uncanceledEducation_semesters_end', $event)
                        "
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="8"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        data.uncanceledEducation_note !=
                        abit.uncanceledEducation_note
                      "
                      dot
                    >
                      <v-textarea
                        height="75px"
                        class="small-text"
                        dense
                        rows="2"
                        :disabled="data.uncanceledEducation_category == null"
                        v-model="data.uncanceledEducation_note"
                        label="Примечание"
                        @input="send('uncanceledEducation_note', $event)"
                      />
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="12"
                    dense
                  >
                    <v-badge
                      color="success"
                      :value="
                        (Object.assign({}, abit.uncanceledEducation_institute)
                          .id !== data.uncanceledEducation_institute &&
                          Object.assign({}, abit.uncanceledEducation_institute)
                            .id !==
                            Object.assign(
                              {},
                              data.uncanceledEducation_institute,
                            ).id) ||
                        (abit.uncanceledEducation_institute === null &&
                          data.uncanceledEducation_institute)
                      "
                      dot
                    >
                      <v-autocomplete
                        dense
                        v-model="data.uncanceledEducation_institute"
                        :disabled="data.uncanceledEducation_category == null"
                        :items="institutes"
                        item-text="name"
                        item-value="id"
                        clearable
                        return-object
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
                            <v-form
                              ref="formUncanceledEducationInstitute"
                              v-model="formUncanceledEducationInstituteValid"
                            >
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
                                          :rules="[rules.required]"
                                          label="Образовательное учреждение"
                                        />
                                      </v-col>
                                      <v-col cols="9">
                                        <v-textarea
                                          class="small-text"
                                          rows="1"
                                          label="Адрес"
                                          :rules="[rules.required]"
                                          v-model="institute.address"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions>
                                  <v-spacer />
                                  <v-btn
                                    color="primary"
                                    text
                                    dense
                                    @click="saveInstituteUncanceledEducation"
                                    :disabled="!formUncanceledInstituteValid"
                                  >
                                    Сохранить
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-form>
                          </v-menu>
                        </template>
                      </v-autocomplete>
                    </v-badge>
                    <v-textarea
                      dense
                      class="small-text"
                      :value="data.uncanceledEducation_institute?.address"
                      :disabled="data.uncanceledEducation_category == null"
                      readonly
                      label="Адрес"
                      rows="1"
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
                color="success"
                :value="data.passport_series != abit.passport_series"
                dot
              >
                <v-text-field
                  v-model="data.passport_series"
                  v-mask="'####'"
                  dense
                  label="серия"
                  @input="send('passport_series', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="data.passport_num != abit.passport_num"
                dot
              >
                <v-text-field
                  v-model="data.passport_num"
                  v-mask="'######'"
                  dense
                  label="номер"
                  @input="send('passport_num', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  formatDate(data.passport_date_issue) !==
                  formatDate(abit.passport_date_issue)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.passport_date_issue)"
                  type="date"
                  dense
                  label="Дата выдачи"
                  @input="sendDate('passport_date_issue', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="8">
              <v-badge
                color="success"
                :value="data.passport_issued_by !== abit.passport_issued_by"
                dot
              >
                <v-autocomplete
                  class="small-text"
                  v-model="data.passport_issued_by"
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
                      <v-form
                        ref="formPassport"
                        v-model="formPassportValid"
                      >
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
                                      :rules="[rules.required]"
                                      label="Кем выдан"
                                    />
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="issued_by.department_code"
                                      v-mask="'###-###'"
                                      dense
                                      :rules="[rules.department_code]"
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
                              color="primary"
                              text
                              dense
                              @click="savePassportIssued"
                              :disabled="!formPassportValid"
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-menu>
                  </template>
                </v-autocomplete>
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="data.passport_department_code"
                readonly
                dense
                label="код подразделения"
              />
            </v-col>
            <v-col cols="12">
              <v-badge
                color="success"
                :value="data.passport_birthplace !== abit.passport_birthplace"
                dot
              >
                <v-text-field
                  v-model="data.passport_birthplace"
                  class="small-text"
                  dense
                  label="место рождения"
                  @input="send('passport_birthplace', $event)"
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
                color="success"
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
                color="success"
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
                color="success"
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
                  label="Допуск к ССГТ"
                  @input="send('document_secrets_access', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
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
                  label="Мед. справка"
                  @change="send('document_medical_certificate', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="9">
                  <v-badge
                    color="success"
                    :value="data.document_ppo_group !== abit.document_ppo_group"
                    dot
                  >
                    <v-select
                      class="small-text"
                      v-model="data.document_ppo_group"
                      dense
                      clearable
                      :items="document_ppo_group"
                      label="Кат. ПП от ВК/ВЧ"
                      @input="send('document_ppo_group', $event)"
                    />
                  </v-badge>
                </v-col>
                <v-col cols="3">
                  <v-badge
                    color="success"
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
                color="success"
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
                  label="Справка МВД"
                  @change="send('document_mvd_availability', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="7">
              <v-badge
                color="success"
                :value="
                  data.document_mvd_prosecution != abit.document_mvd_prosecution
                "
                dot
              >
                <v-select
                  v-model="data.document_mvd_prosecution"
                  dense
                  :items="document_mvd_prosecution"
                  :disabled="!data.document_mvd_availability"
                  label="Привлечение к ответственности"
                  multiple
                  chips
                  @input="send('document_mvd_prosecution', $event)"
                >
                  <template #selection="{ item, index }">
                    <v-chip v-if="index < 1">
                      <span>{{ item }}</span>
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
          height="315px"
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
                <v-form
                  ref="formMark"
                  v-model="formMarkValid"
                >
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
                        <v-form
                          ref="formMarks"
                          v-model="formMarksValid"
                        >
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
                        </v-form>
                      </v-dialog>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-autocomplete
                              :value="mark.mark"
                              :items="marks"
                              :rules="[rules.required]"
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
                              :rules="[rules.required]"
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
                        :disabled="!formMarkValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
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
            color="success"
            :value="
              data.militaryService_dismissed !== abit.militaryService_dismissed
            "
            dot
          >
            <v-checkbox
              v-model="data.militaryService_dismissed"
              :disabled="data.militaryService_rank == null"
              dense
              label="В запасе?"
              @change="send('militaryService_dismissed', $event)"
            />
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.militaryService_rank).id !==
                    data.militaryService_rank &&
                    Object.assign({}, abit.militaryService_rank).id !==
                      Object.assign({}, data.militaryService_rank).id) ||
                  (abit.militaryService_rank === null &&
                    data.militaryService_rank)
                "
                dot
              >
                <v-select
                  class="small-text"
                  v-model="data.militaryService_rank"
                  :items="militaryRanks"
                  item-text="name"
                  item-value="id"
                  dense
                  clearable
                  label="Воинское звание"
                  @input="inputSend('militaryService_rank', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="
                  data.militaryService_category !==
                  abit.militaryService_category
                "
                dot
              >
                <v-select
                  class="small-text"
                  v-model="data.militaryService_category"
                  dense
                  :items="categories"
                  item-text="title"
                  item-value="value"
                  :disabled="data.militaryService_rank == null"
                  label="Категория"
                  @input="send('militaryService_category', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="3">
              <v-badge
                color="success"
                :value="
                  data.militaryService_mobilization !==
                  abit.militaryService_mobilization
                "
                dot
              >
                <v-checkbox
                  v-model="data.militaryService_mobilization"
                  dense
                  hint="Мобилизован"
                  persistent-hint
                  class="no-wrap-hint"
                  :disabled="data.militaryService_rank == null"
                  @change="send('militaryService_mobilization', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="2">
              <v-badge
                color="success"
                :value="
                  data.militaryService_collection !==
                  abit.militaryService_collection
                "
                dot
              >
                <v-checkbox
                  v-model="data.militaryService_collection"
                  dense
                  hint="Сборы"
                  persistent-hint
                  class="no-wrap-hint"
                  :disabled="data.militaryService_rank == null"
                  @change="send('militaryService_collection', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.militaryService_SVO).id !==
                    data.militaryService_SVO &&
                    Object.assign({}, abit.militaryService_SVO).id !==
                      Object.assign({}, data.militaryService_SVO).id) ||
                  (abit.militaryService_SVO === null &&
                    data.militaryService_SVO)
                "
                dot
              >
                <v-select
                  v-model="data.militaryService_SVO"
                  :items="militarySVO"
                  item-text="name"
                  item-value="id"
                  dense
                  :disabled="data.militaryService_rank == null"
                  label="ВБД/СВО"
                  @input="send('militaryService_SVO', $event)"
                />
              </v-badge>
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.militaryService_place).id !==
                    data.militaryService_place &&
                    Object.assign({}, abit.militaryService_place).id !==
                      Object.assign({}, data.militaryService_place).id) ||
                  (abit.militaryService_place === null &&
                    data.militaryService_place)
                "
                dot
              >
                <v-select
                  v-model="data.militaryService_place"
                  :items="militaryPlaces"
                  item-text="name"
                  :disabled="data.militaryService_rank == null"
                  item-value="id"
                  dense
                  label="Где служит"
                  @input="send('militaryService_place', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="data.militaryService_post !== abit.militaryService_post"
                dot
              >
                <v-textarea
                  class="small-text"
                  height="75px"
                  rows="2"
                  :disabled="data.militaryService_rank == null"
                  v-model="data.militaryService_post"
                  dense
                  label="Должность"
                  @input="send('militaryService_post', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="12">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.militaryService_unit).id !==
                    data.militaryService_unit &&
                    Object.assign({}, abit.militaryService_unit).id !==
                      Object.assign({}, data.militaryService_unit).id) ||
                  (abit.militaryService_unit === null &&
                    data.militaryService_unit)
                "
                dot
              >
                <v-autocomplete
                  dense
                  v-model="data.militaryService_unit"
                  :items="militaryUnits"
                  item-text="name"
                  item-value="id"
                  :disabled="data.militaryService_rank == null"
                  label="Воинская часть"
                  return-object
                  clearable
                  @input="
                    sendMilitaryServiceUnit('militaryService_unit', $event)
                  "
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
                      <v-form
                        ref="formUnit"
                        v-model="formUnitValid"
                      >
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
                                    :rules="[rules.required]"
                                    label="Воинская часть"
                                    hint="Воинская часть №"
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-textarea
                                    class="small-text"
                                    rows="1"
                                    label="Адрес"
                                    hint="ИНДЕКС, обл.,г."
                                    :rules="[rules.required]"
                                    v-model="unit.address"
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="unit.mail"
                                    dense
                                    label="Почта/ЗС СПД/СЭД"
                                  />
                                </v-col>
                                <v-col cols="3"> </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              color="primary"
                              text
                              dense
                              @click="saveMilitaryUnit"
                              :disabled="!formUnitValid"
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-menu>
                  </template>
                </v-autocomplete>
                <v-textarea
                  dense
                  class="small-text"
                  :value="data.militaryService_unit?.address"
                  :disabled="data.militaryService_rank == null"
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
                color="success"
                :value="data.personal_number !== abit.personal_number"
                dot
              >
                <v-text-field
                  v-model="data.personal_number"
                  dense
                  :rules="[rules.personal_number]"
                  label="Личный номер"
                  @input="normalizationSend('personal_number', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="8">
              <v-badge
                color="success"
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
        '1 группа',
        '2 группа',
        '1 группа (в процессе)',
        '2 группа (в процессе)',
        '3 группа',
        'Отсутствует',
      ],
      document_ppo_group: [
        '1 группа',
        '2 группа',
        '3 группа',
        '4 группа',
        'Отсутствует',
      ],
      document_medical_certificate: ['Имеется', 'Отсутствует'],
      document_mvd_availability: ['Имеется', 'Отсутствует'],
      document_mvd_prosecution: [
        'Уголовная',
        'Административная',
        'Факт учёта в ОПДН',
      ],
      categories: ['По призыву', 'Контракт'],
      rules: {
        mark: (value) => value <= 5 || 'Оценка по 5-бальной шкале',
        required: (value) => !!value || 'Обязательно.',
        department_code: (value) =>
          (!!value && value.length == 7) || 'Некорректно.',
        personal_number: (value) =>
          !value || value?.length < 10 || 'Некорректно.',
      },
      formUnitValid: false,
      formMarkValid: false,
      formMarksValid: false,
      formPassportValid: false,
      formEducationInstituteValid: false,
      formUncanceledEducationInstituteValid: false,
      formUncanceledInstituteValid: false,
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
      'militaryUnits',
      'regions',
      'districts',
      'cities',
      'selectedInstitute',
      'selectedMilitaryUnit',
    ]),

    getInstitutes() {
      if (this.data.education_category?.abbreviation == 'ПКУ') {
        return this.institutes.filter((s) => s.type == 'ПКУ')
      } else if (this.data.education_category?.abbreviation == 'СВУ') {
        return this.institutes.filter((s) => s.type == 'СВУ')
      } else if (this.data.education_category?.abbreviation == 'КК') {
        return this.institutes.filter((s) => s.type == 'КК')
      } else if (this.data.education_category?.abbreviation == 'ВМУ') {
        return this.institutes.filter((s) => s.type == 'НВМУ')
      } else if (this.data.education_category?.abbreviation == 'ОШИ с ПЛП') {
        return this.institutes.filter((s) => s.type == 'ПЛП')
      } else {
        return this.institutes.filter((s) => s.type == null)
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
    usedSchoolMarksSubjects() {
      return this.schoolMarks.map((item) => item.subject.id)
    },
    notUsedSchoolMarksSubjects() {
      return this.subjects.filter(
        (item) => !this.usedSchoolMarksSubjects.includes(item.id),
      )
    },
    colorBtnDocumentEducation() {
      return (this.data ? this.data.education_document : undefined) != undefined
        ? 'success'
        : 'primary'
    },
    computedPeriodStudy() {
      if (this.editPeriodStudy.years && this.editPeriodStudy.months) {
        return `лет-${this.editPeriodStudy.years} мес.-${this.editPeriodStudy.months}`
      } else if (this.editPeriodStudy.years) {
        return `лет-${this.editPeriodStudy.years}`
      } else if (this.data.uncanceledEducation_period_study) {
        return this.data.uncanceledEducation_period_study
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

        if (this.data.education_document) {
          this.editDocumentEducation = JSON.parse(this.data.education_document)
        } else {
          this.editDocumentEducation = {}
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
    this.fetchMilitaryUnits()
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
      'fetchMilitaryUnits',
      'addMilitaryUnit',
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
    inputSend(key, value) {
      this.send(key, value?.id ? value?.id : value)
      if (value === null) {
        if (key == 'militaryService_rank') {
          this.send('militaryService_post', null)
          this.send('militaryService_place', null)
          this.send('militaryService_unit', null)
          this.send('militaryService_category', null)
          this.send('militaryService_dismissed', false)
          this.send('militaryService_mobilization', false)
          this.send('militaryService_collection', false)
          this.send('militaryService_SVO', null)
        } else if (key == 'education_category') {
          this.send('education_date_end', null)
          this.send('education_institute', null)
          this.send('education_document', null)
        } else if (key == 'uncanceledEducation_category') {
          this.send('uncanceledEducation_date_admission', null)
          this.send('uncanceledEducation_date_end', null)
          this.send('uncanceledEducation_period_study', null)
          this.send('uncanceledEducation_course', null)
          this.send('uncanceledEducation_semesters_end', null)
          this.send('uncanceledEducation_institute', null)
          this.send('uncanceledEducation_note', null)
        }
      }
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

    sendPassportIssued(event) {
      this.data.passport_issued_by = this.passportIssued[event - 1]
      this.data.passport_department_code =
        this.passportIssued[event - 1].department_code
      this.send('passport_issued_by', this.data.passport_issued_by)
      this.send('passport_department_code', this.data.passport_department_code)
    },

    async saveInstituteEducation() {
      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
    async saveInstituteUncanceledEducation() {
      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
    async sendEducationInstitute(key, event) {
      this.data.education_institute = event
      this.send('education_institute', event?.id ? event?.id : null)
    },
    sendDocumentEducation(event) {
      const data = JSON.stringify(event)
      this.data.education_document = data
      this.send('education_document', data)
      this.menuDocumentEducation = false
    },
    async sendUncanceledEducationInstitute(key, event) {
      this.data.uncanceledEducation_institute = event

      this.send('uncanceledEducation_institute', event?.id ? event?.id : null)
    },
    sendPeriodStudy() {
      const data = this.computedPeriodStudy
      this.menuPeriodStudy = false
      this.data.uncanceledEducation_period_study = data
      this.send('uncanceledEducation_period_study', data)
    },

    async sendMilitaryServiceUnit(key, event) {
      this.data.militaryService_unit = event
      this.send('militaryService_unit', event?.id ? event?.id : null)
    },
    async saveMilitaryUnit() {
      const newMilitaryUnit = Object.assign({}, this.unit)
      this.addMilitaryUnit(newMilitaryUnit)
      this.menuMilitaryUnits = false
      this.fetchMilitaryUnits()
      this.unit = {}
    },

    normalizationSend(key, value) {
      if (this.data[key].length > 0) {
        this.data[key] =
          this.data[key].charAt(0).toUpperCase() +
          this.data[key].slice(1).toUpperCase()
      }
      this.send('personal_number', this.data[key])
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
