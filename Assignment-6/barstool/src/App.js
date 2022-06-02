import './App.css';
import ArticleList from './ArticleList.js';

// functional component to display the articles
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        
         <ArticleList/> 
        <p>
          <i>Barstool App</i>
        </p>
         &nbsp;
      </header>
    </div>
  )
}

export default App;
