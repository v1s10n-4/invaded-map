import React, { FC } from "react";
import invaders from "@/invaders.json";
import {notFound, useRouter} from "next/navigation";

const InvaderPlacePage: FC<{ params: { invaderName: string } }> = ({
  params: { invaderName },
}) => {
  const invader = invaders.find((i) => i.name === invaderName);
  if (!invader) notFound();
  return (
    <div>
      <pre className="absolute bottom-8 left-8">
        {JSON.stringify(invader, null, 2)}
      </pre>
    </div>
  );
};
export default InvaderPlacePage;
