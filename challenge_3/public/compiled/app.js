class App extends React.Component {

  constructor() {
    super();

    this.formBuild = {
      0: [],
      1: [{ label: 'Name: ', type: 'text' }, { label: 'Password: ', type: 'password' }, { label: 'Email: ', type: 'email' }],
      2: [{ label: 'Line 1: ', type: 'text' }, { label: 'Line 2: ', type: 'text' }, { label: 'City: ', type: 'text' }, { label: 'State: ', type: 'text' }, { label: 'Zip Code: ', type: 'text' }, { label: 'Phone: ', type: 'number' }],
      3: [{ label: 'Credit Card #: ', type: 'number' }, { label: 'Expiry date: ', type: 'month' }, { label: 'CVV: ', type: 'number' }, { label: 'Billing Zip Code: ', type: 'text' }]
    };

    this.button = ['Checkout', 'Next', 'Next', 'Purchase'];

    this.state = {
      pageStatus: 0,
      formDetails: this.formBuild[0],
      button: this.button[0]
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {

    var status = this.state.pageStatus === 3 ? 0 : this.state.pageStatus + 1;
    this.setState({
      pageStatus: status,
      formDetails: this.formBuild[status],
      button: this.button[status]
    });
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Easy Shop'
      ),
      React.createElement(FormList, { forms: this.state.formDetails }),
      React.createElement(Button, { button: this.state.button, click: this.buttonClick })
    );
  }
}

var Button = props => React.createElement(
  'div',
  null,
  React.createElement(
    'button',
    { onClick: () => {
        props.click();
      } },
    props.button
  )
);

var FormList = props => {
  return React.createElement(
    'form',
    null,
    props.forms.map(form => {
      return React.createElement(Form, { key: form.label, form: form });
    })
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
  React.createElement('input', { type: props.form.type, name: props.form.label })
);

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));
//# sourceMappingURL=app.js.map