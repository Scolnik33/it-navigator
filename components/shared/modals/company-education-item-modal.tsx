"use client";

import { Button } from "@/components/ui";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSectionsDetailsStore } from "@/store/sectionsDetails";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Title } from "../title";
import { Globe, Mail, MapPin, Smartphone } from "lucide-react";
import { CompaniesItemModalSkeleton } from "../companies/skeleton/companies-item-modal-skeleton";
import { useCloseButtonRef } from "@/hooks/useCloseButtonRef";
import Link from "next/link";

interface Props {
  id: number;
  type_: "company" | "education";
}

export const CompanyEducationItemModal: React.FC<Props> = ({ id, type_ }) => {
  const type = useSectionsDetailsStore((state) =>
    type_ == "company" ? state.company : state.education
  );
  const getType = useSectionsDetailsStore((state) =>
    type_ == "company" ? state.getCompany : state.getEducation
  );
  const loading = useSectionsDetailsStore((state) => state.loading);
  const ref = useCloseButtonRef();

  useEffect(() => {
    try {
      getType(id);
    } catch (err) {
      console.log("ERROR [GET COMPANY-EDUCATION MODAL]", err);
      toast.error(
        type_ == "company"
          ? "Не удалось открыть компанию"
          : "Не удалось открыть учебное заведение",
        {
          icon: "❌",
        }
      );
      ref.current?.click();
    }
  }, [id]);

  return (
    <>
      {loading || !type ? (
        <CompaniesItemModalSkeleton />
      ) : (
        <>
          <DialogHeader>
            <img
              src={type.image ? type.image : "/images/block-without-image.webp"}
              alt="education-image"
              className="max-h-[200px] object-contain"
            />
            <hr />
            <DialogTitle>
              <Title className="font-bold mt-2" text={type.title} size="md" />
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[35vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <p>{type.description}</p>
              {type.website && (
                <div className="flex items-center gap-2">
                  <Link
                    href={type.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    <Globe width={16} height={16} />
                    {type.website}
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail width={16} height={16} />
                {type.email}
              </div>
              <div className="flex items-center gap-2">
                <Smartphone width={16} height={16} />
                {type.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin width={16} height={16} />
                {type.address}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={ref} type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
};
