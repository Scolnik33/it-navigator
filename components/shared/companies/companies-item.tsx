import React from "react";
import { Button, Carousel } from "../../ui";
import { Title } from "../title";
import { Company } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CompanyEducationItemModal } from "../modals/company-education-item-modal";

export const CompaniesItem: React.FC<Company> = ({
  id,
  title,
  image,
  description,
}) => {
  return (
    <Dialog>
      <Carousel.CarouselItem>
        <div className="p-1 flex justify-center">
          <div className="w-3/5 md:h-94 flex flex-col md:flex-row items-center md:pe-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <img
              src={image ?? "/images/block-without-image.webp"}
              alt={title}
              className="object-cover rounded-t-lg h-full md:w-[45%] lg:w-[55%]"
            />
            <div className="flex flex-col justify-between p-6 max-w-[90%] md:w-full leading-normal">
              <Title className="font-bold mb-2" text={title} size="md" />
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm sm:text-md">
                {description.length > 200
                  ? description.slice(0, 200) + "..."
                  : description}
              </p>
              <DialogTrigger asChild>
                <Button variant="default" className="mt-2 w-full sm:w-[200px]">
                  Узнать больше
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>
      </Carousel.CarouselItem>

      <DialogContent className="sm:max-w-4xl">
        <CompanyEducationItemModal id={id} type_="company" />
      </DialogContent>
    </Dialog>
  );
};
