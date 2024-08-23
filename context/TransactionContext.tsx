import { Transaction } from "@/app/transaction-history";
import React, { createContext, useState, ReactNode } from "react";

interface TransactionContextType {
  transaction?: Transaction;
  setTransaction: (transaction: Transaction) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transaction, setTransaction] = useState<Transaction>();

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionContext = () => {
  const context = React.useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export { TransactionProvider, useTransactionContext };
