class App extends React.Component{

  constructor() {
    super();

    this.formBuild = {
      0: [],
      1: [{label: 'Name: ', type: 'text'}, {label: 'Password: ',type: 'password'}, {label:'Email: ', type: 'email'}],
      2: [{label: 'Line 1: ', type: 'text'}, {label: 'Line 2: ', type: 'text'}, {label: 'City: ', type: 'text'},
          {label: 'State: ', type: 'text'}, {label: 'Zip Code: ', type: 'text'}, {label: 'Phone: ', type: 'number'},],
      3: [{label: 'Credit Card #: ', type: 'number'}, {label: 'Expiry date: ', type: 'month'}, {label: 'CVV: ', type: 'number'},
          {label: 'Billing Zip Code: ', type: 'text'},]
    };

    this.button = ['Checkout', 'Next', 'Next', 'Purchase'];

    this.state = {
      pageStatus: 0,
      formDetails: this.formBuild[0],
      button: this.button[0]
    }

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    
    var status = this.state.pageStatus === 3 ? 0 : this.state.pageStatus + 1;
    this.setState({
      pageStatus: status,
      formDetails: this.formBuild[status],
      button: this.button[status]
    })
  }

  render() {
    return( 
      <div>
        <h1>Easy Shop</h1>
        <FormList forms={this.state.formDetails}/>
        <Button button={this.state.button} click={this.buttonClick}/>
      </div>
    )
  }
}

var Button = (props) => (
 <div> 
 <button onClick={() => {props.click()}}>{props.button}</button>
 </div>
);


var FormList = (props) =>{
  return (
    <form>
      {props.forms.map((form) => {
        return <Form  key={form.label} form={form} />
      })}
    </form>
  )

}

var Form = (props) =>(
  <div>
    <label>{props.form.label}</label>
    <input type={props.form.type} name={props.form.label}></input>
  </div>

)


ReactDOM.render(<App />, document.getElementById('container'));

