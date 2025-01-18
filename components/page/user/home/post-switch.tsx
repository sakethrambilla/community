"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  selectPostView,
  setPostView,
} from "@/redux/features/user/post-toggle/slice";
import { useDispatch, useSelector } from "react-redux";

export default function PostSwitch() {
  const postView = useSelector(selectPostView);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm lg:text-base">List</span>
      <Switch
        checked={postView === "card"}
        onCheckedChange={() =>
          dispatch(setPostView(postView === "list" ? "card" : "list"))
        }
        className={cn(
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary",
        )}
      />
      <span className="text-sm lg:text-base">Card</span>
    </div>
  );
}
