import { useSelector } from "react-redux";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { Filter } from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification)

  return (
    <div>
      {notification === "" ? null : <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
