class Account {
  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      balance += this.transactions[i].value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

const myAccount = new Account("billybob");

console.log("Starting Balance:", myAccount.balance);

console.log(" Withdrawing $5");
const t1 = new Withdrawal(5.0, myAccount);
console.log("Results : ", t1.commit());
console.log(" Resulting Balance: ", myAccount.balance);

console.log("attempting to deposit");
const t2 = new Deposit(50.0, myAccount);
console.log("result :", t2.commit());
console.log("Account Balance : ", myAccount.balance);
