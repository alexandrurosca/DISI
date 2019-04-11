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
    console.log("order: " + newAccount);
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


export function createSpending(newSpending: ICreateSpendingDtoUser): Promise<any>{
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
