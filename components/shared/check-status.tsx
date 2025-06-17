import { Event } from "@prisma/client";
import { Button } from "../ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { CheckStatusItem } from "./index";
import { Title } from "./title";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  events: Event[];
  loading: boolean;
}

export const CheckStatus: React.FC<Props> = ({ events, loading }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="xl"
            variant="outline"
            className="text-sm md:text-base w-full sm:w-auto"
          >
            Статус мероприятий
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <Title className="font-bold" text="Статус мероприятий" size="md" />

          <div className="grid gap-4 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((item) => (
              <CheckStatusItem key={item.id} {...item} />
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button loading={loading} type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
