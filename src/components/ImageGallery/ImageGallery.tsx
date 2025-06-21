import { ImageCard } from "../ImageCard/ImageCard";
import { IPhoto } from "../../types/photo";
import css from "./ImageGallery.module.css";
import React, { FC } from "react";


interface IImageGalleryProps {
  items: IPhoto[];
  onImageClick: (imageUrl: string) => void;
}
export const ImageGallery: React.FC <IImageGalleryProps> = ({
  items,
  onImageClick,
}) => {

  return (

      <ul className={css.Images}>
        {
          items.map((item) => (
            <li key={item.id} className={css.Image} onClick={() => onImageClick(item.urls.regular!)}>
              <ImageCard item={item} />
            </li>
          ))}
      </ul>

  );
};
