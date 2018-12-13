'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.formBuild = {
      0: [],
      1: [{ label: 'Name: ', type: 'text', name: 'name' }, { label: 'Password: ', type: 'password', name: 'password' }, { label: 'Email: ', type: 'email', name: 'email' }],
      2: [{ label: 'Line 1: ', type: 'text', name: 'line1' }, { label: 'Line 2: ', type: 'text', name: 'line2' }, { label: 'City: ', type: 'text', name: 'city' }, { label: 'State: ', type: 'text', name: 'state' }, { label: 'Zip Code: ', type: 'number', name: 'zip' }, { label: 'Phone: ', type: 'number', name: 'phone' }],
      3: [{ label: 'Credit Card #: ', type: 'number', name: 'card' }, { label: 'Expiry date: ', type: 'month', name: 'expiry' }, { label: 'CVV: ', type: 'number', name: 'cvv' }, { label: 'Billing Zip Code: ', type: 'text', name: 'bill' }]
    };

    _this.state = {
      pageStatus: 0,
      formDetails: _this.formBuild[0],
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
      bill: '',
      id: 0,
      submit: 0
    };

    _this.buttonClick = _this.buttonClick.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'buttonClick',
    value: function buttonClick(e) {
      var status = this.state.pageStatus === 3 ? 0 : this.state.pageStatus + 1;
      this.setState({
        pageStatus: status,
        formDetails: this.formBuild[status],
        id: 0,
        submit: 0
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var newState = this.state;
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

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
        bill: this.state.bill,
        id: this.state.id,
        submit: this.state.submit
      };

      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(userData)
      }).then(function (response) {

        response.json().then(function (data) {
          if (_this2.state.submit === 0) {
            var submit = _this2.state.submit;
            console.log(submit);
            _this2.setState({
              id: data.insertId,
              submit: _this2.state.submit++
            });
          } else {
            var submit = _this2.state.submit;
            console.log(submit);
            submit++;
            _this2.setState({
              submit: submit
            });
          }
        });
      }).then(function () {

        _this2.setState({
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
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

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
          { style: style, onClick: function onClick(e) {
              _this3.buttonClick(e);
            } },
          'Checkout'
        )
      );
    }
  }]);

  return App;
}(React.Component);

var FormList = function FormList(props) {
  var style = {
    display: props.status === 0 ? 'none' : 'inline'
  };
  return React.createElement(
    'form',
    { onSubmit: function onSubmit(e) {
        props.submit(e);
      } },
    props.forms.map(function (form) {
      return React.createElement(Form, { key: form.label, form: form, changed: props.changed });
    }),
    React.createElement(
      'button',
      { style: style },
      'Next'
    )
  );
};

