<template>
    <v-container>
        <v-row class="'d-flex'">
            <v-text-field v-model="firstName"/>
            <v-text-field v-model="lastName"/>
            <v-btn @click="addAbit">Добавить</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data:() => ({
        firstName:'',
        lastName:''
    }),
    methods:{
            addAbit(){
            let abit ={
                id: Date.now(),
                firstName:this.firstName,
                lastName:this.lastName
            }
            this.$store.dispatch('addAbit',abit)
    }
}
}
</script>