// import "./expense.css";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { themeActions } from "../store/themeSlice";

// const Expense = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [isPremiumActivated, setIsPremium] = useState(false);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const url =
//     "https://expensetracker-674c4-default-rtdb.firebaseio.com/expenses.json";

//   const list = expenses.map((expense) => (
//     <li key={expense.key} className="expense-item">
//       <span className="expense-desc">{expense.description} </span>
//       <span className="expense-price">{expense.price} </span>
//       <span className="expense-category">{expense.category} </span>
//       <button onClick={() => deleteBtnHandler(expense)} className="deleteBTN">
//         Delete
//       </button>
//       <button
//         className="editBTN"
//         onClick={() =>
//           editHandler(
//             expense.key,
//             expense.description,
//             expense.price,
//             expense.category
//           )
//         }
//       >
//         {" "}
//         Edit
//       </button>
//     </li>
//   ));
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const myEmail = useSelector((state) => state.auth.email);
//   const isDarkTheme = useSelector((state) => state.theme.isDark);

//   const amountRef = useRef();
//   const descRef = useRef();
//   const categoryRef = useRef();

//   const toggleThemeHandler = () => {
//     dispatch(themeActions.toggleTheme());
//   };

//   const downloadCSVHandler = () => {
//     const csvData = expenses.map((expense) => {
//       return `${expense.description},${expense.price},${expense.category}`;
//     });
//     const csvContent = `Description,Price,Category\n${csvData.join("\n")}`;
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "expenses.csv";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const enteredPrice = amountRef.current.value;
//     const enteredDesc = descRef.current.value;
//     const enteredCategory = categoryRef.current.value;
//     const obj = {
//       price: enteredPrice,
//       description: enteredDesc,
//       category: enteredCategory,
//       email: myEmail,
//     };
//     try {
//       if (editingItemId) {
//         await axios.patch(
//           `https://expensetracker-674c4-default-rtdb.firebaseio.com/expenses/${editingItemId}.json`,
//           {
//             price: enteredPrice,
//             description: enteredDesc,
//             category: enteredCategory,
//           }
//         );
//       } else
//         await fetch(url, {
//           method: "POST",
//           body: JSON.stringify(obj),
//           headers: { "Content-type": "application/json" },
//         });

//       console.log(expenses);
//       console.log("expense added successfully");
//     } catch (err) {
//       console.log(err, "error adding expense");
//     }
//     fetchData();
//     amountRef.current.value = "";
//     descRef.current.value = "";
//     categoryRef.current.value = "";
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       console.log("data", data);
//       const entriesArray = Object.entries(data).map(([key, expense]) => ({
//         key,
//         ...expense,
//       }));

//       const userExpenses = entriesArray.filter(
//         (expense) => expense.email === myEmail
//       );
//       console.log(userExpenses, "userexp");

//       setExpenses(userExpenses);

//       let totalExpenses = 0;
//       for (const expense of userExpenses) {
//         totalExpenses += Number(expense.price);
//       }
//       setTotalExpenses(totalExpenses);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const deleteBtnHandler = async (expense) => {
//     try {
//       await axios.delete(
//         `https://expensetracker-674c4-default-rtdb.firebaseio.com/expenses/${expense.key}.json`
//       );

//       console.log("Successfully deleted expense");
//       fetchData();
//     } catch (error) {
//       console.log("Error deleting an item", error);
//     }
//   };

//   const editHandler = (key, description, price, category) => {
//     setEditingItemId(key);
//     amountRef.current.value = price;
//     descRef.current.value = description;
//     categoryRef.current.value = category;
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url, myEmail, setExpenses, setTotalExpenses, fetchData]);

//   return (
//     <>
//       <div className={isDarkTheme ? "dark-theme" : ""}>
//         <section className="Total">
//           Total Expense: {totalExpenses}
//           {totalExpenses > 10000 && isAuthenticated && (
//             <div className="premium-button">
//               {!isPremiumActivated && (
//                 <button
//                   className="premium-button1"
//                   onClick={() => {
//                     setIsPremium(true);
//                   }}
//                 >
//                   ★Upgrade to Premium★
//                 </button>
//               )}
//             </div>
//           )}
//           {isPremiumActivated && (
//             <div className="PremiumProp">
//               <button className="propButton" onClick={toggleThemeHandler}>
//                 {isDarkTheme ? "Light" : "Dark"} Mode
//               </button>
//               <button className="propButton" onClick={downloadCSVHandler}>
//                 Download CSV
//               </button>
//               <button
//                 className="propButton"
//                 onClick={() => {
//                   setIsPremium(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </section>

