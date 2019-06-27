import React, {Component} from 'react'
import {forgotPassword} from './apiUser'

class ForgotPassword extends Component {
 constructor(props){
    super(props)
    this.state={email: "",
           password:"" }
 }
 

clickReset =(event)=>{
   event.preventDefault()
  
   const {email} =this.state
   console.log(email)
   forgotPassword(email)
   .then(data => {
       if(data.error) this.setState({error:data.error, loading: false})
           else {
               //authenticate(Data, ()=>{
                   //this.setState({redirectToReferer: true})
               //})
               console.log('CHANGE THIS')
           }
           
   })

}

 handleChange =(type) => event =>{
   this.setState({error:""})
   this.setState({[type]: event.target.value})

}
   returnSigninForm =(email,password)=>( 
      <form>
          <div className ="form-group">
              <label className="text-muted"> Email</label>
              <input onChange={this.handleChange("email")} type="email" className = "form-control" value = {this.state.email}/>
          </div>

          <button onClick={this.clickReset} className ="btn btn-raised btn-primary">Send Reset Link</button>
      </form>)
 
   render(){
    const {email} = this.state
     return(
        <div className="container">
        {/* <div>Hello</div> */}
        {this.returnSigninForm(email)}
        </div>
     )
    }
 }
  export default ForgotPassword