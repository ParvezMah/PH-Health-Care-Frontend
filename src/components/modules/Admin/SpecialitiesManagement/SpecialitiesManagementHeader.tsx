"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import SpecialitiesFormDialog from "./SpecialitiesFormDialog";

const SpecialitiesManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleSuccess = () => {
  //   startTransition(() => {
  //     router.refresh();
  //   });
  // };

  // Wrap handleSuccess in useCallback to prevent infinite re-render loop.
  const handleSuccess = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router, startTransition]);
  return (
    <>
      <SpecialitiesFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Specialties Management"
        description="Manage Specialties information and details"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default SpecialitiesManagementHeader;