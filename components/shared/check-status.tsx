import { Event } from "@prisma/client";
import { Button } from "../ui";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CheckStatusItem } from "./index";
import { Title } from "./title";

interface Props {
    events: Event[];
}

export const CheckStatus: React.FC<Props> = ({ events }) => {
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

        <DialogContent className="sm:max-w-4xl">
          <Title className="font-bold" text="Статус мероприятий" size="md" />

          <div className="grid grid-cols-3 gap-4">
            {events.map((item) => (
              <CheckStatusItem key={item.id} {...item} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
