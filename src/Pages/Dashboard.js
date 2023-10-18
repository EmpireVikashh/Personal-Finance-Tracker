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
// import { Modal } from "antd";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // we have to add user data in form of array of object [{...},{...},{...}] like this
  const [transactions, setTransactions] = useState();

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
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    // Get all doc from collection
    fetchTransactions();
    // {write this next line sentese because useEffect gives me notification missin depedencies}
    //  eslint-disable-next-line react-hooks/exhaustive-deps 
  },[]);
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

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
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
        </>
      )}
    </div>
  );
}

export default Dashboard;
