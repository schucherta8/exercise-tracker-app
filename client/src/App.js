import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateActivity from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
import CreateGroup from './components/create-group.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/activity" component={CreateActivity} />
        <Route path="/user" component={CreateUser} />
        <Route path="/group" component={CreateGroup} />
      </div>
    </Router>
  );
}

export default App;
