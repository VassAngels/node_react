//The aim of the Signup component is to 
// post a request to the backend with the user values 
// we have stored in the state
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {signIn, authenticate} from '../auth'

class Signin extends Component {
    //constructor
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
           redirectToReferer: false,
           loading: false
        }
    }
    //higher order function. returns a function
    //this method is invoked by onChange events, i.e. user is changing sth
    //we need to access the event
    handleChange =(type) => event =>{
        this.setState({error:""})
        this.setState({[type]: event.target.value})

    }


    //submit signin data to the back end method
    clickSubmit=(event)=>{
        event.preventDefault(); //prevent refreshing
        this.setState({loading: true})
        const {email,password}=this.state //getting the data from the state
        const user = //creating user object to be passed to the back end
        {
            email: email,
            password:password

        }
        console.log(user)
        signIn(user)
        .then(Data => {
            if(Data.error) this.setState({error:Data.error, loading: false})
                else {
                    authenticate(Data, ()=>{
                        this.setState({redirectToReferer: true})
                    })
                }
                
        })

        // console.log(this.state.redirectToReferer)

    }


    returnSigninForm =(email,password)=>( 
    <form>
        <div className ="form-group">
            <label className="text-muted"> Email</label>
            <input onChange={this.handleChange("email")} type="email" className = "form-control" value = {this.state.email}/>
        </div>
        <div className ="form-group">
            <label className="text-muted"> Password</label>
            <input onChange={this.handleChange("password")} type="password" className = "form-control" value = {this.state.password}/>
        </div>
        <button onClick={this.clickSubmit} className ="btn btn-raised btn-primary">Submit</button>
    </form>)

    //render method
    render(){
        const { email, password,error,redirectToReferer,loading}=this.state;
        if (redirectToReferer){
            return <Redirect to = "/" />
        }
        return(
            <div className="container">
                <h2 className="my-5 mb-5">Signin</h2>
                                                     {/* conditional rendering */}
                <div className="alert alert-danger" style={{ display: error ? "": "none"}}>
                    {error}
                </div>
                    {loading ? <div className = "jumbotron text-center">
                                    <h2>Loading...</h2>
                                </div>: ""}
                {this.returnSigninForm( email, password)}
            </div>
        )
    }
};
export default Signin