import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
interface PostSwitchProps {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

export default function PostSwitch({ setToggle, toggle }: PostSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <span>List</span>
      <Switch
        checked={toggle}
        onCheckedChange={setToggle}
        className={cn(
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary",
        )}
      />
      <span>Card</span>
    </div>
  );
}
