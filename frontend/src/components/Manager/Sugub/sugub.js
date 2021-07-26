import { observable } from 'mobx';
import axios from "axios";
import {apiUrls} from "../../../constants/urls";
import {Alert} from "rsuite";
import {AuthTypes} from "../../../constants/actionTypes";
import store from "../../../store";
import {getUserToken} from "../../../utils/authUtils";

const sugub = observable({

    step: 0,
    sugubs:[],
    jobaps:[],
    interest:[],
    loading:false,
    getInterest(){
        const token = getUserToken(store.getState());

        return axios
        .get(apiUrls.INTEREST_SUGUB,
            {
                headers: {
                    authorization: 'Token ' + token
                },
            }).then(({data})=>{
                console.log('getInterest',data.results)
            this.interest = data.results;
        })
    },
    takeInterest(id){
         const token = getUserToken(store.getState());
        const itemToTake = this.interest.find(item => item.id === id);
        this.interest.remove(itemToTake);
        axios.delete(apiUrls.INTEREST_SUGUB + id + '/', {
            headers: {
                authorization: 'Token ' + token
            },
        }).then(({data}) => {
            // Alert.error('관심 등록이 취소되었습니다.')
            return data
        })
    },
    putInterest(id){
        console.log('put!')
        this.loading = true;
        const token = getUserToken(store.getState());
        const exists = this.interest.find((item) => item.name === id);
        if (!exists) {
            axios.post(apiUrls.INTEREST_SUGUB,
            {
                sugub: id
            },
            {
                headers: {
                    authorization: 'Token ' + token
                },
            }).then(({data})=>{
            // Alert.success('관심 등록이 완료되었습니다.')
            this.interest.push(data);
            this.loading = false;
            return;
        })

        }
    },
    stepchange(num) {
        this.step = num;
        console.log(this.sugubs)
        // this.sugubs = []
    },

});

export { sugub };