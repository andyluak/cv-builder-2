import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import CVBuilder from "@/components/form";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className='p-2'>
      <CVBuilder />
    </div>
  );
}
