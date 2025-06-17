import { Event } from "@prisma/client";
import { DialogTitle } from "../ui/dialog";
import { Title } from "./title";

export const CheckStatusItem: React.FC<Event> = ({
  image,
  title,
  description,
  status,
}) => {
  return (
    <div
      className="border border-slate-200 rounded-2xl w-full max-w-sm sm:max-w-full sm:flex sm:flex-col overflow-hidden"
    >
      <img
        className="w-full h-[122px] sm:h-[180px] md:h-[200px] object-cover object-center rounded-t-2xl"
        src={image ?? "/images/block-without-image.webp"}
        alt="Event Image"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <DialogTitle>
          <Title className="font-bold mt-2 text-base " text={title} size="sm" />
        </DialogTitle>
        <p className="text-slate-600 leading-relaxed font-light mt-2 text-sm sm:text-base flex-grow break-words">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
        <span className="block mt-4 text-sm sm:text-base font-medium">
          Статус:{" "}
          {status === "ACCEPTED"
            ? "Принято ✅"
            : status === "REJECTED"
              ? "Отклонено ❌"
              : status === "WAITING" && "Ожидается ⏳"}
        </span>
      </div>
    </div>
  );
};
