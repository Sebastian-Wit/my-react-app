/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {
  //Calculates Accurate Account Balance
  calculateBalance() {
    let totalCredits = this.props.accountBalance;
    const creditAmount = this.props.creditList ? this.props.creditList.map((credit) => credit.amount) : [];
    const debitAmount = this.props.debitList ? this.props.debitList.map((debit) => debit.amount) : [];
    for(let i = 0; i < creditAmount.length; i++){
      totalCredits += creditAmount[i];
    }
    for(let i = 0; i < debitAmount.length; i++){
      totalCredits -= debitAmount[i];
    }
    return totalCredits;
  }
  // Display account balance
  render() {
    return (
      <div>
        Balance: {this.calculateBalance().toFixed(2)}
      </div>
    );
  }
}

export default AccountBalance;