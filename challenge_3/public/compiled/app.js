class App extends React.Component {

  constructor() {
    super();

    this.formBuild = {
      0: [],
      1: [{ label: 'Name: ', type: 'text', name: 'name' }, { label: 'Password: ', type: 'password', name: 'password' }, { label: 'Email: ', type: 'email', name: 'email' }],
      2: [{ label: 'Line 1: ', type: 'text', name: 'line1' }, { label: 'Line 2: ', type: 'text', name: 'line2' }, { label: 'City: ', type: 'text', name: 'city' }, { label: 'State: ', type: 'text', name: 'state' }, { label: 'Zip Code: ', type: 'number', name: 'zip' }, { label: 'Phone: ', type: 'number', name: 'phone' }],
      3: [{ label: 'Credit Card #: ', type: 'number', name: 'card' }, { label: 'Expiry date: ', type: 'month', name: 'expiry' }, { label: 'CVV: ', type: 'number', name: 'cvv' }, { label: 'Billing Zip Code: ', type: 'text', name: 'bill' }]
    };

    this.state = {
      pageStatus: 0,
      formDetails: this.formBuild[0],
      name: '',
      password: '',
      email: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      card: '',
      expiry: '',
      cvv: '',
      bill: ''
    };

    this.buttonClick = this.buttonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buttonClick(e) {
    var status = this.state.pageStatus === 3 ? 0 : this.state.pageStatus + 1;
    this.setState({
      pageStatus: status,
      formDetails: this.formBuild[status]
    });
  }

  handleChange(e) {
    var newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.buttonClick(e);
    console.log('submitted');
    var userData = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      line1: this.state.line1,
      line2: this.state.line2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone: this.state.phone,
      card: this.state.card,
      expiry: this.state.expiry,
      cvv: this.state.cvv,
      bill: this.state.bill
    };

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(userData)
    }).then(response => {
      response.json();
    }).then(() => {
      this.setState({
        name: '',
        password: '',
        email: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        card: '',
        expiry: '',
        cvv: '',
        bill: ''
      });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {

    var style = {
      display: this.state.pageStatus === 0 ? 'inline' : 'none'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Easy Shop'
      ),
      React.createElement(FormList, { forms: this.state.formDetails, click: this.buttonClick, changed: this.handleChange, status: this.state.pageStatus, submit: this.handleSubmit }),
      React.createElement(
        'button',
        { style: style, onClick: e => {
            this.buttonClick(e);
          } },
        'Checkout'
      )
    );
  }
}

var FormList = props => {
  var style = {
    display: props.status === 0 ? 'none' : 'inline'
  };
  return React.createElement(
    'form',
    { onSubmit: e => {
        props.submit(e);
      } },
    props.forms.map(form => {
      return React.createElement(Form, { key: form.label, form: form, changed: props.changed });
    }),
    React.createElement(
      'button',
      { style: style },
      'Next'
    )
  );
};

var Form = props => React.createElement(
  'div',
  null,
  React.createElement(
    'label',
    null,
    props.form.label
  ),
  React.createElement('input', { type: props.form.type, name: props.form.name, onChange: e => {
      props.changed(e);
    } })
);

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));
//# sourceMappingURL=app.js.map