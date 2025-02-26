import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.module.css";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import URL from '../constants/api'


const Home = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, status } = await axiosInstance.get(URL.FETCH_ARTICLES);
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
          <img src={`${URL.BASE_URL}${item.picture.img}`} width={400} />
          <p>
            {item.name} - {item.price} €
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Home;
