import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/wallet.css';

import UserImage from '../img/user.png';

import MapOfTableItens from '../components/MapOfTableItens';
import InputsToAddExpenses from '../components/InputsToAddExpenses';

import {
  requestAPI, saveExpenses, dispatchEditList, dispatchEditedExpenses,
} from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputsValues: {
        id: 0,
        value: '0',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        exchangeRates: {},
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.editForm = this.editForm.bind(this);
    this.readWasExpend = this.readWasExpend.bind(this);
    this.editList = this.editList.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { dispatchAPI } = this.props;
    dispatchAPI();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputsValues: { ...prevState.inputsValues, [name]: value },
    }));
  }

  editList(idList) {
    const { expenses, editExpenses } = this.props;
    const findItem = expenses.find(({ id }) => id === idList);
    this.setState(() => ({ inputsValues: findItem }), () => {
      editExpenses(idList);
    });
  }

  loginArea() {
    const { email } = this.props;
    return (
      <section className="user-container">
        <img style={ { width: '60px' } } src={ UserImage } alt="User" />
        <h3 data-testid="email-field">{ email }</h3>
      </section>
    );
  }

  readWasExpend() {
    const { expenses, isFetching } = this.props;
    if (!expenses.length || isFetching) return 0;
    const num = expenses.map(
      ({ value, currency, exchangeRates }) => value * exchangeRates[currency].ask,
    ).reduce((acc, curr) => acc + curr);
    return num.toFixed(2);
  }

  exchangeAndExpenses() {
    return (
      <section className="exchange-container">
        <h2 className="exchange-titles">
          Total gasto:
          <span data-testid="total-field">
            { `${this.readWasExpend()}` }
          </span>
        </h2>
        <h2 className="exchange-titles">
          Câmbio:
          <span data-testid="header-currency-field">BRL</span>
        </h2>
      </section>
    );
  }

  resetState() {
    this.setState(() => ({
      inputsValues: {
        id: 0,
        value: '0',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        exchangeRates: {},
      },
    }));
  }

  submitForm() {
    const { dispatchExpenses } = this.props;
    const { inputsValues } = this.state;
    dispatchExpenses(inputsValues);
    this.resetState();
  }

  editForm() {
    const { inputsValues } = this.state;
    const { saveEditList } = this.props;
    this.resetState();
    saveEditList(inputsValues);
  }

  subtitle() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    const { inputsValues } = this.state;
    return (
      <div className="wallet-container">
        <header className="user-exchange-container">
          { this.loginArea() }
          { this.exchangeAndExpenses() }
        </header>
        <InputsToAddExpenses
          submitForm={ this.submitForm }
          editForm={ this.editForm }
          handleChange={ this.handleChange }
          state={ inputsValues }
        />
        <table className="table-expenses">
          <thead>{ this.subtitle() }</thead>
          <tbody>
            <MapOfTableItens editList={ this.editList } />
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (storeState) => ({
  email: storeState.user.email,
  expenses: storeState.wallet.expenses,
  isFetching: storeState.wallet.isFetching,
  idToEdit: storeState.wallet.idToEdit,
  editor: storeState.wallet.editor,
});

const mapDispathToProps = (dispatch) => ({
  dispatchAPI: () => dispatch(requestAPI()),
  dispatchExpenses: (state) => dispatch(saveExpenses(state)),
  editExpenses: (id) => dispatch(dispatchEditList(id)),
  saveEditList: (state) => dispatch(dispatchEditedExpenses(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  isFetching: PropTypes.bool,
  dispatchAPI: PropTypes.func,
  dispatchExpenses: PropTypes.func,
  editExpenses: PropTypes.func,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispathToProps)(Wallet);
