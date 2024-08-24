import Text from "@/components/Text";
import { AUTHENTICATED_USER } from "@/constants/AsyncStorageKeys";
import { useTransactionContext } from "@/context/TransactionContext";
import useBiometricAuthentication from "@/hooks/useBiometricAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { faker } from "@faker-js/faker";
import TransactionItem from "@/components/TransactionItem";

export type Transaction = {
  amount: number;
  date: Date;
  description: string;
  type: "debit" | "credit";
  referenceNumber: string;
  name: string;
};

export default function TransactionHistoryScreen() {
  const [email, setEmail] = useState("");
  const [shouldRevealAmount, setShouldRevealAmount] = useState(false);
  const { authenticate } = useBiometricAuthentication();
  const { setTransaction } = useTransactionContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(AUTHENTICATED_USER)
      .then((email) => setEmail(email!))
      .catch((err) => console.error(err));

    for (let i = 0; i < 20; i++) {
      addTransactionData();
    }
  }, []);

  function addTransactionData() {
    setTransactions((prev) => {
      return [
        {
          amount: Number(
            faker.finance.amount({
              max: 1000,
              min: 10,
            })
          ),
          date: faker.date.recent(),
          description: faker.finance.transactionDescription(),
          type: Math.random() < 0.5 ? "debit" : "credit",
          referenceNumber: faker.finance.routingNumber(),
          name: faker.finance.accountName(),
        },
        ...prev,
      ];
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      addTransactionData();
      setRefreshing(false);
    }, 1500);
  }, []);

  function onPressTransaction(item: Transaction) {
    setTransaction(item);
    router.push({
      pathname: "/transaction-details",
    });
  }

  const renderTransactionHistoryList = useCallback(
    ({ item }: { item: Transaction }) => {
      return (
        <TransactionItem
          item={item}
          onPressTransaction={onPressTransaction}
          shouldRevealAmount={shouldRevealAmount}
        />
      );
    },
    [onPressTransaction, shouldRevealAmount]
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatlist}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={() => {
        return (
          <View style={styles.welcomeBackContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.welcomeBack}
            >{`Welcome back, ${email || ""}`}</Text>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={async (isCheck) => {
                  if (isCheck) {
                    const result = await authenticate();
                    if (result?.success) {
                      setShouldRevealAmount(true);
                    }
                  } else {
                    setShouldRevealAmount(false);
                  }
                }}
                value={shouldRevealAmount}
                style={styles.switch}
              />
              <Text>Reveal Amount</Text>
            </View>
          </View>
        );
      }}
      data={transactions}
      keyExtractor={(item) => item.referenceNumber}
      renderItem={renderTransactionHistoryList}
    />
  );
}

const styles = StyleSheet.create({
  transactionHistoryItem: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  date: {
    fontSize: 12,
  },
  transactionHistoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlist: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  welcomeBack: {
    fontSize: 14,
  },
  welcomeBackContainer: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
  },
  type: {
    fontSize: 12,
  },
  amountText: {
    marginTop: 20,
  },
  switch: {
    transform: [{ scale: 0.7 }],
  },
});
