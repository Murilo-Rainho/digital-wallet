import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/login.css';

import { getEmail } from '../actions';

import coin from '../img/coin.gif';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: '',
      loginPassword: '',
      buttonDisable: true,
      emailValidation: false,
      passwordValidation: false,
    };

    this.changePage = this.changePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
    this.validationPassword = this.validationPassword.bind(this);
  }

  validationButton() {
    const { emailValidation, passwordValidation } = this.state;
    if (emailValidation && passwordValidation) {
      this.setState(() => ({ buttonDisable: false }));
    } else this.setState(() => ({ buttonDisable: true }));
  }

  validationEmail(emailValue) {
    const match = emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (match) {
      this.setState(() => ({ emailValidation: true }), this.validationButton);
    } else this.setState(() => ({ emailValidation: false }), this.validationButton);
  }

  validationPassword(passwordValue) {
    const minNumber = 6;
    if (passwordValue.length >= minNumber) {
      this.setState(() => ({ passwordValidation: true }), this.validationButton);
    } else this.setState(() => ({ passwordValidation: false }), this.validationButton);
  }

  handleChange({ target: { name, value } }) {
    this.setState(() => ({ [name]: value }));
    if (name === 'loginEmail') this.validationEmail(value);
    if (name === 'loginPassword') this.validationPassword(value);
  }

  inputsLogin() {
    const { loginEmail, loginPassword } = this.state;
    return (
      <>
        <label className="label-login" htmlFor="login-email">
          Email:
          <input
            placeholder="e-mail@exemplo.com"
            className="input-login"
            onChange={ this.handleChange }
            value={ loginEmail }
            type="text"
            name="loginEmail"
            id="login-email"
            data-testid="email-input"
          />
        </label>
        <label className="label-login" htmlFor="login-password">
          Senha:
          <input
            placeholder="senha123"
            className="input-login"
            onChange={ this.handleChange }
            value={ loginPassword }
            type="password"
            name="loginPassword"
            id="login-password"
            data-testid="password-input"
          />
        </label>
      </>
    );
  }

  changePage() {
    const { history, dispatchEmail } = this.props;
    const { loginEmail } = this.state;
    dispatchEmail(loginEmail);
    history.push('/digital-wallet/carteira');
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <main className="login-container">
        <div className="login-center-container">
          <section className="header-login-container">
            <h1>Carteira Digital</h1>
            <img style={ { width: '200px' } } src={ coin } alt="Spinner Coin" />
          </section>
          <form className="form-login-container">
            {this.inputsLogin()}
            <button
              className="button-login"
              disabled={ buttonDisable }
              type="button"
              onClick={ this.changePage }
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (payload) => dispatch(getEmail(payload)),
});

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
