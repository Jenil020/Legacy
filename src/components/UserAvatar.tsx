

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src="/jenil.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <div className="text-sm font-medium">Brett</div>
        <div className="text-xs text-gray-500">Administrator</div>
      </div>
    </div>
  );
}
