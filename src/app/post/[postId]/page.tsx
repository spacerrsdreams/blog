"use client";

import { getUserData } from "@/app/server/test";

export default function Page() {
  const handleClick = async () => {
    console.log(await getUserData());
  };

  return (
    <div className="mt-8 flex flex-col gap-12">
      <button onClick={handleClick}>Click It</button>
    </div>
  );
}
