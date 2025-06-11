import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui";
import { useSectionsStore } from "@/store/sections";
import { EducationItem } from "./education-item";
import { EducationSkeleton } from "./skeleton/education-skeleton";

interface Props {
  className?: string;
}

export const Education: React.FC<Props> = ({ className }) => {
  const education = useSectionsStore((state) => state.education);
  const loading = useSectionsStore((state) => state.loading);
  const loadMoreEducation = useSectionsStore(
    (state) => state.loadMoreEducation
  );
  const hasMore = useSectionsStore((state) => state.hasMoreEducation);

  return (
    <>
      <div className={cn("grid grid-cols-1 gap-10 sm:gap-12", className)}>
        {loading
          ? [...Array(4)].map((_, index) => (
              <EducationSkeleton key={index} isImageOnRight={index % 2 === 0} />
            ))
          : education.map((item, index) => (
              <EducationItem
                key={item.id}
                {...item}
                isImageOnRight={index % 2 === 0}
              />
            ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10 sm:mt-12">
          <Button
            variant="outline"
            size="xl"
            loading={loading}
            onClick={loadMoreEducation}
          >
            Показать больше
          </Button>
        </div>
      )}
    </>
  );
};
