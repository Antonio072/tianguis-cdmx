import React from "react";

export const CarouselCard = ({ image, title, description, rating }: any) => {
  return (
    <li className="w-60">
      <img src={image} alt={title} className="w-full rounded-lg" />
      <article className="flex justify-between mt-3">
        <div>
          <p className="leading-6">
            <b>{title}</b>
          </p>
          <p className="text-gray-700">{description}</p>
        </div>
        <div>
          <span>⭐</span> {rating}
        </div>
      </article>
    </li>
  );
};
