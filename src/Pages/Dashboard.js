import React, { useEffect, useState } from "react";
import Header from "../Components/Headers/Header";
import Cards from "../Components/Cards/Cards";
import AddExpenseModal from "../Components/Modals/AddExpenseModal";
import AddIncomeModal from "../Components/Modals/AddIncomeModal";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "@firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import TransctionsTable from "../Components/TransactionsTable/TransctionsTable";
// import { Modal } from "antd";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // we have to add user data in form of array of object [{...},{...},{...}] like this
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  function showExpenseModal() {
    console.log("show expence Model");
    setIsExpenseModalVisible(true);
  }

  function showIncomeModal() {
    console.log("show Income Model");
    setIsIncomeModalVisible(true);
  }

  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }

  function handleIncomeCancel() {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };
  
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      // console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr); // when my transaction has updated then calculate function will be call
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    // Get all doc from collection
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("trac", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
    // console.log(income,expenses,currentBalance)
  };


  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expenses={expenses}
            currentBalance={currentBalance}
            showIncomeModal={showIncomeModal}
            showExpenseModal={showExpenseModal}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <TransctionsTable 
          transactions={transactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
