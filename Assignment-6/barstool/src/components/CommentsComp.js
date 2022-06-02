
// functional component to display the number of comments
function CommentsComp(props) {

    return (<div> 
      {
          <p>Comments: {props.comments_num}</p>
      }
      </div>)
      
}

export default CommentsComp