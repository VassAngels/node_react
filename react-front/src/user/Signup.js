//The aim of the Signup component is to 
// post a request to the backend with the user values 
// we have stored in the state
import React, {Component} from 'react';
import {signUp} from '../auth'
import {Link} from 'react-router-dom'


class Signup extends Component {
    //constructor
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }
    //higher order function. returns a function
    //this method is invoked by onChange events, i.e. user is changing sth
    //we need to access the event
    handleChange =(type) => event =>{
        this.setState({error:""})
        this.setState({[type]: event.target.value})

    }
    //submit signup data to the back end method
    clickSubmit=(event)=>{
        event.preventDefault(); //prevent refreshing
        const {name,email,password}=this.state //getting the data from the state
        const user = //creating user object to be passed to the back end
        {   name: name,
            email: email,
            password:password

        }
        signUp(user)
        .then(Data => {
            if(Data.error) this.setState({error:Data.error})
                else this.setState({
                    name:"",
                    password: "",
                    email: "",
                    error: "",
                    open: true
                }
                )
        })

    }

    //this is the form that we render in the render method below
    returnSignupForm =(name,email,password)=>( 
    <form>
        <div className ="form-group">
            <label className="text-muted"> Name</label>
            <input onChange={this.handleChange("name")} type="text" className = "form-control" value = {this.state.name}/>
        </div>
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
        const {name, email, password,error, open}=this.state;
        return(
            <div className="container">
                <h2 className="my-5 mb-5">Signup</h2>
                                                     {/* conditional rendering */}
                <div className="alert alert-danger" style={{ display: error ? "": "none"}}>
                    {this.state.error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "": "none"}}>
                    Account has been created.<Link to="./signin">Sign In</Link>
                </div>

                {this.returnSignupForm(name, email, password)}
            </div>
        )
    }
};
export default Signup