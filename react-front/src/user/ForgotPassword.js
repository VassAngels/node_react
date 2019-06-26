import React, {Component} from 'react'

class ForgotPassword extends Component {
 constructor(props){
    super(props)
    this.state={email: "",
           password:"" }
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
          <div className ="form-group">
              <label className="text-muted"> Password</label>
              <input onChange={this.handleChange("password")} type="password" className = "form-control" value = {this.state.password}/>
          </div>
          <button onClick={this.clickSubmit} className ="btn btn-raised btn-primary">Submit</button>
      </form>)
 
   render(){
    console.log('Here we aree')
    const {email,password} = this.state
     return(
        <div className="container">
        {/* <div>Hello</div> */}
        {this.returnSigninForm(email,password)}
        </div>
     )
    }
 }
  export default ForgotPassword