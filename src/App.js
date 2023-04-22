/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // Fetch credit and debit data from APIs and update state
  componentDidMount() {
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Hello");
        const creditList = data.map(credit => ({
            id: credit.id,
            amount: credit.amount,
            description: credit.description,
            date: credit.date
          }));
        this.setState ({ creditList });
      });

      fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        const debitList = data.map(debit => ({
            id: debit.id,
            amount: debit.amount,
            description: debit.description,
            date: debit.date
          }));
        this.setState ({ debitList });
      });
  }

  // Add a new credit to the creditList array in state
  addCredit = (newCredit) => {
    const updatedCreditList = [...this.state.creditList, newCredit];
    const updatedAccountBalance = this.state.accountBalance + newCredit.amount;
    this.setState({
      creditList: updatedCreditList,
      accountBalance: updatedAccountBalance,
    });
  };

  // Add a new debit to the debitList array in state
  addDebit = (newDebit) => {
    const updatedDebitList = [...this.state.debitList, newDebit];
    const updatedAccountBalance = this.state.accountBalance - newDebit.amount;
    this.setState({
      debitList: updatedDebitList,
      accountBalance: updatedAccountBalance,
    });
  };

  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits credits={this.state.creditList} addCredit={this.addCredit} />
    );
    const DebitsComponent = () => (
      <Debits debits={this.state.debitList} addDebit={this.addDebit} />
    ); 
    const AccountBalance = () => (
      <AccountBalance accountBalance={this.state.accountBalance} 
      credits={this.state.creditList} 
      debits={this.state.debitList} 
      />
    )

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;