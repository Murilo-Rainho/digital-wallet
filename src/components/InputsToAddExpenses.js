import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/inputsToAddExpenses.css';

class InputsToAddExpenses extends Component {
  mapAllCurrency() {
    const { handleChange, currencies, state: { currency } } = this.props;
    return (
      <select
        className="select-toAddExpenses"
        value={ currency }
        aria-label="moeda"
        name="currency"
        id="currency"
        onChange={ handleChange }
      >
        { currencies && currencies.map((currencyValue) => (
          <option
            key={ currencyValue }
            value={ currencyValue }
          >
            { currencyValue }
          </option>)) }
      </select>
    );
  }

  selectsCurrencyPaymentMethodAndTag() {
    const { handleChange, state: { method, tag } } = this.props;
    return (
      <>
        <label className="label-select-toAddExpenses" htmlFor="currency">
          Moeda:
          { this.mapAllCurrency() }
        </label>
        <label className="label-select-toAddExpenses" htmlFor="method">
          Método de pagamento:
          <select
            className="select-toAddExpenses"
            value={ method }
            aria-label="método de pagamento"
            name="method"
            id="method"
            onChange={ handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label className="label-select-toAddExpenses" htmlFor="tag">
          Tag:
          <select
            className="select-toAddExpenses"
            value={ tag }
            aria-label="spendDescriptionTag"
            name="tag"
            id="tag"
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }

  render() {
    const { editor, submitForm, editForm, handleChange, state: {
      description, value,
    } } = this.props;
    const submitButton = (
      <button className="button-edit" onClick={ submitForm } type="button">
        Adicionar despesa
      </button>
    );
    const editButton = (
      <button className="button-submit" onClick={ editForm } type="button">
        Editar despesas
      </button>
    );
    return (
      <form className={ `inputs-expenses-container-${editor}` }>
        <label className="label-toAddExpenses" htmlFor="value">
          Valor:
          <input
            className="input-toAddExpenses"
            value={ value }
            type="text"
            name="value"
            id="value"
            onChange={ handleChange }
          />
        </label>
        <label className="label-toAddExpenses" htmlFor="description">
          Descrição:
          <input
            className="input-toAddExpenses"
            value={ description }
            type="text"
            maxLength="30"
            name="description"
            id="description"
            onChange={ handleChange }
          />
        </label>
        { this.selectsCurrencyPaymentMethodAndTag() }
        { (editor) ? editButton : submitButton }
      </form>
    );
  }
}

const mapStateToProps = (storeState) => ({
  editor: storeState.wallet.editor,
  currencies: storeState.wallet.currencies,
});

InputsToAddExpenses.propTypes = {
  editor: PropTypes.bool,
  handleChange: PropTypes.func,
  submitForm: PropTypes.func,
  editForm: PropTypes.func,
  state: PropTypes.object,
  currencies: PropTypes.array,
}.isRequired;

export default connect(
  mapStateToProps,
)(InputsToAddExpenses);
