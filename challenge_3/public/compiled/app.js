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
      id: 0
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
      if (status === 0) {
        this.setState({
          pageStatus: status,
          formDetails: this.formBuild[status],
          id: 0
        });
      } else {
        this.setState({
          pageStatus: status,
          formDetails: this.formBuild[status]
        });
      }
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
      var userData = {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        id: this.state.id,
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
        pageStatus: this.state.pageStatus
      };

      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(userData)
      }).then(function (response) {
        response.json().then(function (data) {
          console.log(data, _this2.state.pageStatus);
          if (_this2.state.pageStatus === 2) {
            _this2.setState({
              id: data
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
      console.log(this.state.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImZvcm1CdWlsZCIsImxhYmVsIiwidHlwZSIsIm5hbWUiLCJzdGF0ZSIsInBhZ2VTdGF0dXMiLCJmb3JtRGV0YWlscyIsInBhc3N3b3JkIiwiZW1haWwiLCJsaW5lMSIsImxpbmUyIiwiY2l0eSIsInppcCIsInBob25lIiwiY2FyZCIsImV4cGlyeSIsImN2diIsImJpbGwiLCJpZCIsImJ1dHRvbkNsaWNrIiwiYmluZCIsImhhbmRsZUNoYW5nZSIsImhhbmRsZVN1Ym1pdCIsImUiLCJzdGF0dXMiLCJzZXRTdGF0ZSIsIm5ld1N0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJEYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwiUmVhY3QiLCJDb21wb25lbnQiLCJGb3JtTGlzdCIsInByb3BzIiwic3VibWl0IiwiZm9ybXMiLCJtYXAiLCJmb3JtIiwiY2hhbmdlZCIsIkZvcm0iLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7O0FBRUosaUJBQWM7QUFBQTs7QUFBQTs7QUFHWixVQUFLQyxTQUFMLEdBQWlCO0FBQ2YsU0FBRyxFQURZO0FBRWYsU0FBRyxDQUFDLEVBQUNDLE9BQU8sUUFBUixFQUFrQkMsTUFBTSxNQUF4QixFQUFnQ0MsTUFBTSxNQUF0QyxFQUFELEVBQWdELEVBQUNGLE9BQU8sWUFBUixFQUFxQkMsTUFBTSxVQUEzQixFQUF1Q0MsTUFBSyxVQUE1QyxFQUFoRCxFQUF5RyxFQUFDRixPQUFNLFNBQVAsRUFBa0JDLE1BQU0sT0FBeEIsRUFBaUNDLE1B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QU0xQixNQUFOLEtBQWlCLENBQWpCLEdBQXFCLE1BQXJCLEdBQThCO0FBRDlCLEdBQVo7QUFHQSxTQUNFO0FBQUE7QUFBQSxNQUFNLFVBQVUsa0JBQUNELENBQUQsRUFBTztBQUFDMkIsY0FBTUMsTUFBTixDQUFhNUIsQ0FBYjtBQUFnQixPQUF4QztBQUNHMkIsVUFBTUUsS0FBTixDQUFZQyxHQUFaLENBQWdCLFVBQUNDLElBQUQsRUFBVTtBQUN6QixhQUFPLG9CQUFDLElBQUQsSUFBTyxLQUFLQSxLQUFLckQsS0FBakIsRUFBd0IsTUFBTXFELElBQTlCLEVBQW9DLFNBQVNKLE1BQU1LLE9BQW5ELEdBQVA7QUFDRCxLQUZBLENBREg7QUFJQztBQUFBO0FBQUEsUUFBUSxPQUFPVixLQUFmO0FBQUE7QUFBQTtBQUpELEdBREY7QUFTRCxDQWJEOztBQWVBLElBQUlXLE9BQU8sU0FBUEEsSUFBTyxDQUFDTixLQUFEO0FBQUEsU0FDVDtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBUUEsWUFBTUksSUFBTixDQUFXckQ7QUFBbkIsS0FERjtBQUVFLG1DQUFPLE1BQU1pRCxNQUFNSSxJQUFOLENBQVdwRCxJQUF4QixFQUE4QixNQUFNZ0QsTUFBTUksSUFBTixDQUFXbkQsSUFBL0MsRUFBcUQsVUFBVSxrQkFBQ29CLENBQUQsRUFBTztBQUFDMkIsY0FBTUssT0FBTixDQUFjaEMsQ0FBZDtBQUFpQixPQUF4RjtBQUZGLEdBRFM7QUFBQSxDQUFYOztBQVNBa0MsU0FBU0MsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCQyxTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQXpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5mb3JtQnVpbGQgPSB7XG4gICAgICAwOiBbXSxcbiAgICAgIDE6IFt7bGFiZWw6ICdOYW1lOiAnLCB0eXBlOiAndGV4dCcsIG5hbWU6ICduYW1lJ30sIHtsYWJlbDogJ1Bhc3N3b3JkOiAnLHR5cGU6ICdwYXNzd29yZCcsIG5hbWU6J3Bhc3N3b3JkJ30sIHtsYWJlbDonRW1haWw6ICcsIHR5cGU6ICdlbWFpbCcsIG5hbWU6J2VtYWlsJ31dLFxuICAgICAgMjogW3tsYWJlbDogJ0xpbmUgMTogJywgdHlwZTogJ3RleHQnLCBuYW1lOidsaW5lMSd9LCB7bGFiZWw6ICdMaW5lIDI6ICcsIHR5cGU6ICd0ZXh0JywgbmFtZTonbGluZTInfSwge2xhYmVsOiAnQ2l0eTogJywgdHlwZTogJ3RleHQnLCBuYW1lOidjaXR5J30sXG4gICAgICAgICAge2xhYmVsOiAnU3RhdGU6ICcsIHR5cGU6ICd0ZXh0JywgbmFtZTonc3RhdGUnfSwge2xhYmVsOiAnWmlwIENvZGU6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOid6aXAnfSwge2xhYmVsOiAnUGhvbmU6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOidwaG9uZSd9LF0sXG4gICAgICAzOiBbe2xhYmVsOiAnQ3JlZGl0IENhcmQgIzogJywgdHlwZTogJ251bWJlcicsIG5hbWU6J2NhcmQnfSwge2xhYmVsOiAnRXhwaXJ5IGRhdGU6ICcsIHR5cGU6ICdtb250aCcsIG5hbWU6J2V4cGlyeSd9LCB7bGFiZWw6ICdDVlY6ICcsIHR5cGU6ICdudW1iZXInLCBuYW1lOidjdnYnfSxcbiAgICAgICAgICB7bGFiZWw6ICdCaWxsaW5nIFppcCBDb2RlOiAnLCB0eXBlOiAndGV4dCcsIG5hbWU6J2JpbGwnfV1cbiAgICB9O1xuXG5cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlU3RhdHVzOiAwLFxuICAgICAgZm9ybURldGFpbHM6IHRoaXMuZm9ybUJ1aWxkWzBdLFxuICAgICAgbmFtZTonJyxcbiAgICAgIHBhc3N3b3JkOicnLFxuICAgICAgZW1haWw6JycsXG4gICAgICBsaW5lMTonJyxcbiAgICAgIGxpbmUyOicnLFxuICAgICAgY2l0eTonJyxcbiAgICAgIHN0YXRlOicnLFxuICAgICAgemlwOicnLFxuICAgICAgcGhvbmU6JycsXG4gICAgICBjYXJkOicnLFxuICAgICAgZXhwaXJ5OicnLFxuICAgICAgY3Z2OicnLFxuICAgICAgYmlsbDonJyxcbiAgICAgIGlkOjAsXG4gICAgfVxuXG4gICAgdGhpcy5idXR0b25DbGljayA9IHRoaXMuYnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYnV0dG9uQ2xpY2soZSkge1xuICAgIHZhciBzdGF0dXMgPSB0aGlzLnN0YXRlLnBhZ2VTdGF0dXMgPT09IDMgPyAwIDogdGhpcy5zdGF0ZS5wYWdlU3RhdHVzICsgMTtcbiAgICBpZiAoc3RhdHVzID09PSAwKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcGFnZVN0YXR1czogc3RhdHVzLFxuICAgICAgICBmb3JtRGV0YWlsczogdGhpcy5mb3JtQnVpbGRbc3RhdHVzXSxcbiAgICAgICAgaWQ6MFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwYWdlU3RhdHVzOiBzdGF0dXMsXG4gICAgICAgIGZvcm1EZXRhaWxzOiB0aGlzLmZvcm1CdWlsZFtzdGF0dXNdLFxuICAgICAgfSk7XG4gICAgfVxufVxuXG4gIGhhbmRsZUNoYW5nZShlKSB7XG4gICAgdmFyIG5ld1N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBuZXdTdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmJ1dHRvbkNsaWNrKGUpO1xuICAgIHZhciB1c2VyRGF0YSA9IHtcbiAgICAgIG5hbWU6dGhpcy5zdGF0ZS5uYW1lLFxuICAgICAgcGFzc3dvcmQ6dGhpcy5zdGF0ZS5wYXNzd29yZCxcbiAgICAgIGVtYWlsOnRoaXMuc3RhdGUuZW1haWwsXG4gICAgICBpZDp0aGlzLnN0YXRlLmlkLFxuICAgICAgbGluZTE6dGhpcy5zdGF0ZS5saW5lMSxcbiAgICAgIGxpbmUyOnRoaXMuc3RhdGUubGluZTIsXG4gICAgICBjaXR5OnRoaXMuc3RhdGUuY2l0eSxcbiAgICAgIHN0YXRlOnRoaXMuc3RhdGUuc3RhdGUsXG4gICAgICB6aXA6dGhpcy5zdGF0ZS56aXAsXG4gICAgICBwaG9uZTp0aGlzLnN0YXRlLnBob25lLFxuICAgICAgY2FyZDp0aGlzLnN0YXRlLmNhcmQsXG4gICAgICBleHBpcnk6dGhpcy5zdGF0ZS5leHBpcnksXG4gICAgICBjdnY6dGhpcy5zdGF0ZS5jdnYsXG4gICAgICBiaWxsOnRoaXMuc3RhdGUuYmlsbCxcbiAgICAgIHBhZ2VTdGF0dXM6dGhpcy5zdGF0ZS5wYWdlU3RhdHVzXG4gICAgfVxuICAgXG4gICAgZmV0Y2goJy8nLCB7XG4gICAgICBtZXRob2Q6J1BPU1QnLFxuICAgICAgaGVhZGVyczp7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAudGhlbigoZGF0YSkgPT57XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSwgdGhpcy5zdGF0ZS5wYWdlU3RhdHVzKTtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5wYWdlU3RhdHVzID09PSAyKXsgXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgaWQ6IGRhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5hbWU6JycsXG4gICAgICAgIHBhc3N3b3JkOicnLFxuICAgICAgICBlbWFpbDonJyxcbiAgICAgICAgbGluZTE6JycsXG4gICAgICAgIGxpbmUyOicnLFxuICAgICAgICBjaXR5OicnLFxuICAgICAgICBzdGF0ZTonJyxcbiAgICAgICAgemlwOicnLFxuICAgICAgICBwaG9uZTonJyxcbiAgICAgICAgY2FyZDonJyxcbiAgICAgICAgZXhwaXJ5OicnLFxuICAgICAgICBjdnY6JycsXG4gICAgICAgIGJpbGw6JycsXG4gICAgICB9KSAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PntcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuaWQpO1xuXG4gICAgXG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnN0YXRlLnBhZ2VTdGF0dXMgPT09IDAgPyAnaW5saW5lJyA6ICdub25lJ1xuICAgIH1cbiAgICByZXR1cm4oIFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkVhc3kgU2hvcDwvaDE+XG4gICAgICAgIDxGb3JtTGlzdCBmb3Jtcz17dGhpcy5zdGF0ZS5mb3JtRGV0YWlsc30gY2xpY2s9e3RoaXMuYnV0dG9uQ2xpY2t9IGNoYW5nZWQ9e3RoaXMuaGFuZGxlQ2hhbmdlfSBzdGF0dXM9e3RoaXMuc3RhdGUucGFnZVN0YXR1c30gc3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0vPiBcbiAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eyhlKSA9PiB7dGhpcy5idXR0b25DbGljayhlKX19ID5DaGVja291dDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cblxuXG5cbnZhciBGb3JtTGlzdCA9IChwcm9wcykgPT57XG4gIHZhciBzdHlsZSA9IHtcbiAgICAgZGlzcGxheTogcHJvcHMuc3RhdHVzID09PSAwID8gJ25vbmUnIDogJ2lubGluZSdcbiAgfVxuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXsoZSkgPT4ge3Byb3BzLnN1Ym1pdChlKX19PlxuICAgICAge3Byb3BzLmZvcm1zLm1hcCgoZm9ybSkgPT4ge1xuICAgICAgICByZXR1cm4gPEZvcm0gIGtleT17Zm9ybS5sYWJlbH0gZm9ybT17Zm9ybX0gY2hhbmdlZD17cHJvcHMuY2hhbmdlZH0vPlxuICAgICAgfSl9XG4gICAgIDxidXR0b24gc3R5bGU9e3N0eWxlfT5OZXh0PC9idXR0b24+XG4gICAgPC9mb3JtPlxuICApXG5cbn1cblxudmFyIEZvcm0gPSAocHJvcHMpID0+KFxuICA8ZGl2PlxuICAgIDxsYWJlbD57cHJvcHMuZm9ybS5sYWJlbH08L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPXtwcm9wcy5mb3JtLnR5cGV9IG5hbWU9e3Byb3BzLmZvcm0ubmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7cHJvcHMuY2hhbmdlZChlKX19Lz5cbiAgPC9kaXY+XG5cbilcblxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpKTtcblxuIl19