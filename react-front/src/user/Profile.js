import React, {Component} from 'react'
import {isAuthenticated} from '../auth'
import {Redirect, Link} from 'react-router-dom'
import {read} from './apiUser'
import defaultProfile from '../images/avatar.jpg'
import DeleteUser from './DeleteUser';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: "",
            redirectToSignin: false

        }
    }


//1st step. Create method to get the userId from the route parameter 
    componentDidMount(){
        const userId = this.props.match.params.userId //accessing route parameters like userId from 'match.params' object
        this.init(userId)
    }

//2nd step. Develop methods ie init() and read() and  to make the request to the backend
    init = (userId) =>{
        const token = isAuthenticated().token; //get the token so that you can access the backend
        read(userId, token) //'read' method to read user info from the backened
        .then(data => {
            if(data.error){ 
                this.setState({redirectToSignin: true})
                console.log("error")}
            else {this.setState({user:data})}
        })

    }
//Lifecycle method. When the props changes it fires up. 
    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)
    }

render(){
const {user} =this.state        
const redirectToSignin = this.state.redirectToSignin
if (redirectToSignin) return <Redirect to = "/signin"/>

        return(
            
            <div className="container">
                <h2 className="my-5 mb-5">Profile</h2>
                <div className="row">
                    <div className = "col-md-6">
                        
                        <img    className="card-img-top" 
                                src={defaultProfile} 
                                alt={user.name} 
                                style={{width: '100%',height:'15vw', objectFit:'cover'}}/>

                    </div>
                    <div className = "col-md-6">
                    <div className="lead mt-2">
                        <p>Hello {this.state.user.name}</p>
                        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                        </div>    

                        {isAuthenticated().user //conditions for displaying 'edit/delete' buttons
                        && isAuthenticated().user._id === this.state.user._id
                        && (<div className = "d-inline-block"> 
                                <Link   className="btn btn-raised btn-success mr-5" 
                                        to={`/user/edit/${this.state.user._id}`}>
                                        Edit Profile
                                </Link>

                                <DeleteUser userId={user._id}/>
                            </div>)
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile; 