var Form = function Form(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'label',
      null,
      props.form.label
    ),
    React.createElement('input', { type: props.form.type, name: props.form.name, onChange: function onChange(e) {
        props.changed(e);
      } })
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImZvcm1CdWlsZCIsImxhYmVsIiwidHlwZSIsIm5hbWUiLCJzdGF0ZSIsInBhZ2VTdGF0dXMiLCJmb3JtRGV0YWlscyIsInBhc3N3b3JkIiwiZW1haWwiLCJsaW5lMSIsImxpbmUyIiwiY2l0eSIsInppcCIsInBob25lIiwiY2FyZCIsImV4cGlyeSIsImN2diIsImJpbGwiLCJpZCIsInN1Ym1pdCIsImJ1dHRvbkNsaWNrIiwiYmluZCIsImhhbmRsZUNoYW5nZSIsImhhbmRsZVN1Ym1pdCIsImUiLCJzdGF0dXMiLCJzZXRTdGF0ZSIsIm5ld1N0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyRGF0YSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJpbnNlcnRJZCIsImNhdGNoIiwiZXJyb3IiLCJzdHlsZSIsImRpc3BsYXkiLCJSZWFjdCIsIkNvbXBvbmVudCIsIkZvcm1MaXN0IiwicHJvcHMiLCJmb3JtcyIsIm1hcCIsImZvcm0iLCJjaGFuZ2VkIiwiRm9ybSIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFFSixpQkFBYztBQUFBOztBQUFBOztBQUdaLFVBQUtDLFNBQUwsR0FBaUI7QUFDZixTQUFHLEVBRFk7QUFFZixTQUFHLENBQUMsRUFBQ0MsT0FBTyxRQUFSLEVBQWtCQyxNQUFNLE1BQXhCLEVBQWdDQyxNQUFNLE1BQXRDLEVBQUQsRUFBZ0QsRUFBQ0YsT0FBTyxZQUFSLEVBQXFCQyxNQUFNLFVBQTNCLEVBQXVDQyxNQUFLLFVBQTVDLEVBQWhELEVBQXlHLEVBQUNGLE9BQU0sU0FBUCxFQUFrQkMsTUFBTSxPQUF4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QUFNQyxTOztBQXVKeEIsSUFBSUMsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEtBQUQsRUFBVTtBQUN2QixNQUFJTCxRQUFRO0FBQ1RDLGFBQVNJLE1BQU0zQixNQUFOLEtBQWlCLENBQWpCLEdBQXFCLE1BQXJCLEdBQThCO0FBRDlCLEdBQVo7QUFHQSxTQUNFO0FBQUE7QUFBQSxNQUFNLFVBQVUsa0JBQUNELENBQUQsRUFBTztBQUFDNEIsY0FBTWpDLE1BQU4sQ0FBYUssQ0FBYjtBQUFnQixPQUF4QztBQUNHNEIsVUFBTUMsS0FBTixDQUFZQyxHQUFaLENBQWdCLFVBQUNDLElBQUQsRUFBVTtBQUN6QixhQUFPLG9CQUFDLElBQUQsSUFBTyxLQUFLQSxLQUFLdEQsS0FBakIsRUFBd0IsTUFBTXNELElBQTlCLEVBQW9DLFNBQVNILE1BQU1JLE9BQW5ELEdBQVA7QUFDRCxLQUZBLENBREg7QUFJQztBQUFBO0FBQUEsUUFBUSxPQUFPVCxLQUFmO0FBQUE7QUFBQTtBQUpELEdBREY7QUFTRCxDQWJEOztBQWVBLElBQUlVLE9BQU8sU0FBUEEsSUFBTyxDQUFDTCxLQUFEO0FBQUEsU0FDVDtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBUUEsWUFBTUcsSUFBTixDQUFXdEQ7QUFBbkIsS0FERjtBQUVFLG1DQUFPLE1BQU1tRCxNQUFNRyxJQUFOLENBQVdyRCxJQUF4QixFQUE4QixNQUFNa0QsTUFBTUcsSUFBTixDQUFXcEQsSUFBL0MsRUFBcUQsVUFBVSxrQkFBQ3FCLENBQUQsRUFBTztBQUFDNEIsY0FBTUksT0FBTixDQUFjaEMsQ0FBZDtBQUFpQixPQUF4RjtBQUZGLEdBRFM7QUFBQSxDQUFYOztBQVNBa0MsU0FBU0MsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCQyxTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQXpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5mb3JtQnVpbGQgPSB7XG4gICAgICAwOiBbXSxcbiAgICAgIDE6IFt7bGFiZWw6ICdOYW1lOiAnLCB0eXBlOiAndGV4dCcsIG5hbWU6ICduYW1lJ30sIHtsYWJlbDogJ1Bhc3N3b3JkOiAnLHR5cGU6ICdwYXNzd29yZCcsIG5hbWU6J3Bhc3N3b3JkJ30sIHtsYWJlbDonRW1haWw6ICcsIHR5cGU6ICdlbWFpbCcsIG5hbWU6J2VtYWlsJ31dLFxuICAgICAgMjogW3tsYWJlbDogJ0xpbmUgMTogJywgdHlwZTogJ3RleHQnLCBuYW1lOidsaW5lMSd9LCB7bGFiZWw6ICdMaW5lIDI6ICcsIHR5cGU6ICd0ZXh0JywgbmFtZTonbGluZTInfSwge2xhYmVsOiAnQ2l0eTogJywgdHlwZTogJ3RleHQnLCBuYW1lOidjaXR5J30sXG4gICAgICAgICAge2xhYmVsOiAnU3RhdGU6ICcsIHR5cGU6ICd0ZXh0JywgbmFtZTonc3RhdGUnfSwge2xhYmVsOiAnWmlwIENvZGU6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOid6aXAnfSwge2xhYmVsOiAnUGhvbmU6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOidwaG9uZSd9LF0sXG4gICAgICAzOiBbe2xhYmVsOiAnQ3JlZGl0IENhcmQgIzogJywgdHlwZTogJ251bWJlcicsIG5hbWU6J2NhcmQnfSwge2xhYmVsOiAnRXhwaXJ5IGRhdGU6ICcsIHR5cGU6ICdtb250aCcsIG5hbWU6J2V4cGlyeSd9LCB7bGFiZWw6ICdDVlY6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOidjdnYnfSxcbiAgICAgICAgICB7bGFiZWw6ICdCaWxsaW5nIFppcCBDb2RlOiAnLCB0eXBlOiAndGV4dCcsIG5hbWU6J2JpbGwnfV1cbiAgICB9O1xuXG5cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlU3RhdHVzOiAwLFxuICAgICAgZm9ybURldGFpbHM6IHRoaXMuZm9ybUJ1aWxkWzBdLFxuICAgICAgbmFtZTonJyxcbiAgICAgIHBhc3N3b3JkOicnLFxuICAgICAgZW1haWw6JycsXG4gICAgICBsaW5lMTonJyxcbiAgICAgIGxpbmUyOicnLFxuICAgICAgY2l0eTonJyxcbiAgICAgIHN0YXRlOicnLFxuICAgICAgemlwOicnLFxuICAgICAgcGhvbmU6JycsXG4gICAgICBjYXJkOicnLFxuICAgICAgZXhwaXJ5OicnLFxuICAgICAgY3Z2OicnLFxuICAgICAgYmlsbDonJyxcbiAgICAgIGlkOjAsXG4gICAgICBzdWJtaXQ6MFxuICAgIH1cblxuICAgIHRoaXMuYnV0dG9uQ2xpY2sgPSB0aGlzLmJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKGUpIHtcbiAgICB2YXIgc3RhdHVzID0gdGhpcy5zdGF0ZS5wYWdlU3RhdHVzID09PSAzID8gMCA6IHRoaXMuc3RhdGUucGFnZVN0YXR1cyArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlU3RhdHVzOiBzdGF0dXMsXG4gICAgICBmb3JtRGV0YWlsczogdGhpcy5mb3JtQnVpbGRbc3RhdHVzXSxcbiAgICAgIGlkOjAsXG4gICAgICBzdWJtaXQ6MFxuICAgIH0pXG5cblxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICB2YXIgbmV3U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIG5ld1N0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuYnV0dG9uQ2xpY2soZSk7XG4gICAgY29uc29sZS5sb2coJ3N1Ym1pdHRlZCcpO1xuICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgIG5hbWU6dGhpcy5zdGF0ZS5uYW1lLFxuICAgICAgcGFzc3dvcmQ6dGhpcy5zdGF0ZS5wYXNzd29yZCxcbiAgICAgIGVtYWlsOnRoaXMuc3RhdGUuZW1haWwsXG4gICAgICBsaW5lMTp0aGlzLnN0YXRlLmxpbmUxLFxuICAgICAgbGluZTI6dGhpcy5zdGF0ZS5saW5lMixcbiAgICAgIGNpdHk6dGhpcy5zdGF0ZS5jaXR5LFxuICAgICAgc3RhdGU6dGhpcy5zdGF0ZS5zdGF0ZSxcbiAgICAgIHppcDp0aGlzLnN0YXRlLnppcCxcbiAgICAgIHBob25lOnRoaXMuc3RhdGUucGhvbmUsXG4gICAgICBjYXJkOnRoaXMuc3RhdGUuY2FyZCxcbiAgICAgIGV4cGlyeTp0aGlzLnN0YXRlLmV4cGlyeSxcbiAgICAgIGN2djp0aGlzLnN0YXRlLmN2dixcbiAgICAgIGJpbGw6dGhpcy5zdGF0ZS5iaWxsLFxuICAgICAgaWQ6dGhpcy5zdGF0ZS5pZCxcbiAgICAgIHN1Ym1pdDp0aGlzLnN0YXRlLnN1Ym1pdFxuICAgIH1cbiAgIFxuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOidQT1NUJyxcbiAgICAgIGhlYWRlcnM6e1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBcbiAgICAgIHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAudGhlbigoZGF0YSkgPT57XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3VibWl0ID09PSAwKVxuICAgICAgICAgIHsgdmFyIHN1Ym1pdCA9IHRoaXMuc3RhdGUuc3VibWl0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3VibWl0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBpZDogZGF0YS5pbnNlcnRJZCxcbiAgICAgICAgICAgICAgc3VibWl0OiB0aGlzLnN0YXRlLnN1Ym1pdCsrXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN1Ym1pdCA9IHRoaXMuc3RhdGUuc3VibWl0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3VibWl0KTtcbiAgICAgICAgICAgIHN1Ym1pdCsrO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIHN1Ym1pdDogc3VibWl0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmFtZTonJyxcbiAgICAgICAgcGFzc3dvcmQ6JycsXG4gICAgICAgIGVtYWlsOicnLFxuICAgICAgICBsaW5lMTonJyxcbiAgICAgICAgbGluZTI6JycsXG4gICAgICAgIGNpdHk6JycsXG4gICAgICAgIHN0YXRlOicnLFxuICAgICAgICB6aXA6JycsXG4gICAgICAgIHBob25lOicnLFxuICAgICAgICBjYXJkOicnLFxuICAgICAgICBleHBpcnk6JycsXG4gICAgICAgIGN2djonJyxcbiAgICAgICAgYmlsbDonJ1xuICAgICAgfSlcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+e1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5zdGF0ZS5wYWdlU3RhdHVzID09PSAwID8gJ2lubGluZScgOiAnbm9uZSdcbiAgICB9XG4gICAgcmV0dXJuKCBcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5FYXN5IFNob3A8L2gxPlxuICAgICAgICA8Rm9ybUxpc3QgZm9ybXM9e3RoaXMuc3RhdGUuZm9ybURldGFpbHN9IGNsaWNrPXt0aGlzLmJ1dHRvbkNsaWNrfSBjaGFuZ2VkPXt0aGlzLmhhbmRsZUNoYW5nZX0gc3RhdHVzPXt0aGlzLnN0YXRlLnBhZ2VTdGF0dXN9IHN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9Lz4gXG4gICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoZSkgPT4ge3RoaXMuYnV0dG9uQ2xpY2soZSl9fSA+Q2hlY2tvdXQ8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuXG52YXIgRm9ybUxpc3QgPSAocHJvcHMpID0+e1xuICB2YXIgc3R5bGUgPSB7XG4gICAgIGRpc3BsYXk6IHByb3BzLnN0YXR1cyA9PT0gMCA/ICdub25lJyA6ICdpbmxpbmUnXG4gIH1cbiAgcmV0dXJuIChcbiAgICA8Zm9ybSBvblN1Ym1pdD17KGUpID0+IHtwcm9wcy5zdWJtaXQoZSl9fT5cbiAgICAgIHtwcm9wcy5mb3Jtcy5tYXAoKGZvcm0pID0+IHtcbiAgICAgICAgcmV0dXJuIDxGb3JtICBrZXk9e2Zvcm0ubGFiZWx9IGZvcm09e2Zvcm19IGNoYW5nZWQ9e3Byb3BzLmNoYW5nZWR9Lz5cbiAgICAgIH0pfVxuICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZX0+TmV4dDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgKVxuXG59XG5cbnZhciBGb3JtID0gKHByb3BzKSA9PihcbiAgPGRpdj5cbiAgICA8bGFiZWw+e3Byb3BzLmZvcm0ubGFiZWx9PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT17cHJvcHMuZm9ybS50eXBlfSBuYW1lPXtwcm9wcy5mb3JtLm5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4ge3Byb3BzLmNoYW5nZWQoZSl9fS8+XG4gIDwvZGl2PlxuXG4pXG5cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKSk7XG5cbiJdfQ==