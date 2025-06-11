import React from "react";
import { Title } from "../title";
import { Button } from "../../ui";
import { Education } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CompanyEducationItemModal } from "../modals/company-education-item-modal";

type Props = {
  isImageOnRight: boolean;
} & Education;

export const EducationItem: React.FC<Props> = ({
  id,
  title,
  image,
  description,
  isImageOnRight,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-6 lg:gap-8",
        isImageOnRight ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src={image ?? "/images/block-without-image.webp"}
          alt={title}
        />
      </div>

      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
        <div className="text-start">
          <Title text={title} size="md" className="font-bold mb-3" />
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {description.length > 500
              ? description.slice(0, 500) + "..."
              : description}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="lg" className="mt-6 w-full lg:w-1/3 ">
              Подробнее
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <CompanyEducationItemModal id={id} type_="education" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
