import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const Detail = () => {

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const [article, setArticle] = useState();

  useEffect(() => {
    const fetchArticle =  async () => {
      try{
        const { data, status } = await axios.get(`http://localhost:8000/api/article/get/${id}`);
        if(status === 200) setArticle(data)
      }catch(error){
        console.log(error);
      }
    }
    fetchArticle()
  }, [])  

  const deleteArticle = async (idArticle) => {
    try{
      await axios.delete(`http://localhost:8000/api/article/delete/${idArticle}`);
      navigate('/')
    } catch(error){
      console.log(error.message);
    }   
  }

  return (
    <div>
      {article && 
        <>
          <img 
            src={`http://localhost:8000${article.picture.img}`} 
            width={400} 
            alt={article.name}
          />
          <p>{article.name}</p>   
          <p>{article.brand}</p>      
          <p>{article.content}</p>     
          <button onClick={() =>  deleteArticle(article._id)} >Delete</button>
           <Link to={{ pathname: `/update/article/${article._id}` }} >Update</Link>
        </>
      }
    </div>
  )
}

export default Detail