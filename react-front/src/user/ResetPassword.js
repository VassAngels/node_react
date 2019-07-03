import React, {Component} from 'react'
import {resetPassword} from './apiUser'
import {authenticate} from '../auth'
// import {Redirect,Link} from 'react-router-dom'

class ResetPassword extends Component {
    constructor(props){
        super(props)
        this.state={
            new_password: '',
            new_password_confirmed: '',
            message:'',
            error:''
        }
    }

    componentDidMount(){
        const token = this.props.match.params.token
        console.log({token})
     }

     handleChange =(type) => event =>{
        this.setState({error:""})
        this.setState({[type]: event.target.value})
     
     }

    resetPasswordForm=()=>(
        <form>
            <div className ="form-group">
              <label className="text-muted"> New Password</label>
              <input onChange={this.handleChange("new_password")} type="password" className = "form-control" value = {this.state.new_password}/>
            </div>

            <div className ="form-group">
              <label className="text-muted"> Confirm New Password</label>
              <input onChange={this.handleChange("new_password_confirmed")} type="password" className = "form-control" value = {this.state.new_password_confirmed}/>
            </div>

            <button onClick={this.clickResetPassword} className ="btn btn-raised btn-primary">Reset Password</button>  
        </form>
    )

    clickResetPassword=(event)=>{
        event.preventDefault()
        // const token = this.props.match.params.token
        const {new_password,new_password_confirmed} = this.state
        // const resetPasswordToken= this.props.match.params.resetPasswordToken
        // console.log({resetPasswordToken})
        console.log({new_password})
        console.log({new_password_confirmed})
        if(!new_password===new_password_confirmed) console.log('Passwords do not match.')
            else (
                resetPassword({newPassword: this.state.new_password,
                               resetPasswordLink: this.props.match.params.token})
            )
        .then(data => {
            if(data.error) this.setState({error:data.error, loading: false})
                else {
                    console.log(data.message);
                    this.setState({ message: data.message, newPassword: "" })
                }
                
        })
        }

    render(){
        return(
            <div className = 'container'>
                <div>{this.resetPasswordForm()}</div>
            </div>
        )
    }
    

}

export default ResetPassword