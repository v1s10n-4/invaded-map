import { FC } from "react";
import invaders from "@/invaders.json";
import { notFound } from "next/navigation";

const InvaderPlacePage: FC<{ params: { invaderName: string } }> = ({
  params: { invaderName },
}) => {
  const invader = invaders.find((i) => i.name === invaderName);
  if (!invader) notFound();
  return <pre>{JSON.stringify(invader, null, 2)}</pre>;
};
export default InvaderPlacePage;