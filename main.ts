#! /usr/bin/env node
 
 import inquirer from "inquirer"

 //bank account interface
 interface BankAccount {
    accountNumber: number;
    balance:number;
     Withdraw(amount: number): void 
     deposit(amount: number): void
    checkBalance(): void
 }

 // Bank Account class 
 class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    
    //Debit money
    Withdraw(amount: number): void {
        if(this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount}successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient balance.");
        }
    }

    // Credit money
    deposit(amount: number): void {
        if(amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remainiing balance: $${this.balance}`);
    }  

    // Check balance
    checkBalance(): void {
        console.log(`Current balance : $${this.balance}`);
    }
 }

  // customer class 
  class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    { 
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
        
  }  

 // Create bank accounts

 const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
 ];
  // Create customers
  const customers: Customer [] = [
        new Customer ("Safa", "Sheikh", "Female", 24 , 2244668800, accounts[0]),
        new Customer ("Huba", "Khan", "Female", 25 , 2244668811, accounts[1]),
        new Customer ("Anas", "Sheikh", "Male", 30 , 2244668822, accounts[2])
  ]

// Function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
if(customer) {
    console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
    const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
        }]);

        switch(ans.select) {
            case "Deposit":
                const depositAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:"
                })
                customer.account.deposit(depositAmount.amount);
                break;
            case "Withdraw":
                const withdrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:"
                })
                customer.account.Withdraw(withdrawAmount.amount);
                break;
            case "Check Balance":
                customer.account.checkBalance();
                break;
            case "Exit":
                console.log("Exiting bank program...");
                console.log("\n Thank you for using our services.Have a great day!");
                return;
            }

        } else {
            console.log("Invalid account number. Please try again.");
        }
    } while(true)
}

service()