import css from "./ImageCard.module.css";
import { IPhoto } from "../../types/photo";
import React, { FC } from "react";

interface IPhotoItem {
  item: IPhoto;
}
export const ImageCard: FC<IPhotoItem> = ({ item }) => {
  return (
    <div >
      <div>
        <img className={css.ImageCard} src={item.urls.small} alt={item.alt_description || "Picture"} width="360"
        height="360" />
      </div>
      <div className={css.Text}>
        <p>likes : {item.likes}</p>
      </div>
    </div>
  );
};
