
// functional component to display the title with url linked
function TitleComp(props) {
    
    return (<div> 
      {
          <p>Title: <a href={props.link}>{props.title}</a></p>
      }
      </div>)
      
}

export default TitleComp