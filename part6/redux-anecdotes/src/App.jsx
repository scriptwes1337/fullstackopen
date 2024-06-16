import { useDispatch, useSelector } from "react-redux";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { Filter } from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdotesReducer";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

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
