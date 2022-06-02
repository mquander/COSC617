
// functional component to display the article image/gif
function ImageComp(props) {

    return (<div> 
      {
          <img src={props.image} width="100" height="100" alt=""/>
      }
      </div>)
    
}

export default ImageComp