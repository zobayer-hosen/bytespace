"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Chip } from "@/components/ui/Chip";
import { courseDetail } from "@/data/course-detail";
import { PanelSection } from "./PanelSection";
import { RatingSummary } from "./RatingSummary";

const STAR_FILTERS = [5, 4, 3, 2, 1];

export function ReviewsPanel() {
  const { reviewsIntro, averageRating, ratingBreakdown, reviews } = courseDetail;
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const visibleReviews = starFilter ? reviews.filter((review) => review.rating === starFilter) : reviews;

  return (
    <div className="space-y-10">
      <PanelSection title="What Learners Are Saying">
        <p>{reviewsIntro}</p>
        <div className="mt-6">
          <RatingSummary average={averageRating} breakdown={ratingBreakdown} />
        </div>
      </PanelSection>

      <PanelSection title="Individual Reviews:">
        <div role="group" aria-label="Filter reviews by rating" className="flex flex-wrap gap-3">
          <Chip size="sm" active={starFilter === null} onClick={() => setStarFilter(null)}>
            All rating
          </Chip>
          {STAR_FILTERS.map((stars) => (
            <Chip key={stars} size="sm" active={starFilter === stars} onClick={() => setStarFilter(stars)}>
              <Star aria-hidden className="size-3.5 fill-current" />
              <span className="sr-only">Rated</span> {stars}
            </Chip>
          ))}
        </div>

        {visibleReviews.length > 0 ? (
          <ul className="mt-6 space-y-5">
            {visibleReviews.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-card border border-dashed border-line p-8 text-center text-sm">
            No {starFilter}-star reviews yet.
          </p>
        )}
      </PanelSection>
    </div>
  );
}
