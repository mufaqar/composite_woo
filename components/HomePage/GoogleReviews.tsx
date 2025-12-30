"use client";
import { useEffect, useState } from "react";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((data) => setReviews(data.result?.reviews || []));
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold mb-6">Google Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review: any, index: number) => (
          <div key={index} className="p-5 border rounded-lg shadow">
            <h4 className="font-semibold">{review.author_name}</h4>
            <p className="text-yellow-500">⭐ {review.rating}</p>
            <p className="text-sm mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
