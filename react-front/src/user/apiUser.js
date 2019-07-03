
//'read' helper method
export const read=(userId,token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,
    {method: "GET",
    headers:  {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then(response => {
        return response.json()
    })
    .catch (err => console.log(err))
}

//'remove' helper methosd
export const remove=(userId,token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,
    {method: "DELETE",
    headers:  {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then(response => {
        return response.json()
    })
    .catch (err => console.log(err))
}


//'list users' helper method
export const list=()=>{
    return fetch(`${process.env.REACT_APP_API_URL}/users/`,
    {method: "GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}

export const update=(userId,token,user)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,
    {method: "PUT",
    headers:  {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch (err => console.log(err))
}

export const forgotPassword = (email) => {
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, //standard http client for making http requests to the backend
    {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err))};

// export const resetPassword = (token,password) =>{
//     return fetch(`${process.env.REACT_APP_API_URL}/reset-password`,
//     {
//         method: "PUT",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({password}),
//         token: JSON.stringify({token})
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err=>console.log(err))}    


 
export const resetPassword = resetInfo => {
    console.log(resetInfo)
    console.log(1)
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
