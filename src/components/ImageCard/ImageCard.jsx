import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div onClick={onClick}>
      <img
        className={css.ImageCard}
        src={image.urls.small}
        alt={image.alt_description}
        width="400"
        height="400"
      />
    </div>
  );
};

export default ImageCard;
