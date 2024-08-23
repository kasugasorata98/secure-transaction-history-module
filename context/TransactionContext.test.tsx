import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { render } from "@testing-library/react-native";
import {
  TransactionProvider,
  useTransactionContext,
} from "./TransactionContext";
import { Transaction } from "@/app/transaction-history";
import Text from "@/components/Text";

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TransactionProvider>{children}</TransactionProvider>
);

describe("TransactionContext", () => {
  it("should provide and update the transaction value", () => {
    const { result } = renderHook(() => useTransactionContext(), { wrapper });

    // Initial state should be undefined
    expect(result.current.transaction).toBeUndefined();

    const mockTransaction: Transaction = {
      amount: 100,
      date: new Date(),
      description: "Test Transaction",
      type: "credit",
      referenceNumber: "123456",
      name: "Test Name",
    };

    // Update the transaction using the setTransaction function
    act(() => {
      result.current.setTransaction(mockTransaction);
    });

    // Verify that the transaction has been updated
    expect(result.current.transaction).toEqual(mockTransaction);
  });

  it("should throw an error if useTransactionContext is used outside of TransactionProvider", () => {
    const { result } = renderHook(() => useTransactionContext());

    expect(result.error).toEqual(
      new Error(
        "useTransactionContext must be used within a TransactionProvider"
      )
    );
  });

  it("should render children inside TransactionProvider", () => {
    const { getByText } = render(
      <TransactionProvider>
        <Text>Test Child</Text>
      </TransactionProvider>
    );

    expect(getByText("Test Child")).toBeTruthy();
  });
});