//         <div className="formbody">
//           <div className="col-md-5 p-3 border">
//             <h2>Add your expenses here</h2>
//             <form onSubmit={submitHandler}>
//               <div className="mb-3">
//                 <label htmlFor="exp" className="form-label">
//                   Expense
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="amount"
//                   required
//                   ref={amountRef}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="desc" className="form-label">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="desc"
//                   required
//                   ref={descRef}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="category" className="form-label">
//                   Category
//                 </label>
//                 <select
//                   className="form-select"
//                   id="category"
//                   required
//                   ref={categoryRef}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="food">Food</option>
//                   <option value="salary">Salary</option>
//                   <option value="rent">Rent</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="exp-list">
//           <ul className="expenses"> {list}</ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Expense;
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";
import './expense.css';
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isPremiumActivated, setIsPremium] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const url =
    "https://newexpense-6f252-default-rtdb.firebaseio.com/expenses.json";

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const myEmail = useSelector((state) => state.auth.email);
  const isDarkTheme = useSelector((state) => state.theme.isDark);

  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadCSVHandler = () => {
    const csvData = expenses.map((expense) => {
      return `${expense.description},${expense.price},${expense.category}`;
    });
    const csvContent = `Description,Price,Category\n${csvData.join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredPrice = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const obj = {
      price: enteredPrice,
      description: enteredDesc,
      category: enteredCategory,
      email: myEmail,
    };
    try {
      if (editingItemId) {
        await axios.patch(
          `https://newexpense-6f252-default-rtdb.firebaseio.com/expenses/${editingItemId}.json`,
          {
            price: enteredPrice,
            description: enteredDesc,
            category: enteredCategory,
          }
        );
      } else
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-type": "application/json" },
        });

      console.log(expenses);
      console.log("expense added successfully");
    } catch (err) {
      console.log(err, "error adding expense");
    }
    fetchData();
    amountRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "";
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("data", data);
      const entriesArray = Object.entries(data).map(([key, expense]) => ({
        key,
        ...expense,
      }));

      const userExpenses = entriesArray.filter(
        (expense) => expense.email === myEmail
      );
      console.log(userExpenses, "userexp");

      setExpenses(userExpenses);

      let totalExpenses = 0;
      for (const expense of userExpenses) {
        totalExpenses += Number(expense.price);
      }
      setTotalExpenses(totalExpenses);
    } catch (err) {
      console.log(err);
    }
  }, [url, myEmail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


const deleteBtnHandler = async (expense) => {
  try {
    await axios.delete(
      `https://newexpense-6f252-default-rtdb.firebaseio.com/expenses/${expense.key}.json`
    );

    console.log("Successfully deleted expense");
    fetchData();
  } catch (error) {
    console.log("Error deleting an item", error);
  }
};

  const editHandler = (key, description, price, category) => {
    setEditingItemId(key);
    amountRef.current.value = price;
    descRef.current.value = description;
    categoryRef.current.value = category;
  };

  // Define list above return statement
  const list = expenses.map((expense) => (
    <li key={expense.key} className="expense-item">
      <span className="expense-desc">{expense.description} </span>
      <span className="expense-price">{expense.price} </span>
      <span className="expense-category">{expense.category} </span>
      <button onClick={() => deleteBtnHandler(expense)} className="deleteBTN">
        Delete
      </button>
      <button
        className="editBTN"
        onClick={() =>
          editHandler(
            expense.key,
            expense.description,
            expense.price,
            expense.category
          )
        }
      >
        {" "}
        Edit
      </button>
    </li>
  ));

  return (
    <>
      <div className={isDarkTheme ? "dark-theme" : ""}>
      <section className="Total">
          Total Expense: {totalExpenses}
          {totalExpenses > 10000 && isAuthenticated && (
            <div className="premium-button">
              {!isPremiumActivated && (
                <button
                  className="premium-button1"
                  onClick={() => {
                    setIsPremium(true);
                  }}
                >
                  ★Upgrade to Premium★
                </button>
              )}
            </div>
          )}
          {isPremiumActivated && (
            <div className="PremiumProp">
              <button className="propButton" onClick={toggleThemeHandler}>
                {isDarkTheme ? "Light" : "Dark"} Mode
              </button>
              <button className="propButton" onClick={downloadCSVHandler}>
                Download CSV
              </button>
              <button
                className="propButton"
                onClick={() => {
                  setIsPremium(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
         </section>

         <div className="formbody">
         <div className="col-md-5 p-3 border">
            <h2>Add your expenses here</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="exp" className="form-label">
                  Expense
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  required
                  ref={amountRef}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="desc"
                  required
                  ref={descRef}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  required
                  ref={categoryRef}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="salary">Salary</option>
                  <option value="rent">Rent</option>
                  <option value="other">Other</option>
                 </select>
               </div>               
               <button type="submit" className="btn btn-primary">
                            Submit
               </button>
             </form>
           </div>
         </div>
        <div className="exp-list">
          <ul className="expenses"> {list}</ul>
       </div>
     </div>
   </>
  );
 };

export default Expense;