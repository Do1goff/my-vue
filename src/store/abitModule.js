import axios from "axios"


export default{
    state:{
        abits:[],

    },
    mutations:{
        newAbit:(state, abit) => state.abits.push(abit),
        setAbits:(state, payload)=>state.abits=payload
    },
    getters:{
        allAbits: state =>state.abits,
    },
    actions:{
         addAbit({commit}, abit){
            commit('newAbit',abit)
         },
        async fetchAbits(context){
            await axios.get('http://localhost:4000/abits')
            .then(responce => context.commit('setAbits',responce.data))
            .catch(function (error){
                console.log(error)
            })
        }
    },
}


