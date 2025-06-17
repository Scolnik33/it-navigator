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
    <div className="border border-slate-200 rounded-2xl w-full max-w-sm">
      <img
        className="w-full max-h-[164px] h-[122px] object-cover object-center rounded-t-2xl"
        src={image ?? "/images/block-without-image.webp"}
        alt={"fdsafdsafasd"}
      />
      <div className="p-4 w-full">
        <DialogTitle>
          <Title className="font-bold mt-2" text={title} size="sm" />
        </DialogTitle>
        <p className="text-slate-600 leading-relaxed font-light min-h-[120px] mt-2 break-words">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
        <span>
          Статус:{" "}
          {status == "ACCEPTED"
            ? "Принято ✅"
            : status == "REJECTED"
              ? "Отклонено ❌"
              : status == "WAITING" && "Ожидается ⏳"}
        </span>
      </div>
    </div>
  );
};
// НА ХОСТИНГЕ НЕ ОТПРАВЛЯЕТСЯ ЗАПРОС ПОНЯТЬ ПОЧЕМУ !!!!!!!!!!!!!!!!!
// СДЕЛАТЬ АДАПТИВНУЮ ВЕРСТКУ 
// НУЖНО ЛИ ОТКРЫВАТЬ ПОПАП ПРИ НАЖАТИИ НА ОБЬЕКТ