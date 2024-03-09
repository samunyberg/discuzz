"use client";

import * as actions from "@/actions";
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const HeaderAuth = () => {
  const session = useSession();

  if (session.status === "loading") return null;

  return session.data?.user ? (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session.data.user.image || ""} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <Button type="submit" onClick={() => actions.signOut()}>
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <NavbarItem>
        <Button
          type="submit"
          color="secondary"
          variant="bordered"
          onClick={() => actions.signIn()}
        >
          Sign In
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button
          type="submit"
          color="primary"
          variant="flat"
          onClick={() => actions.signIn()}
        >
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
};

export default HeaderAuth;
