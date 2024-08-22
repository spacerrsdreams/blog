"use client";

import { createContext, useContext, useState, type PropsWithChildren } from "react";

import SignInPopup from "@/components/popup/SignInPopup";
import ReportStory from "@/components/post/actions/ReportStory";

type PopupTypes = "signIn" | "report";
type PopupContextT = {
  signInModalOpen: boolean;
  reportModalOpen: boolean;
  setOpenModal: (open: boolean, type: PopupTypes) => void;
};

export const PopupContext = createContext<PopupContextT | null>(null);

export const PopupProvider = ({ children }: PropsWithChildren) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const setOpenModal = (open: boolean, type: PopupTypes) => {
    type === "signIn" ? setSignInModalOpen(open) : setReportModalOpen(open);
  };

  const value = {
    signInModalOpen,
    reportModalOpen,
    setOpenModal,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
      <SignInPopup open={signInModalOpen} setOpen={(open) => setOpenModal(open, "signIn")} />
      <ReportStory open={reportModalOpen} setOpen={(open) => setOpenModal(open, "report")} />
    </PopupContext.Provider>
  );
};

export const usePopupProvider = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopupProvider must be used within PopupProvider");
  }

  return context;
};
