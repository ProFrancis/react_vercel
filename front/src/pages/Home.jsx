import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  // url  pour récupérer les articles
  // http://localhost:8000/api/article/all

  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, status } = await axios.get(
          `http://localhost:8000/api/article/all`
        );
        console.log(data);
        if (status === 200) setArticle(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {article.map((item) => (
        <Link 
          key={item._id}
          to={{ pathname: `/detail/article/${item._id}` }}
        >
          <img src={`http://localhost:8000${item.picture.img}`} width={400} />
          <p>
            {item.name} - {item.price} €
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Home;
