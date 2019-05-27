import {AxiosPromise} from "axios";
import axios from "axios";

export function doLogin(username1: string, password1: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    return fetch('http://localhost:8080/login',
        {
            // mode: 'no-cors',
            method: "POST",
            // credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: "include",
            body: 'username='+username1+'&'+'password='+password1,

        }
    ).then(response =>{
        if(response.status !== 200){
            return null;
        }else {
            return response.json()
        }
    }).then(resp =>{
        return resp;
    })
}

export function createAccount(newAccount: ICreateAccountDtoUser): Promise<any>{
    console.log("order: " + JSON.stringify(newAccount));
    return fetch('http://localhost:8080/createAccount',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newAccount)

        }
    ).then(data=>{
        return data;
    }).catch(error => {
        console.log("error: " + error)
    })
}

export function doLogout(): AxiosPromise{
    return axios.post("http://localhost:8080/logout", {withCredentials: true});
}
export function getBudget(): AxiosPromise{
    return axios.get("http://localhost:8080/budget",  {withCredentials: true});
}
export function getOrderById(id: any): AxiosPromise{
    return axios.get("http://localhost:8080/listSpending/"+id,  {withCredentials: true});
}

export function deleteSpending(id: number): AxiosPromise{
    return axios.delete("http://localhost:8080/delete/spending/" + id,  {withCredentials: true});
}

export function addNewBudget(budget: any): AxiosPromise{
    return axios.post("http://localhost:8080/budget/update", budget, {withCredentials: true});
}

export function editSpending(budget: any): AxiosPromise{
    return axios.post("http://localhost:8080/update/spending", budget, {withCredentials: true});
}




export function createSpending(newSpending: ISpendingDto): Promise<any>{
    console.log("order: " + newSpending);
    return fetch('http://localhost:8080/createSpending',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify(newSpending)

        }
    ).then(response => {
        console.log("status code: " + response.status);
        return response.json();

    }).then(data=>{

        return data;
    }).catch(error => {
        console.log("error: " + error)
    })
}

// export function getSpendings(): AxiosPromise{
//     return axios.get("http://localhost:8080/listSpending");
// }

export function getSpendings(): Promise<any>{
    return fetch('http://localhost:8080/listSpending',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "GET",

        }
    ).then(response => {
        console.log("status code: " + response.status);
        return response.json();

    }).then(data=>{

        return data;
    }).catch(error => {
        console.log("error: " + error)
    })
}
