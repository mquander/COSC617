import React from 'react';
import axios from 'axios';
import ArticleComp from './components/ArticleComp.js';

// class component 
 export default class ArticleList extends React.Component {
  constructor(props) {
      super(props);
      // declare the initial state
      this.state = {
        articles: []
      };
  }
  componentDidMount() {
    // GET request to the URL and set state to the data returned
    axios.get('https://www.jalirani.com/files/barstool.json').then(res => {
      const articles = res.data;
      this.setState({ articles});
  
    });
  }
  
  render(){
    
    return (
    <div>
        { // iterate thru the list of article data to create and display the components
        this.state.articles.map(article =>
            <p><ArticleComp article={article} /> </p>)
        }  
    </div> 
      )
  };
}
