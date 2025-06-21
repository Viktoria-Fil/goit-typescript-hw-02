interface ILoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: ILoadMoreBtnProps) => {
  return (
  <button onClick={onClick}>Load more</button>
);
  
};

export default LoadMoreBtn;
