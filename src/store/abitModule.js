export default{
    state:{
        abits:[
            {
                id:1,
                firstName:'first',
                lastName:'aaaaa'
            }, 
            {
                id:2,
                firstName:"second",
                lastName:"sssss"
            }
        ],

    },
    mutations:{
        newAbit:(state, abit) => state.abits.unshift(abit),
        setAbits:(state,abits) => state.abits = abits,
    },
    getters:{
        allAbits: state =>state.abits,
        
    },
    actions:{
         addAbit({commit}, abit){
            commit('newAbits',abit)
         },
         fetchAbits({commit}){
            commit('setAbits',state.abits)
        }
    },
}


