import axios from "axios"


export default{
    state:{
        abits:[],
        selectedAbit:null

    },
    mutations:{
        setAbits:(state, payload)=>state.abits=payload,
        setSelectedAbit:(state, abit)=>state.selectedAbit=abit,
        addAbit:(state, newAbit) => state.abits.push(newAbit),
        deleteAbit:(state,abitID)=>state.abits = state.abits.filter(abit => abit.id !== abitID),
        updateAbit(state, updatedAbit){
            const index = state.abits.findIndex(abit=>abit.id === updatedAbit.id)
            if (index !== -1){
                state.abits.splice(index, 1, updatedAbit)
            }
        },


    },
    getters:{
        allAbits: state =>state.abits,
        selAbit:state=>state.selectedAbit
    },
    actions:{
        async fetchAbits({commit}){
            const responce = await axios.get('http://localhost:4000/abits')
            commit('setAbits',responce.data)
        },
        async selectAbit({commit},abitID){
            const responce = await axios.get(`http://localhost:4000/abits/${abitID}`)
            commit('setSelectedAbit',responce.data)
        },
        async addAbit({commit}, newAbit){
            await axios.post('http://localhost:4000/abits',newAbit)
            commit('addAbit', newAbit)
        },
        async deleteAbit({commit}, abitID){
            await axios.delete(`http://localhost:4000/abits/${abitID}`)
            commit('deleteAbit',abitID)
        },
        async updateAbit({commit}, updatedAbit){
           await axios.put(`http://localhost:4000/abits/${updatedAbit.id}`, updatedAbit)
            commit('updateAbit', updatedAbit)
        },


    },
}


