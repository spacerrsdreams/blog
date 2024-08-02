"use client";

import { createContext, useContext, useState, type PropsWithChildren } from "react";

import SignInPopup from "@/components/popup/SignInPopup";

type PopupContextT = {
  isOpen: boolean;
  open: (e: boolean) => void;
  close: (e: boolean) => void;
};

export const PopupContext = createContext<PopupContextT | null>(null);

export const PopupProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <PopupContext.Provider value={{ isOpen, open, close }}>
      {children}
      <SignInPopup open={isOpen} setOpen={setIsOpen} />
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
