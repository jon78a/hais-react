import Fab from "@mui/material/Fab";
import addCreditAmountField from "./migrations/addCreditAmountField";
import { useMemo, useState } from "react";

type BatchStatus = "Loading" | "Done" | "Ready" | "Error";

const Batch = ({ isActive }: { isActive: boolean }) => {
  const [batchStatus, setBatchStatus] = useState<BatchStatus>("Ready");
  const buttonLabel = useMemo(() => {
    if (batchStatus === "Ready") {
      return "Batch";
    }
    if (batchStatus === "Loading") {
      return "Loading...";
    }
    if (batchStatus === "Done") {
      return "Done";
    }
    if (batchStatus === "Error") {
      return "Error!!";
    }
  }, [batchStatus]);
  const handleClick = () => {
    setBatchStatus("Loading");
    addCreditAmountField()
      .then(() => setBatchStatus("Done"))
      .catch((e) => setBatchStatus("Error"));
  };
  return isActive ? (
    <Fab
      variant="extended"
      onClick={handleClick}
      sx={{
        position: "fixed",
        right: 24,
        top: 96,
        zIndex: 10000,
      }}
      disabled={batchStatus !== "Ready"}
    >
      {buttonLabel}
    </Fab>
  ) : null;
};

export default Batch;
