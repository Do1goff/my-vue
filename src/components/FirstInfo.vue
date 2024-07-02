<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card>
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
                  color="green"
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
                <v-menu
                  v-model="menuPersonal_file_date_reg"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-badge
                      color="green"
                      :value="
                        abit.personal_file_date_reg !==
                        data.personal_file_date_reg
                      "
                      dot
                    >
                      <v-text-field
                        dense
                        :value="formatDate(data.personal_file_date_reg)"
                        label="Дата"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </v-badge>
                  </template>
                  <v-date-picker @input="changeDatePersonal_file_date_reg" />
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Абитуриент</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-badge
                  color="green"
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
                  color="green"
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
                  color="green"
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
              <v-col cols="4">
                <v-badge
                  color="green"
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
                    label="№ личного дела"
                    @input="send('personal_file_number', $event)"
                  />
                </v-badge>
              </v-col>

              <v-col cols="4">
                <v-menu
                  v-model="menuBirthday"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-badge
                      color="green"
                      :value="abit.birthday !== data.birthday"
                      dot
                    >
                      <v-text-field
                        dense
                        :value="formatDate(data.birthday)"
                        label="Дата рождения"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </v-badge>
                  </template>
                  <v-date-picker @input="changeDateBirthday" />
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-badge
                  color="green"
                  :value="
                    abit.personal_file_existence !==
                    data.personal_file_existence
                  "
                  dot
                >
                  <v-select
                    v-model="data.personal_file_existence"
                    dense
                    :items="personal_file_existence"
                    item-text="title"
                    item-value="value"
                    label="Наличие личного дела"
                    @input="send('personal_file_existence', $event)"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-badge
                  color="green"
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
                    v-model="data.nationality"
                    dense
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
                  color="green"
                  :value="abit.gender !== data.gender"
                  dot
                >
                  <v-select
                    v-model="data.gender"
                    dense
                    :items="genders"
                    item-text="title"
                    item-value="value"
                    label="пол"
                    @input="send('gender', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="3">
                <v-badge
                  color="green"
                  :value="abit.family_status !== data.family_status"
                  dot
                >
                  <v-select
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
              <v-col cols="3">
                <v-badge
                  color="green"
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
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-badge
                  color="green"
                  :value="abit.residence !== data.residence"
                  dot
                >
                  <v-autocomplete
                    v-model="data.residence"
                    :items="addresses"
                    item-text="name"
                    item-value="name"
                    dense
                    label="Место жительства"
                    @input="send('residence', $event)"
                  >
                    <template #no-data>
                      <v-menu
                        v-model="menuAddress"
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
                                      v-model="address.name"
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
                              @click="saveAddress"
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
              <v-col cols-="4">
                <v-badge
                  color="green"
                  :value="abit.secondCitizenship !== data.secondCitizenship"
                  dot
                >
                  <v-select
                    v-model="data.secondCitizenship"
                    dense
                    :items="secondCitizenship"
                    item-text="title"
                    item-value="value"
                    label="Второе гражданство"
                    @input="send('secondCitizenship', $event)"
                  />
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            Военный комиссариат
            <v-spacer />
            <v-dialog
              v-model="dialogMilitaryCommissariat"
              max-width="1200px"
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
                        <v-col cols="6">
                          <v-select
                            v-model="newMilitaryCommissariat.district"
                            :items="districts"
                            item-text="title"
                            item-value="value"
                            label="Округ"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="newMilitaryCommissariat.name"
                            label="Военкомат"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="newMilitaryCommissariat.telephone"
                            label="телефон"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="newMilitaryCommissariat.director"
                            label="Начальник"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="newMilitaryCommissariat.address"
                            label="Адрес"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="newMilitaryCommissariat.email"
                            label="email"
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
                    @click="saveMilitaryCommissariat"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-badge
                  color="green"
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
                  :value="militaryCommissariat.district"
                  label="Округ"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  :value="militaryCommissariat.address"
                  label="Адрес"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :value="militaryCommissariat.telephone"
                  label="Телефон"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :value="militaryCommissariat.director"
                  label="Начальник"
                  dense
                  readonly
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :value="militaryCommissariat.email"
                  label="Email"
                  dense
                  readonly
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headersTel"
                  :items="telephones"
                  height="70px"
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
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="telephone.number"
                                    v-mask="'+7 (###) ###-##-##'"
                                    label="Телефон"
                                  />
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="telephone.note"
                                    label="Примечание"
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
        <v-card>
          <v-card-title>Семья</v-card-title>
          <v-card-text>
            <v-tabs
              v-model="tabsFamily"
              fixed-tabs
              background-color="indigo"
              dark
            >
              <v-tab
                v-for="(MEMBER, index) in family"
                :key="`tab_${index}`"
                :value="MEMBER"
              >
                {{ MEMBER.kinship }}
              </v-tab>
              <v-tab>Добавить</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabsFamily">
              <v-tab-item
                v-for="(MEMBER, index) in family"
                :key="index"
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
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-menu
                                  v-model="menuMemberBirthday"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template #activator="{ on, attrs }">
                                    <v-text-field
                                      :value="formatDate(member.birthday)"
                                      label="Дата рождения"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-date-picker @input="changeDateMember" />
                                </v-menu>
                              </v-col>
                              <v-col cols="2">
                                <v-checkbox
                                  v-model="member.fail"
                                  hint="Гибель"
                                  persistent-hint
                                />
                              </v-col>
                              <v-col cols="2" />
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.lastName"
                                  dense
                                  label="Фамилия"
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.firstName"
                                  dense
                                  label="Имя"
                                />
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  v-model="member.surName"
                                  dense
                                  label="Отчество"
                                />
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="member.status"
                                  dense
                                  label="Статус"
                                />
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
              <v-tab-item>
                <v-card>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                        v-model="member.kinship"
                        :items="kinships"
                        label="Родство"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        v-model="menuNewMemberBirthday"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            :value="formatDate(member.birthday)"
                            label="Дата рождения"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker @input="changeDateNewMember" />
                      </v-menu>
                    </v-col>
                    <v-col cols="2">
                      <v-checkbox
                        v-model="member.fail"
                        hint="Гибель"
                        persistent-hint
                      />
                    </v-col>
                    <v-col cols="2">
                      <v-badge
                        left
                        bottom
                        dot
                        color="red"
                        :value="member.kinship !== undefined"
                      >
                        <v-btn
                          text
                          @click="addMember"
                        >
                          <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                      </v-badge>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="member.lastName"
                        dense
                        label="Фамилия"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="member.firstName"
                        dense
                        label="Имя"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="member.surName"
                        dense
                        label="Отчество"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="member.status"
                        dense
                        label="Статус"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-badge
                  color="green"
                  :value="
                    abit.family_social_status !== data.family_social_status
                  "
                  dot
                >
                  <v-select
                    v-model="data.family_social_status"
                    dense
                    :items="family_social_status"
                    item-text="title"
                    item-value="value"
                    label="Происхождение"
                    @input="send('family_social_status', $event)"
                  />
                </v-badge>
              </v-col>
              <v-col cols="6">
                <v-badge
                  color="green"
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
                    label="Количество детей в семье"
                    @input="send('family_childrens', parseInt($event, 10))"
                  />
                </v-badge>
              </v-col>
              <v-col cols="12">
                <v-badge
                  color="green"
                  :value="abit.family_address !== data.family_address"
                  dot
                >
                  <v-autocomplete
                    v-model="data.family_address"
                    :items="addresses"
                    item-text="name"
                    item-value="name"
                    dense
                    label="Место жительства родителей"
                    @input="send('family_address', $event)"
                  >
                    <template #no-data>
                      <v-menu
                        v-model="menuAddress"
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
                                      v-model="address.name"
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
                              @click="saveAddress"
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
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-badge
                  color="green"
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
                    dense
                    :items="specialty"
                    item-text="name"
                    item-value="id"
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
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FirstInfoComponent',
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
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
      tabsFamily: 0,
      member: {},
      telephone: {},
      address: {},
      militaryCommissariat: {},
      newMilitaryCommissariat: {},
      dialogMilitaryCommissariat: false,
      dialogTelNote: false,
      dialogFamily: false,
      menuPersonal_file_date_reg: false,
      menuBirthday: false,
      menuAddress: false,
      menuNewMemberBirthday: false,
      menuMemberBirthday: false,
      headersTel: [
        { value: 'number', text: 'Номер' },
        { value: 'note', text: 'Примечание' },
        { value: 'actions', text: 'Действие' },
      ],
      personal_file_existence: [
        { value: 'print', title: 'бумажное' },
        { value: 'electro', title: 'электронное' },
        { value: 'print_and_electro', title: 'бумажное и электронное' },
      ],
      genders: [
        { value: 'men', title: 'Мужской' },
        { value: 'women', title: 'Женский' },
      ],
      family_status: [
        { value: 'single', title: 'холост' },
        { value: 'married', title: 'женат' },
      ],
      secondCitizenship: [
        { value: 'present', title: 'имеет' },
        { value: 'absent', title: 'не имеет' },
      ],
      family_social_status: [
        { value: 'military', title: 'Военнослужащих' },
        { value: 'civil_servant', title: 'Госслужащих' },
        { value: 'teacher', title: 'Преподавателей' },
        { value: 'service', title: 'Работников сферы услуг' },
        { value: 'trader', title: 'Работников сферы торговли' },
        { value: 'work', title: 'Рабочих' },
        { value: 'SERVANT', title: 'Служащих' },
        { value: 'SCIENCE', title: 'Учёных' },
      ],
      kinships: ['Мать', 'Отец', 'Сестра', 'Брат', 'Отчим', 'Мачеха'],
      districts: [
        { value: 'central', title: 'Центральный' },
        { value: 'west', title: 'Западный' },
        { value: 'east', title: 'Восточный' },
        { value: 'south', title: 'Южный' },
        { value: 'north', title: 'Северный флот' },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'nationality',
      'specialty',
      'telephones',
      'family',
      'militaryCommissariats',
      'addresses',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    data() {
      if (this.data.id) {
        this.fetchTelephones(this.data.id)
        this.fetchFamily(this.data.id)
        if (this.data.militaryCommissariat) {
          this.militaryCommissariat = this.data.militaryCommissariat
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
    this.fetchAddresses()
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
      'fetchAddresses',
      'addAddresses',
    ]),
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendMilitaryCommissariat(key, value) {
      this.send(key, value)
      this.militaryCommissariat = this.militaryCommissariats[value - 1]
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    changeDatePersonal_file_date_reg(event) {
      this.data.personal_file_date_reg = new Date(event).toISOString()
      this.menuPersonal_file_date_reg = false
      this.send('personal_file_date_reg', this.data.personal_file_date_reg)
    },
    changeDateBirthday(event) {
      this.data.birthday = new Date(event).toISOString()
      this.menuBirthday = false
      this.send('birthday', this.data.birthday)
    },
    changeDateNewMember(event) {
      this.member.birthday = new Date(event).toISOString()
      this.menuNewMemberBirthday = false
    },
    changeDateMember(event) {
      this.member.birthday = new Date(event).toISOString()
      this.menuMemberBirthday = false
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
    addMember() {
      this.member.abitId = this.abit.id
      this.addFamily(this.member)
      this.member = {}
    },
    saveMilitaryCommissariat() {
      const newMilitaryCommissariat = Object.assign(
        {},
        this.newMilitaryCommissariat
      )
      this.addMilitaryCommissariat(newMilitaryCommissariat)
      this.dialogMilitaryCommissariat = false
    },
    saveAddress() {
      const newAddress = Object.assign({}, this.address)
      this.addAddresses(newAddress)
      this.menuAddress = false
      this.fetchAddresses()
      this.address = {}
    },
  },
}
</script>

<style>
.v-badge {
  display: block;
}
</style>
