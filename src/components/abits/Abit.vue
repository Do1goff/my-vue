<template>
    <v-col cols="4">
        <v-card >
            <v-card-title>{{ abit.firstName }}</v-card-title>
            <v-card-text>{{ abit.lastName }}</v-card-text>
        </v-card>
    </v-col>
</template>

<script>
export default{
    props:{
        abit:{
            type: Object,
            required: true
        }
    },

}
</script>