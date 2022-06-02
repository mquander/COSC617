
// functional component to display the author and their avatar/image
function AuthorComp(props) {

    return (<div> 
      {
          <p>Author: <img src={props.author.avatar} width="50" height="50" alt=""/> {props.author.name}</p>
      }
      </div>)
      
}

export default AuthorComp