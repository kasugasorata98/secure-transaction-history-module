import { ScrollView, StyleSheet, Switch, View } from "react-native";
import Text from "@/components/Text";
import { useTransactionContext } from "@/context/TransactionContext";
import { useState } from "react";
import useBiometricAuthentication from "@/hooks/useBiometricAuthentication";

export default function TransactionDetailsScreen() {
  const { transaction } = useTransactionContext();
  if (!transaction) return;
  const [shouldRevealAmount, setShouldRevealAmount] = useState(false);
  const { authenticate } = useBiometricAuthentication();

  async function onSwitch(isCheck: boolean) {
    if (isCheck) {
      const result = await authenticate();
      if (result?.success) {
        setShouldRevealAmount(true);
      }
    } else {
      setShouldRevealAmount(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{transaction.name}</Text>
      <View style={styles.body}>
        <Switch
          onValueChange={onSwitch}
          value={shouldRevealAmount}
          style={styles.switch}
        />
        <Text>Reveal Amount</Text>
      </View>
      <View style={styles.data}>
        <Text>Amount</Text>
        <Text>
          RM {shouldRevealAmount ? transaction.amount.toFixed(2) : "****.**"}
        </Text>
      </View>
      <View style={styles.data}>
        <Text>Date</Text>
        <Text>{transaction.date.toDateString()}</Text>
      </View>
      <View style={styles.data}>
        <Text>Description</Text>
        <Text>{transaction.description}</Text>
      </View>
      <View style={styles.data}>
        <Text>Ref. Number</Text>
        <Text>{transaction.referenceNumber}</Text>
      </View>
      <View style={styles.data}>
        <Text>Transaction Type</Text>
        <Text>{transaction.type === "debit" ? "Debit" : "Credit"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  name: {
    textAlign: "center",
    marginVertical: 15,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switch: {
    transform: [{ scale: 0.7 }],
  },
});
