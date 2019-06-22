import React, {Component} from 'react'
import {Redirect}  from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {read} from './apiUser'


class EditProfile extends Component {
    //Creating state
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false 
        }
    }
    
    //1st step. Grabbing the user id from the props
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }
    //2nd step. Get request to the backend to get user info to propulate values in the form
    init = (userId) =>{
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error){ 
                this.setState({redirectToProfile: true})
                console.log("error")}
            else {this.setState({id:data._id, name: data.name, email: data.email})}
        })
        console.log('1')
        console.log(this.state.password)
        console.log('2')
    }

    //Passing,reflecting changes made in the form to the component state
    handleChange =(type) => event =>{
        this.setState({[type]: event.target.value})

    }
    //submit signup data to the back end method
    clickUpdate=(event)=>{
        event.preventDefault(); //prevent refreshing
        const {name,email, password}=this.state //getting the data from the state
        const user = //creating user object to be passed to the back end
        {   name: name,
            email: email,
            password:password

        }
        console.log('3')
        console.log(user)
        // signUp(user)
        // .then(Data => {
        //     if(Data.error) this.setState({error:Data.error})
        //         else this.setState({
        //             name:"",
        //             password: "",
        //             email: "",
        //             error: "",
        //             open: true
        //         }
        //         )
        // })

    }

    //form to be rendered
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

    render(){
        const {id, name, email,password, redirectToProfile} = this.state
        if(redirectToProfile){
           return <Redirect to={`/user/${id}`}/>
        }
        console.log('render')
        console.log(password)
        return(
            <div className='container'>
                <h2 className="my-5 mb-5">Edit Profile</h2>
                {this.UpdateForm(name,email,password)}
            </div>
        )
    }
}

export default EditProfile