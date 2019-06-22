///////////////////////
//method
export const signUp=(user)=>{
    
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, //standard http client for making http requests to the backend
{
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
})
.then(response => {
    return response.json()
})
.catch(err=>console.log(err))};

///////////////////////
//method//////////////
export const signIn=(user)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, //standard http client for making http requests to the backend
{
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
})
.then(response => {
    return response.json()
})
.catch(err=>console.log(err))};


//method
export const authenticate =(jwt,next) => {
    if(typeof window !=="undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
}


//method
export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch (`${process.env.REACT_APP_API_URL}/signout`,{method: "GET"}
            )
        .then(response =>{
            console.log("signout", response)
            return response.json()
        })
};

//method
export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false;
    }
}


