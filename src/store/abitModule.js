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
        isTrue:true,
        count:0
    },
    mutations:{
        newAbit:(state, abit) => state.abits.push(abit),
        update:(state) => state.isTrue = !state.isTrue,
        PLUS:(state)=>state.count++
    },
    getters:{
        allAbits: state =>state.abits,
        ISTRUE:state =>state.isTrue,
        COUNT: state => state.count
        
    },
    actions:{
         addAbit({commit}, abit){
            commit('newAbit',abit)
         },
        updIsTrue({commit}){
            commit('update')
        }
    },
}


