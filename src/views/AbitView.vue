<template>
    <v-container>
        <abit-form />
         <v-row>
            <abit
            v-for="abit in $store.getters.allAbits"
            :abit="abit"
            />
        </v-row>
        <h1>{{ $store.getters.ISTRUE }}</h1>
        <v-btn @click="upd">изменить</v-btn>
        <h2>{{ $store.getters.COUNT }}</h2>
        <v-btn @click="plus">изменить</v-btn>

    </v-container>
</template>

<script>
import AbitForm from '../components/abits/AbitForm.vue'
import Abit from '@/components/abits/Abit.vue';

export default {
    data: () => ({
        abits: [],
        firstName:'',
        lastName:''
    }),
    components:{ AbitForm, Abit},
    methods:{
        upd(){
            this.$store.dispatch('updIsTrue')
        },
        plus(){
            this.$store.commit('PLUS')
        },
}
}
</script>
  