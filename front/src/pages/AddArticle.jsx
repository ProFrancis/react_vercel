import { useState } from "react";
import axios from "axios";

const AddArticle = () => {
  const imgInput = ["img", "img1", "img2", "img3", "img4"];

  const [article, setArticle] = useState({
    name: "",
    content: "",
    category: "",
    brand: "",
    price: 0,
    img: [],
    status: true,
    stock: 0,
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    // Destructuration pour extraire name, value et files de l'événement
    const { name, value, files } = e.target;

    // Vérifie si le champ modifié est une image (commence par "img")
    if (name.startsWith("img")) {
      // Mise à jour du state pour les images
      setArticle((prev) => ({
        ...prev, // Garde toutes les propriétés précédentes
        // Si des fichiers sont sélectionnés,
        // ajoute le premier fichier au tableau d'images
        // Sinon, on conserve le tableau d'images existant
        img: files ? [...prev.img, files[0]] : prev.img,
      }));
    } else {
      // Pour les autres champs (pas les images)
      setArticle((prev) => ({
        // Garde toutes les propriétés précédentes
        ...prev,
        // Met à jour la propriété correspondante avec la nouvelle valeur
        [name]: value,
      }));
    }
  };

  // Fonction asynchrone pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    // Empêche le comportement par défaut du formulaire
    e.preventDefault();

    // Création d'un objet FormData pour envoyer
    // des données multipart/form-data
    // Permet l'envoi de fichiers et de données textuelles
    const formData = new FormData();

    // Ajout des champs du formulaire dans FormData
    formData.append("name", article.name);
    formData.append("content", article.content);
    formData.append("category", article.category);
    formData.append("brand", article.brand);
    // parseInt permet de faire une conversion
    // des valeurs numériques en entiers
    formData.append("price", parseInt(article.price));
    formData.append("status", article.status);
    formData.append("stock", parseInt(article.stock));

    // Parcours du tableau d'images
    // et ajout de chaque image dans FormData
    // Le nom 'img' doit correspondre au champ
    // attendu par Multer côté serveur
    article.img.forEach((image) => {
      formData.append("img", image);
    });

    try {
      // Envoi de la requête POST avec axios
      // Headers spécifiques pour l'envoi de fichiers
      await axios.post(`http://localhost:8000/api/article/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Nom de l'article"
          required
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          onChange={handleChange}
          placeholder="Catégorie"
          required
        />
        <input
          type="text"
          name="brand"
          onChange={handleChange}
          placeholder="Marque"
          required
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Prix"
          required
        />

        {imgInput.map((imgName, index) => (
          <div key={imgName}>
            <label>
              {index === 0
                ? "Image principale (URL):"
                : `Image ${index} (URL):`}
            </label>
            <input
              type="file"
              name={imgName}
              onChange={handleChange}
              // slice prend le dernier caractère du nom de l'image
              // (par exemple, pour 'img1', il extrait '1')
              placeholder={`Image ${imgName.slice(-1)}`}
            />
          </div>
        ))}

        <input
          type="number"
          name="stock"
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="checkbox"
          name="status"
          checked={article.status}
          onChange={(e) =>
            setArticle((prev) => ({ ...prev, status: e.target.checked }))
          }
        />

        <button>Ajouter l'article</button>
      </form>
    </div>
  );
};

export default AddArticle;
