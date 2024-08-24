import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import { Transaction } from "@/app/transaction-history";
import { Colors } from "@/constants/Colors";

type Prop = {
  item: Transaction;
  onPressTransaction: (item: Transaction) => void;
  shouldRevealAmount: boolean;
};

const TransactionItem = memo(
  ({ item, onPressTransaction, shouldRevealAmount }: Prop) => {
    return (
      <TouchableOpacity
        onPress={() => onPressTransaction(item)}
        activeOpacity={0.5}
        style={styles.transactionHistoryItem}
      >
        <View style={styles.transactionHistoryHeader}>
          <Text style={styles.type}>
            {item.type === "debit" ? "Debit" : "Credit"}
          </Text>
          <Text style={styles.date}>{item.date.toDateString()}</Text>
        </View>

        <Text>Description: {"\n" + item.description}</Text>
        <Text style={styles.amountText}>
          Amount: RM {shouldRevealAmount ? item.amount.toFixed(2) : "****.**"}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  transactionHistoryItem: {
    marginBottom: 20,
    borderWidth: 0.5,
    shadowOpacity: 0.2,
    elevation: 10,
    padding: 10,
    borderRadius: 12,
    borderColor: Colors.DARK_GRAY,
  },
  date: {
    fontSize: 12,
  },
  transactionHistoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  flatlist: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  welcomeBack: {
    fontSize: 20,
  },
  welcomeBackContainer: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 20,
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

export default TransactionItem;
