"use client";

import { getUserData } from "@/server/test";

import { useUser } from "@clerk/nextjs";

export default function Page() {
  const handleClick = async () => {
    console.log(await getUserData());
  };

  const user = useUser()?.user;

  console.log(user);

  return (
    <div className="mt-8 flex flex-col gap-12">
      <button onClick={handleClick}>Click It</button>
    </div>
  );
}
