<template>
    <v-container>
        <abit-form @addAbit="addAbit"/>
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
    }),
    components:{ AbitForm, Abit},
    methods:{

    }
}
</script>
  