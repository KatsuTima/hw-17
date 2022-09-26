import { useEffect, useState } from "react";
import ExpenseItem from "./components/Expenses/ExpenseItem";
import Modal from "./components/Modal/Modal";
import AddExpense from "./components/NewExpense/AddExpense";
import bg from ".//images/bg.jpg";
import styled from "styled-components";

function App() {
  const [expensesData, setExpensesData] = useState([]);
  const [active, setActve] = useState(false);

  const saveDatatoArrayHandler = async (formData) => {
    await fetch(
      "https://hw17-5dfa2-default-rtdb.firebaseio.com/list-expense.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    setActve(true);
    getDataFromBackend();
  };

  async function getDataFromBackend() {
    const response = await fetch(
      "https://hw17-5dfa2-default-rtdb.firebaseio.com/list-expense.json"
    );
    const data = await response.json();
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        amount: data[key].amount,
        id: key,
        title: data[key].title,
        date: data[key].date,
      });
    }
    setExpensesData(loadedData);

    setActve(false);
  }

  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <Box className="app-main-block">
      <AddExpense onSaveDtaToArray={saveDatatoArrayHandler} />
      <Modal setActve={setActve} active={active} />
      {expensesData.map((element) => {
        return (
          <ExpenseItem
            key={element.id}
            date={element.date}
            text={element.title}
            amount={element.amount}
          />
        );
      })}
    </Box>
  );
}

export default App;

const Box = styled.div`
  background-image: url("${bg}");
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;
