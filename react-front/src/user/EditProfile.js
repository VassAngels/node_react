import React, {Component} from 'react'
import {Redirect}  from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {read,update} from './apiUser'


class EditProfile extends Component {
    ///////////////////////////////////////////////
    //Creating state
    ///////////////////////////////////////////////
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: ''
        }
    }
    ///////////////////////////////////////////////
    //1st step. Grabbing the user id from the props
    ///////////////////////////////////////////////
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }
    ///////////////////////////////////////////////
    //2nd step. Make a Get request to the backend to get user info to prepopulate values in the form
    ///////////////////////////////////////////////
    init = (userId) =>{
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error){ 
                this.setState({redirectToProfile: true})
                console.log("error")}
            else {this.setState({id:data._id, name: data.name, email: data.email})}
        })
    }
    ///////////////////////////////////////////////
    //Passing/reflecting the changes made in the form to the component state
    ///////////////////////////////////////////////
    handleChange =(type) => event =>{
        this.setState({[type]: event.target.value})
    }

    //client side validation
    isValid=()=>{
        const {name,email,password} = this.state
        
        if(name.length===0) {
            this.setState({error: "Name is Required"})
            return false
        }
        if(!/^\w+([.-]?\w=)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({error: "Email is not valid"})
            return false
        }
        if(password.length>=1 && password.length <=5) {
            this.setState({error: "Password must be at least 5 chars long"})
            return false
        }
        return true
    }
    ///////////////////////////////////////////////
    //submit update data to the back end method////
    ///////////////////////////////////////////////
    clickUpdate=(event)=>{
        event.preventDefault(); //prevent refreshing
        if(this.isValid()){
            const {name,email, password}=this.state //getting the data from the state
            const user = //creating user object to be passed to the back end
            {   name: name,
                email: email,
                password:password || undefined
            }
            const userId = this.props.match.params.userId//grab userID from router parameter
            const token = isAuthenticated().token; //grab token
            update(userId, token, user)//make the request to the backend for updating the user
            .then(responseData => {
                if(responseData.error) this.setState({error:responseData.error})
                    else this.setState({
                        redirectToProfile: true
                    }
                    )
            })
        }
    }
    ///////////////////////////////////////////////
    //form to be rendered/////////////////////////
    ///////////////////////////////////////////////
    UpdateForm =(name,email,password)=>( 
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
            <button onClick={this.clickUpdate} className ="btn btn-raised btn-primary">Update</button>
        </form>)
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    render(){
        const {id, name, email,password, redirectToProfile, error} = this.state
        if(redirectToProfile){
           return <Redirect to={`/user/${id}`}/>
        }
        return(
            <div className='container'>
                <h2 className="my-5 mb-5">Edit Profile</h2>
                 {/* conditional rendering */}
                <div className="alert alert-danger" style={{ display: error ? "": "none"}}>
                    {error}
                </div>               
                {this.UpdateForm(name,email,password)}

            </div>
        )
    }
}

export default EditProfile