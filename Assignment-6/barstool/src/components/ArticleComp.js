import AuthorComp from './AuthorComp.js';
import ImageComp from './ImageComp.js';
import CommentsComp from './CommentsComp.js';
import TitleComp from './TitleComp.js';

/* functional component to display the article, 
  that contains several other components*/
function ArticleComp(props) {

    return (<div className="Article"> 
      {
          <div> 
            <ImageComp image={props.article.thumbnail.location+props.article.thumbnail.images.small} />
            <TitleComp title={props.article.title} link={props.article.url}/>
            <AuthorComp author={props.article.author}/> 
            <CommentsComp comments_num={props.article.comment_count}/> 
          
          </div>
      }
      </div>)
     
}

export default ArticleComp