import { useState, useEffect } from "react";
import "./App.css";

import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

const API_KEY = "85TfTW3R-U1YQsCdr1MmVw4M8fcyoucTm1uJOgLbod8";
const BASE_URL = "https://api.unsplash.com/";

const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    params: {
      query,
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return response.data;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prev) => [...prev, ...data.results]);
        }
      } catch (error) {
        setError("Sorry. Failed to load images.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Write text for searching.");
      return;
    }
    setQuery(searchQuery.trim());
    setPage(1);
  };

  const loadMoreImages = () => setPage((prev) => prev + 1);
  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={loadMoreImages} />}
      <ImageModal
        isOpen={!!selectedImage}
        imageData={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;
