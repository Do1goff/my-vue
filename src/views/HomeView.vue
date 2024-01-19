<template>
  <v-data-table
    :headers="headers"
    :items="$store.getters.allAbits"
    item-key="id"
    @click:row="selectAbit"
    hide-default-footer
    fixed-header
    height="300px"
  >


    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ editedAbit.id }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
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
            <v-card-title>
              <span class="text-h5">Добавить</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.firstName"
                      label="Имя"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.lastName"
                      label="Фамилия"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.otchestvo"
                      label="Отчество"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.n_ld"
                      label="№ личного дела"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.l_n"
                      label="личный номер"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedAbit.spec"
                      label="Специальность"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="deleteAbit"
              >
                Удалить
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
  </v-data-table>

  
</template>

<script>
export default{
  data(){
    return {
      dialog: false,
      search: '',
      headers:[
        {text:'ID', value:'id'},
        {text:'имя', align: 'start', value:'firstName'},
        {text:'фамилия', value:'lastName'},
        {text:'личный номер', value:'l_n'}
      ],
      editedAbit: {},
      updatedAbit:{},
      defaultAbit: {
        firstName: '',
        lastName: '',
        otchestvo: '',
        n_ld: 0,
        l_n: '',
        spec:0,
      },
    }
  },

  computed:{
    abits(){
      return this.$store.state.abits
    },
    selectedAbit(){
      return this.$store.state.selectedAbit
    }
  },
  
  methods:{
  
    selectAbit(abit){
      this.editedAbit={...abit}
      this.dialog=true
    },

    deleteAbit(abitID){
      abitID = this.editedAbit.id
      this.$store.dispatch('deleteAbit',abitID)
      this.close()
    },
    
    save () {
      try {
        if (this.editedAbit.id > -1) {

          this.updatedAbit.id=this.editedAbit.id
          this.updatedAbit.firstName=this.editedAbit.firstName
          this.updatedAbit.lastName=this.editedAbit.lastName
          this.updatedAbit.otchestvo=this.editedAbit.otchestvo         
          this.updatedAbit.l_n=this.editedAbit.l_n
          this.updatedAbit.n_ld=this.editedAbit.n_ld
          this.updatedAbit.spec=this.editedAbit.spec

          const newAbit = this.updatedAbit
          this.$store.dispatch('updateAbit',newAbit)
        } else {
          const newAbit = Object.assign({}, this.editedAbit)
          this.$store.dispatch('addAbit',newAbit)
        }
        this.close()
        }
        catch (error){
          console.error('error:', error)
        }
      },


      close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedAbit = Object.assign({}, this.defaultAbit)
          })
      },
  },

  created(){
    this.$store.dispatch('fetchAbits')
  }
}
</script>