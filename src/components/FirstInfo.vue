<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card tile>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  dense
                  :value="data.id"
                  label="№ п/п"
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="abit.personal_file_reg !== data.personal_file_reg"
                  dot
                >
                  <v-text-field
                    v-model="data.personal_file_reg"
                    dense
                    label="р/н"
                    @input="send('personal_file_reg', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="
                    formatDate(abit.personal_file_date_reg) !==
                    formatDate(data.personal_file_date_reg)
                  "
                  dot
                >
                  <v-text-field
                    label="Дата"
                    dense
                    :value="formatDate(data.personal_file_date_reg)"
                    type="date"
                    @input="sendDate('personal_file_date_reg', $event)"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card tile>
          <v-card-title>Абитуриент</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="abit.lastName !== data.lastName"
                  dot
                >
                  <v-text-field
                    v-model="data.lastName"
                    dense
                    label="Фамилия"
                    @input="send('lastName', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="abit.firstName !== data.firstName"
                  dot
                >
                  <v-text-field
                    v-model="data.firstName"
                    dense
                    label="Имя"
                    @input="send('firstName', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="abit.surName !== data.surName"
                  dot
                >
                  <v-text-field
                    v-model="data.surName"
                    dense
                    label="Отчество"
                    @input="send('surName', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="2">
                <v-badge
                  color="success"
                  :value="
                    abit.personal_file_number !== data.personal_file_number
                  "
                  dot
                >
                  <v-text-field
                    v-model="data.personal_file_number"
                    col
                    dense
                    required
                    readonly
                    :rules="[rules.required]"
                    label="№ ЛД"
                    @input="send('personal_file_number', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="
                    formatDate(abit.birthday) !== formatDate(data.birthday)
                  "
                  dot
                >
                  <v-text-field
                    :value="formatDate(data.birthday)"
                    dense
                    type="date"
                    label="День рождения"
                    @input="sendDate('birthday', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="6">
                <v-badge
                  color="success"
                  :value="
                    abit.personal_file_existence !==
                    data.personal_file_existence
                  "
                  dot
                >
                  <v-select
                    class="small-text"
                    v-model="data.personal_file_existence"
                    dense
                    :items="personal_file_existence"
                    label="Наличие личного дела"
                    @input="send('personal_file_existence', $event)"
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
                    (Object.assign({}, abit.nationality).id !==
                      data.nationality &&
                      Object.assign({}, abit.nationality).id !==
                        Object.assign({}, data.nationality).id) ||
                    (abit.nationality === null && data.nationality)
                  "
                  dot
                >
                  <v-autocomplete
                    class="small-text"
                    v-model="data.nationality"
                    clearable
                    dense
                    small
                    :items="nationality"
                    item-text="name"
                    item-value="id"
                    label="Национальность"
                    @input="send('nationality', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="3">
                <v-badge
                  color="success"
                  :value="abit.gender !== data.gender"
                  dot
                >
                  <v-select
                    class="small-text"
                    v-model="data.gender"
                    dense
                    :items="genders"
                    label="пол"
                    @input="send('gender', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="3">
                <v-badge
                  color="success"
                  :value="abit.family_status !== data.family_status"
                  dot
                >
                  <v-select
                    class="small-text"
                    v-model="data.family_status"
                    dense
                    :items="family_status"
                    item-text="title"
                    item-value="value"
                    label="семейное положение"
                    @input="send('family_status', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="2">
                <v-badge
                  color="success"
                  :value="
                    String(abit.abit_childrens) !== String(data.abit_childrens)
                  "
                  dot
                >
                  <v-text-field
                    v-model="data.abit_childrens"
                    dense
                    min="0"
                    max="10"
                    label="Дети"
                    type="number"
                    @input="send('abit_childrens', parseInt($event, 10))"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          height="110px"
          tile
        >
          <v-card-text>
            <v-row>
              <v-col cols="9">
                <v-badge
                  color="success"
                  :value="this.editResidence.residence ? true : false"
                  dot
                >
                  <v-textarea
                    class="small-text"
                    rows="2"
                    label="Место жительства"
                    :value="residenceLocation"
                    readonly
                  />
                </v-badge>
              </v-col>
              <v-col cols="3">
                <v-badge
                  color="success"
                  :value="abit.secondCitizenship !== data.secondCitizenship"
                  dot
                >
                  <v-select
                    class="small-text"
                    v-model="data.secondCitizenship"
                    dense
                    :items="secondCitizenship"
                    item-text="title"
                    item-value="value"
                    label="Второе гражданство"
                    @input="send('secondCitizenship', $event)"
                  />
                </v-badge>
                <Location
                  :abit="this.abit || {}"
                  @send-locationObject="getLocationResidence($event)"
                  @send-locationText="getLocationTextResidence($event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card tile>
          <v-card-title> Военный комиссариат </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-badge
                  color="success"
                  :value="
                    (Object.assign({}, abit.militaryCommissariat).id !==
                      data.militaryCommissariat &&
                      Object.assign({}, abit.militaryCommissariat).id !==
                        Object.assign({}, data.militaryCommissariat).id) ||
                    (abit.militaryCommissariat === null &&
                      data.militaryCommissariat)
                  "
                  dot
                >
                  <v-autocomplete
                    class="small-text"
                    v-model="data.militaryCommissariat"
                    dense
                    :items="militaryCommissariats"
                    item-text="name"
                    item-value="id"
                    label="Военный комиссариат"
                    @input="
                      sendMilitaryCommissariat('militaryCommissariat', $event)
                    "
                  />
                </v-badge>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  class="small-text"
                  :value="
                    militaryCommissariat.militaryDistrict
                      ? militaryCommissariat.militaryDistrict.abbreviation
                      : ''
                  "
                  label="Округ"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  class="small-text"
                  :value="militaryCommissariat.address"
                  label="Адрес"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  class="small-text"
                  :value="militaryCommissariat.telephone"
                  label="Телефон"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  class="small-text"
                  :value="militaryCommissariat.director"
                  label="Начальник"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  class="small-text"
                  :value="militaryCommissariat.email"
                  label="Email"
                  dense
                  readonly
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card tile>
          <v-card-text>
            <v-badge
              color="success"
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
                clearable
                :items="cossack_society"
                item-text="name"
                item-value="id"
                label="Казачье общество"
                @input="send('cossack_society', $event)"
              />
            </v-badge>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card tile>
          <v-card-text>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headersTel"
                  :items="telephones"
                  height="100px"
                  dense
                  disable-pagination
                  hide-default-footer
                >
                  <template #top>
                    <v-toolbar
                      flat
                      dense
                    >
                      <v-toolbar-title> Телефоны </v-toolbar-title>
                      <v-spacer />
                      <v-dialog
                        v-model="dialogTelNote"
                        max-width="500px"
                        @click:outside="clickOutsideTelephone"
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
                          ref="formTel"
                          v-model="formTelValid"
                          @submit.prevent="saveTelephone"
                        >
                          <v-card>
                            <v-card-title> Добавить </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="telephone.number"
                                      v-mask="'+7 (###) ###-##-##'"
                                      label="Телефон"
                                      :rules="[rules.requiredTel]"
                                      @keyup.enter="saveTelephone"
                                    />
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="telephone.note"
                                      label="Примечание"
                                      @keyup.enter="saveTelephone"
                                    />
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                text
                                @click="saveTelephone"
                                :disabled="!formTelValid"
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
                      @click="editTelephone(item)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          height="342"
          tile
        >
          <v-card-title>Семья</v-card-title>
          <v-card-text>
            <v-tabs
              v-model="tabsFamily"
              fixed-tabs
              background-color="info"
              dark
            >
              <v-tab
                v-for="(MEMBER, index) in family"
                :key="`tab_${index}`"
                :value="MEMBER"
              >
                {{ MEMBER.kinship }}
              </v-tab>
              <v-btn
                @click="openDialogAddMember"
                color="secondary"
                text
                height="48px"
                >Добавить</v-btn
              >
            </v-tabs>
            <v-tabs-items v-model="tabsFamily">
              <v-tab-item
                v-for="(MEMBER, index) in family"
                :key="index + 1"
              >
                <v-card>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        :value="MEMBER.kinship"
                        label="Родство"
                        readonly
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        :value="formatDate(MEMBER.birthday)"
                        label="Дата рождения"
                        type="date"
                        prepend-icon="mdi-calendar"
                        readonly
                      />
                    </v-col>
                    <v-col cols="2">
                      <v-checkbox
                        v-model="MEMBER.fail"
                        hint="Гибель"
                        persistent-hint
                        readonly
                      />
                    </v-col>
                    <v-col cols="2">
                      <v-dialog
                        v-model="dialogFamily"
                        max-width="500px"
                        @click:outside="clickOutsideFamily"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            text
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="editFamily(MEMBER)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title> Изменить </v-card-title>
                          <v-card-text>
                            <v-row>
                              <v-col cols="4">
                                <v-select
                                  v-model="member.kinship"
                                  :items="kinships"
                                  label="Родство"
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  :value="formatDate(member.birthday)"
                                  type="date"
                                  label="Дата рождения"
                                  @input="changeDateMemberBirthday"
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-checkbox
                                  v-model="member.fail"
                                  hint="Гибель"
                                  persistent-hint
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="2" />
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.lastName"
                                  dense
                                  label="Фамилия"
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.firstName"
                                  dense
                                  label="Имя"
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.surName"
                                  dense
                                  label="Отчество"
                                  @keyup.enter="saveFamily"
                                />
                              </v-col>
                              <v-col cols="12">
                                <v-autocomplete
                                  v-model="member.status"
                                  :items="statuses"
                                  item-text="name"
                                  item-value="name"
                                  dense
                                  label="Статус"
                                  @keyup.enter="saveFamily"
                                >
                                  <template #no-data>
                                    <v-menu
                                      v-model="menuStatus"
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
                                        ref="formStatus"
                                        v-model="formStatusValid"
                                        @submit.prevent="saveStatus"
                                      >
                                        <v-card>
                                          <v-card-title>
                                            <span class="text-h5"
                                              >Добавить</span
                                            >
                                          </v-card-title>

                                          <v-card-text>
                                            <v-container>
                                              <v-row>
                                                <v-col cols="12">
                                                  <v-text-field
                                                    v-model="status.name"
                                                    dense
                                                    label="Статус"
                                                    :rules="[rules.required]"
                                                    @keyup.enter="saveStatus"
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
                                              @click="saveStatus"
                                              :disabled="!formStatusValid"
                                            >
                                              Сохранить
                                            </v-btn>
                                          </v-card-actions>
                                        </v-card>
                                      </v-form>
                                    </v-menu>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              text
                              @click="saveFamily"
                            >
                              Сохранить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        :value="MEMBER.lastName"
                        label="Фамилия"
                        readonly
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        :value="MEMBER.firstName"
                        label="Имя"
                        readonly
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        dense
                        :value="MEMBER.surName"
                        label="Отчество"
                        readonly
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        :value="MEMBER.status"
                        label="Статус"
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>

              <v-dialog
                v-model="dialogAddMember"
                max-width="500px"
                @click:outside="clickOutsideFamily"
              >
                <v-form
                  ref="formFamily"
                  v-model="formFamilyValid"
                  @submit.prevent="addMember"
                >
                  <v-card>
                    <v-card-title> Добавить </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="4">
                          <v-select
                            v-model="member.kinship"
                            :items="kinships"
                            label="Родство"
                            :rules="[rules.required]"
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            :value="formatDate(member.birthday)"
                            type="date"
                            label="Дата рождения"
                            :disabled="member.kinship == null"
                            @input="changeDateMemberBirthday"
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="2">
                          <v-checkbox
                            v-model="member.fail"
                            :disabled="member.kinship == null"
                            hint="Гибель"
                            persistent-hint
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="2" />
                        <v-col cols="4">
                          <v-text-field
                            v-model="member.lastName"
                            :disabled="member.kinship == null"
                            dense
                            label="Фамилия"
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="member.firstName"
                            :disabled="member.kinship == null"
                            dense
                            label="Имя"
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="member.surName"
                            :disabled="member.kinship == null"
                            dense
                            label="Отчество"
                            @keyup.enter="addMember"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="member.status"
                            :disabled="member.kinship == null"
                            :items="statuses"
                            item-text="name"
                            item-value="name"
                            dense
                            label="Статус"
                            @keyup.enter="addMember"
                          >
                            <template #no-data>
                              <v-menu
                                v-model="menuStatus"
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
                                  ref="formStatus2"
                                  v-model="formStatus2Valid"
                                  @submit.prevent="saveStatus"
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
                                              v-model="status.name"
                                              dense
                                              label="Статус"
                                              :rules="[rules.required]"
                                              @keyup.enter="saveStatus"
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
                                        @click="saveStatus"
                                        :disabled="!formStatus2Valid"
                                      >
                                        Сохранить
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-form>
                              </v-menu>
                            </template>
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        @click="addMember"
                        :disabled="!formFamilyValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-tabs-items>
          </v-card-text>
        </v-card>
        <v-card tile>
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-badge
                  color="success"
                  :value="
                    abit.family_social_status !== data.family_social_status
                  "
                  dot
                >
                  <v-select
                    v-model="data.family_social_status"
                    dense
                    :items="familySocialStatus"
                    item-text="name"
                    item-value="id"
                    label="Происхождение"
                    @input="send('family_social_status', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="success"
                  :value="
                    String(abit.family_childrens) !==
                    String(data.family_childrens)
                  "
                  dot
                >
                  <v-text-field
                    v-model="data.family_childrens"
                    dense
                    type="number"
                    min="0"
                    label="Детей в семье"
                    @input="send('family_childrens', parseInt($event, 10))"
                  />
                </v-badge>
              </v-col>
              <v-col cols="12">
                <v-badge
                  color="success"
                  :value="abit.family_address !== data.family_address"
                  dot
                >
                  <v-textarea
                    class="small-text"
                    rows="2"
                    label="Место жительства родителей"
                    v-model="data.family_address"
                    @input="send('family_address', $event)"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card tile>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-badge
                  color="success"
                  :value="
                    (Object.assign({}, abit.specialty_military_commissariat)
                      .id !== data.specialty_military_commissariat &&
                      Object.assign({}, abit.specialty_military_commissariat)
                        .id !==
                        Object.assign({}, data.specialty_military_commissariat)
                          .id) ||
                    (abit.specialty_military_commissariat === null &&
                      data.specialty_military_commissariat)
                  "
                  dot
                >
                  <v-autocomplete
                    v-model="data.specialty_military_commissariat"
                    class="small-text"
                    :items="specialty"
                    :item-text="nameSpecialty"
                    item-value="id"
                    clearable
                    label="Желаемая специальность"
                    @input="send('specialty_military_commissariat', $event)"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Location from '@/components/Location.vue'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FirstInfoComponent',
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
      formTelValid: false,
      formFamilyValid: false,
      formStatusValid: false,
      formStatus2Valid: false,
      rules: {
        required: (value) => !!value || 'Обязательно.',
        requiredTel: (value) =>
          (!!value && value.length == 18) || 'Некорректный номер',
      },
      tabsFamily: 0,
      member: {},
      telephone: {},
      address: {},
      status: {},
      militaryCommissariat: {},
      dialogTelNote: false,
      dialogFamily: false,
      dialogAddMember: false,
      menuAddress: false,
      menuAddressFamily: false,
      menuStatus: false,
      headersTel: [
        { value: 'number', text: 'Номер' },
        { value: 'note', text: 'Примечание' },
        { value: 'actions', text: 'Действие' },
      ],
      personal_file_existence: ['Отсутствует', 'Бумажное', 'Электронное'],
      genders: ['Мужской', 'Женский'],
      family_status: ['Холост', 'Женат', 'Разведён', 'Вдовец'],
      secondCitizenship: ['Проверить', 'Имеет', 'Отсутствует'],
      kinships: ['Мать', 'Отец', 'Сестра', 'Брат', 'Отчим', 'Мачеха'],
      residenceLocation: '',
      locationObjectResidence: {},
      editResidence: {},
    }
  },
  computed: {
    ...mapGetters([
      'nationality',
      'specialty',
      'telephones',
      'family',
      'militaryCommissariats',
      'selectedMilitaryCommissariat',
      'addresses',
      'statuses',
      'familySocialStatus',
      'locations',
      'location',
      'regions',
      'districts',
      'cities',
      'cossack_society',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    async data() {
      if (this.data.id) {
        this.fetchTelephones(this.data.id)
        console.log(this.telephones)
        this.fetchFamily(this.data.id)

        if (this.data.residence) {
          await this.selectLocation(this.data.residence.id)
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
            this.residenceLocation = locationCity
          } else {
            const locationDistrict =
              `${foundRegion.name}` +
              ' ' +
              `${foundRegion.status.name}` +
              ', ' +
              `${foundDistrict.status.name}` +
              ' ' +
              `${foundDistrict.name}`
            this.residenceLocation = locationDistrict
          }
          this.editResidence = {}
        } else {
          this.residenceLocation = null
          this.editResidence = {}
        }

        if (this.data.militaryCommissariat) {
          await this.selectMilitaryCommissariat(
            this.data.militaryCommissariat.id
          )
          this.militaryCommissariat = this.selectedMilitaryCommissariat
        } else {
          this.militaryCommissariat = {}
        }
      }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchNationality()
    this.fetchSpecialty()
    this.fetchMilitaryCommissariats()
    this.fetchStatuses()
    this.fetchFamilySocialStatus()
    this.fetchLocations()
    this.fetchRegions()
    this.fetchDistricts()
    this.fetchCities()
    this.fetchCossackSociety()
  },
  methods: {
    ...mapActions([
      'fetchNationality',
      'fetchSpecialty',
      'fetchTelephones',
      'addTelephones',
      'putTelephones',
      'fetchFamily',
      'addFamily',
      'putFamily',
      'fetchMilitaryCommissariats',
      'addMilitaryCommissariat',
      'selectMilitaryCommissariat',
      'fetchStatuses',
      'addStatuses',
      'fetchFamilySocialStatus',
      'fetchLocations',
      'selectLocation',
      'addLocation',
      'updateLocation',
      'fetchRegions',
      'fetchDistricts',
      'fetchCities',
      'fetchCossackSociety',
    ]),

    nameSpecialty(item) {
      return `(${item.abbreviation}) ${item.name}`
    },
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
    clickOutsideFamily() {
      this.member = {}
      this.dialogFamily = false
      this.dialogAddMember = false
    },
    clickOutsideTelephone() {
      this.telephone = { number: '', note: '' }
      this.dialogTelNote = false
    },
    sendMilitaryCommissariat(key, value) {
      this.send(key, value)
      this.militaryCommissariat = this.militaryCommissariats[value - 1]
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
    changeDateMemberBirthday(event) {
      this.member.birthday = event
    },
    saveTelephone() {
      if (!this.telephone.id) {
        this.telephone.abitId = this.abit.id
        this.addTelephones(this.telephone)
        this.telephone.number = ''
        this.telephone.note = ''
        this.dialogTelNote = false
      } else {
        this.putTelephones(this.telephone)
        this.dialogTelNote = false
      }
    },
    editTelephone(item) {
      this.telephone = item
      this.dialogTelNote = true
    },
    saveFamily() {
      this.putFamily(this.member)
      this.dialogFamily = false
      this.member = {}
    },
    editFamily(item) {
      this.member = item
      this.dialogFamily = true
    },
    openDialogAddMember() {
      this.dialogAddMember = true
    },
    addMember() {
      this.member.abitId = this.abit.id
      this.addFamily(this.member)
      this.member = {}
      this.dialogAddMember = false
    },
    saveStatus() {
      const newStatus = Object.assign({}, this.status)
      this.addStatuses(newStatus)
      this.menuStatus = false
      this.fetchStatuses()
      this.status = {}
    },
    getLocationResidence(event) {
      this.locationObjectResidence = event
      this.sendResidence('residence', event)
    },
    getLocationTextResidence(event) {
      this.residenceLocation = `${event}`
    },
    sendResidence(key, event) {
      this.editResidence[key] = event
      const data = {}
      data[key] = event
      this.$emit('child-residence', event)
    },
  },
}
</script>

<style>
.small-text {
  font-size: 0.9em;
}
</style>
