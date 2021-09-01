import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/mapOfTableItens.css';

import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';

import loadingGif from '../img/loading.gif';

import { dispatchDeleteRow } from '../actions';

class MapOfTableItens extends Component {
  constructor(props) {
    super(props);

    this.deleteRowClick = this.deleteRowClick.bind(this);
  }

  deleteRowClick(id, multiplyValue) {
    const { deleteRow } = this.props;
    deleteRow(id, multiplyValue);
  }

  emptyWallet() {
    return (
      <tr className="empty-wallet">
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>Sua carteira está vazia</td>
      </tr>
    );
  }

  render() {
    const { expenses, editor, isFetching, editList } = this.props;
    const loading = <tr><td><img src={ loadingGif } alt="Loading" /></td></tr>;
    if (expenses.length === 0) return (this.emptyWallet());
    return (isFetching) ? loading : (
      expenses.map(({
        exchangeRates, currency, value, id, description, tag, method,
      }) => {
        const exchange = exchangeRates[currency];
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchange.name.split('/')[0] }</td>
            <td>{ Number(exchange.ask).toFixed(2) }</td>
            <td>{ (value * exchange.ask).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                disabled={ editor }
                className="button-edit_erase"
                onClick={ () => this.deleteRowClick(id, Number(exchange.ask).toFixed(2)) }
                data-testid="delete-btn"
                type="button"
              >
                <FaRegTrashAlt />
              </button>
              <button
                disabled={ editor }
                className="button-edit_erase"
                onClick={ () => editList(id) }
                data-testid="edit-btn"
                type="button"
              >
                <FaPencilAlt />
              </button>
            </td>
          </tr>
        );
      })
    );
  }
}

const mapStateToProps = (storeState) => ({
  expenses: storeState.wallet.expenses,
  isFetching: storeState.wallet.isFetching,
  editor: storeState.wallet.editor,
});

const mapDispathToProps = (dispatch) => ({
  deleteRow: (id, multiplyValue) => dispatch(dispatchDeleteRow(id, multiplyValue)),
});

MapOfTableItens.propTypes = {
  expenses: PropTypes.array,
  isFetching: PropTypes.bool,
  editor: PropTypes.bool,
  deleteRow: PropTypes.func,
  editList: PropTypes.func,
}.isRequired;

export default connect(
  mapStateToProps, mapDispathToProps,
)(MapOfTableItens);
