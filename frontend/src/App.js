
import './styles/App.css'
import Register from './components/Register.js';

function App() {
  return (
    <body>
        <div class="container">
            <div class="column">
                <h1 class="title">theBUGGER</h1>
                <h1 class="welcome">Welcome!</h1>
                <h2>Simplify your workflow, track bugs effortlessly, and 
                collaborate seamlessly to deliver quality software faster.
                Sign in to stay on top of every issue!</h2>
            </div>
        <div class="column">
             <Register/>
        </div>    
      </div>
    </body>
    
    
  );
}

export default App;
