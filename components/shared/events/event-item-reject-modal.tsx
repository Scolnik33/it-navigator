import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components/ui";
import { Container } from "../container";
import { Title } from "../title";
import { useForm } from "react-hook-form";
import { rejectEventSchema, TRejectEvent } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { rejectEvent } from "@/services/reject-event";
import { useAdminEventsStore } from "@/store/admin-events";

interface Props {
  id: number;
  setIsRejectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const reasons = [
  {
    value: "Недостаточная информация о мероприятии",
    label: "Недостаточная информация о мероприятии",
  },
  { value: "Нарушение правил платформы", label: "Нарушение правил платформы" },
  {
    value: "Неверно указана дата или время",
    label: "Неверно указана дата или время",
  },
  {
    value: "Неполная или противоречивая информация",
    label: "Неполная или противоречивая информация",
  },
  {
    value: "Мероприятие не соответствует тематике платформы",
    label: "Мероприятие не соответствует тематике платформы",
  },
  {
    value: "Повторное/дублирующее мероприятие",
    label: "Повторное/дублирующее мероприятие",
  },
];

export const EventItemRejectModal: React.FC<Props> = ({
  id,
  setIsRejectModal,
  setIsOpen,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRejectEvent>({
    resolver: zodResolver(rejectEventSchema),
    defaultValues: {
      reason: "",
      comment: "",
    },
  });
  const getAdminEvents = useAdminEventsStore((state) => state.getAdminEvents);

  const onSubmit = async (data: TRejectEvent) => {
    try {
      await rejectEvent(id, data);
      await getAdminEvents();
      toast.success("Мероприятие успешно отклонено", {
        icon: "✅",
      });
    } catch (err) {
      console.log("Не удалось отклонить мероприятие: ", err);
      toast.error("Не удалось отклонить мероприятие", {
        icon: "❌",
      });
    } finally {
      setIsRejectModal(false);
      setIsOpen(false);
    }
  };

  const selectedReason = watch("reason");
  const classLabel = "cursor-pointer text-sm";

  return (
    <Container className="w-full space-y-8">
      <Title
        className="text-center font-bold text-blue-500"
        text={"Причина отклонения"}
        size="md"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center flex-col items-center space-y-8"
      >
        <RadioGroup
          value={selectedReason}
          onValueChange={(value) =>
            setValue("reason", value, { shouldValidate: true })
          }
          defaultValue="littleInformation"
          className="grid grid-cols-2 gap-6"
        >
          {reasons.map((item, index) => (
            <div className="flex items-center space-x-2" key={item.value}>
              <RadioGroupItem value={item.value} id={`r${index + 1}`} />
              <Label className={classLabel} htmlFor={`r${index + 1}`}>
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors?.reason && (
          <p className="text-red-500 text-md">{errors.reason.message}</p>
        )}

        <Textarea
          placeholder="Подробности отклонения (необязательно)"
          className="w-full max-h-[300px]"
          {...register("comment")}
        />

        <div className="flex items-center gap-2">
          <Button
            loading={isSubmitting}
            type="submit"
            variant={"destructive"}
            size={"lg"}
          >
            Отклонить и отправить
          </Button>
          <Button
            loading={isSubmitting}
            type="button"
            variant={"default"}
            size={"lg"}
            onClick={() => setIsRejectModal(false)}
          >
            Назад
          </Button>
        </div>
      </form>
    </Container>
  );
};
