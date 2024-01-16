<template>
    <v-container>
        <abit-form />
         <v-row>
            <abit
            v-for="abit in $store.getters.allAbits"
            :abit="abit"
            />
        </v-row>
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
    mounted(){
        this.$store.dispatch('fetchAbits')
    },
    methods:{

}
}
</script>
  