import ExpenseForm from "./ExpenseForm";
import "./AddExpense.css";

function AddExpense(props) {
  const saveDataFormHandler = (formData) => {
    const incertKeyFormData = {
      ...formData,
      id: Math.floor(Math.random() * 1000000000000000),
    };
    props.onSaveDtaToArray(incertKeyFormData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveData={saveDataFormHandler} />
    </div>
  );
}
export default AddExpense;
