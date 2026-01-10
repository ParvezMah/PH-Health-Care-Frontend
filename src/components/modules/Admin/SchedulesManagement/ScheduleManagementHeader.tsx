"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import ScheduleFormDialog from "./ScheduleFormDialog";

const SchedulesManagementHeader = () => {
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

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };

    // Wrap handleCloseDialog in useCallback to prevent infinite re-render loop.
  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <ScheduleFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Schedules Management"
        description="Create and manage appointment schedules"
        action={{
          label: "Create Schedule",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default SchedulesManagementHeader;
