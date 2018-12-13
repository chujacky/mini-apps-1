class App extends React.Component{

  constructor() {
    super();

    this.formBuild = {
      0: [],
      1: [{label: 'Name: ', type: 'text', name: 'name'}, {label: 'Password: ',type: 'password', name:'password'}, {label:'Email: ', type: 'email', name:'email'}],
      2: [{label: 'Line 1: ', type: 'text', name:'line1'}, {label: 'Line 2: ', type: 'text', name:'line2'}, {label: 'City: ', type: 'text', name:'city'},
          {label: 'State: ', type: 'text', name:'state'}, {label: 'Zip Code: ', type: 'number', name:'zip'}, {label: 'Phone: ', type: 'number', name:'phone'},],
      3: [{label: 'Credit Card #: ', type: 'number', name:'card'}, {label: 'Expiry date: ', type: 'month', name:'expiry'}, {label: 'CVV: ', type: 'number', name:'cvv'},
          {label: 'Billing Zip Code: ', type: 'text', name:'bill'}]
    };



    this.state = {
      pageStatus: 0,
      formDetails: this.formBuild[0],
      name:'',
      password:'',
      email:'',
      line1:'',
      line2:'',
      city:'',
      state:'',
      zip:'',
      phone:'',
      card:'',
      expiry:'',
      cvv:'',
      bill:''
    }

    this.buttonClick = this.buttonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buttonClick(e) {
    var status = this.state.pageStatus === 3 ? 0 : this.state.pageStatus + 1;
    this.setState({
      pageStatus: status,
      formDetails: this.formBuild[status]
    })


  }

  handleChange(e) {
    var newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e){
    e.preventDefault();
    this.buttonClick(e);
    console.log('submitted');
    var userData = {
      name:this.state.name,
      password:this.state.password,
      email:this.state.email,
      line1:this.state.line1,
      line2:this.state.line2,
      city:this.state.city,
      state:this.state.state,
      zip:this.state.zip,
      phone:this.state.phone,
      card:this.state.card,
      expiry:this.state.expiry,
      cvv:this.state.cvv,
      bill:this.state.bill
    }

    fetch('/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      response.json();
    })
    .then(() => {
      this.setState({
        name:'',
        password:'',
        email:'',
        line1:'',
        line2:'',
        city:'',
        state:'',
        zip:'',
        phone:'',
        card:'',
        expiry:'',
        cvv:'',
        bill:''
      })
    })
    .catch((error) =>{
      console.log(error);
    });
  }

  render() {

    var style = {
      display: this.state.pageStatus === 0 ? 'inline' : 'none'
    }
    return( 
      <div>
        <h1>Easy Shop</h1>
        <FormList forms={this.state.formDetails} click={this.buttonClick} changed={this.handleChange} status={this.state.pageStatus} submit={this.handleSubmit}/> 
        <button style={style} onClick={(e) => {this.buttonClick(e)}} >Checkout</button>
      </div>
    )
  }
}




var FormList = (props) =>{
  var style = {
     display: props.status === 0 ? 'none' : 'inline'
  }
  return (
    <form onSubmit={(e) => {props.submit(e)}}>
      {props.forms.map((form) => {
        return <Form  key={form.label} form={form} changed={props.changed}/>
      })}
     <button style={style}>Next</button>
    </form>
  )

}

var Form = (props) =>(
  <div>
    <label>{props.form.label}</label>
    <input type={props.form.type} name={props.form.name} onChange={(e) => {props.changed(e)}}/>
  </div>

)


ReactDOM.render(<App />, document.getElementById('container'));

