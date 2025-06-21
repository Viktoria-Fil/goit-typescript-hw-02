import { useState, useEffect } from "react";
import "./App.css";

import  Loader  from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";

import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import { IPhoto } from "./types/photo";
import { fetchImages } from "./types/getPhotos";

export interface IUnsplashResponse {
  total: number;
  total_pages: number;
  results: IPhoto[];
}


const App = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<IPhoto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [visibleBtnMore, setVisibleBtnMore] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {

      try {
        setIsLoading(true);
      setError(false);
        const fetchData: IUnsplashResponse = await fetchImages(query.split(`/`)[0], page);
        
        const data: IPhoto[] = fetchData.results;


        if (fetchData.total_pages > 1) {
          setVisibleBtnMore(true);
        }

        setImages((prev) => {
          return [...prev, ...data];
        });
        
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [page, query]);

  const handleSearch = (searchQuery:string):void => {
    if (!searchQuery.trim()) {
      toast.error("Write text for searching.");
      return;
    }
    setQuery(searchQuery.trim());
    setPage(1);
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setSelectedImage("");
  }
  const loadMoreImages = () => setPage((prev) => prev + 1);
  
  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery items={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage}
        onClose={closeModal}>
        {selectedImage !== "" && (
          <img src={selectedImage} alt="selected" style={{ maxWidth: "100 %" }} />
        )}
        </ImageModal>
        {visibleBtnMore && !isLoading && (<LoadMoreBtn onClick={loadMoreImages} />)}
    </div>
  );
};

export default App;
