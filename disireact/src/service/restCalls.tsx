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