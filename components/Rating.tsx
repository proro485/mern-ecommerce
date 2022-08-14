import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) => {
  return (
    <div className="flex my-3">
      {Array.from({ length: Math.floor(rating) }).map((_, i) => {
        return <BsStarFill key={i} className="text-yellow-500" size={18} />;
      })}
      {!Number.isInteger(rating) && (
        <BsStarHalf className="text-yellow-500" size={18} />
      )}
      {Array.from({ length: 5 - Math.ceil(rating) }, (_, i) => (
        <BsStar key={i} className="text-yellow-500" size={18} />
      ))}
      <span className="ml-2">{numReviews} reviews</span>
    </div>
  );
};

export default Rating;
