import { Link } from "@tanstack/react-router";
import { useAuth } from "@/stores/auth-store";
import handleLogout from "@/utils/logout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileDropdown() {
  const { user } = useAuth();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          {user ? (
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <p className="text-muted-foreground text-sm leading-none font-medium">
                Guest
              </p>
              <p className="text-muted-foreground text-xs leading-none"></p>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user && (
            <DropdownMenuItem asChild>
              <Link to="/access-token">
                Access token
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            {user ? (
              <a href="#" onClick={handleLogout}>
                Sign Out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </a>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
