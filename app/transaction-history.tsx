import Text from "@/components/Text";
import { AUTHENTICATED_USER } from "@/constants/AsyncStorageKeys";
import { useTransactionContext } from "@/context/TransactionContext";
import useBiometricAuthentication from "@/hooks/useBiometricAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

export type Transaction = {
  amount: number;
  date: Date;
  description: string;
  type: "debit" | "credit";
  referenceNumber: string;
  name: string;
};

const TRANSACTION_DATA: Transaction[] = [
  {
    amount: 50.0,
    date: new Date("2024-01-01"),
    description: "Grocery Store",
    type: "debit",
    referenceNumber: "REF001",
    name: "John Doe",
  },
  {
    amount: 120.0,
    date: new Date("2024-01-02"),
    description: "Salary",
    type: "credit",
    referenceNumber: "REF002",
    name: "Jane Smith",
  },
  {
    amount: 30.5,
    date: new Date("2024-01-03"),
    description: "Coffee Shop",
    type: "debit",
    referenceNumber: "REF003",
    name: "John Doe",
  },
  {
    amount: 75.0,
    date: new Date("2024-01-04"),
    description: "Restaurant",
    type: "debit",
    referenceNumber: "REF004",
    name: "Emily Davis",
  },
  {
    amount: 200.0,
    date: new Date("2024-01-05"),
    description: "Freelance Project",
    type: "credit",
    referenceNumber: "REF005",
    name: "Michael Brown",
  },
  {
    amount: 45.0,
    date: new Date("2024-01-06"),
    description: "Book Store",
    type: "debit",
    referenceNumber: "REF006",
    name: "Sarah Johnson",
  },
  {
    amount: 150.0,
    date: new Date("2024-01-07"),
    description: "Consulting",
    type: "credit",
    referenceNumber: "REF007",
    name: "David Wilson",
  },
  {
    amount: 55.0,
    date: new Date("2024-01-08"),
    description: "Gym Membership",
    type: "debit",
    referenceNumber: "REF008",
    name: "John Doe",
  },
  {
    amount: 25.0,
    date: new Date("2024-01-09"),
    description: "Movie Tickets",
    type: "debit",
    referenceNumber: "REF009",
    name: "Emily Davis",
  },
  {
    amount: 90.0,
    date: new Date("2024-01-10"),
    description: "Online Course",
    type: "debit",
    referenceNumber: "REF010",
    name: "Sarah Johnson",
  },
  {
    amount: 300.0,
    date: new Date("2024-01-11"),
    description: "Client Payment",
    type: "credit",
    referenceNumber: "REF011",
    name: "Michael Brown",
  },
  {
    amount: 40.0,
    date: new Date("2024-01-12"),
    description: "Lunch",
    type: "debit",
    referenceNumber: "REF012",
    name: "David Wilson",
  },
  {
    amount: 60.0,
    date: new Date("2024-01-13"),
    description: "Retail Store",
    type: "debit",
    referenceNumber: "REF013",
    name: "Jane Smith",
  },
  {
    amount: 110.0,
    date: new Date("2024-01-14"),
    description: "Project Payment",
    type: "credit",
    referenceNumber: "REF014",
    name: "John Doe",
  },
  {
    amount: 35.0,
    date: new Date("2024-01-15"),
    description: "Pharmacy",
    type: "debit",
    referenceNumber: "REF015",
    name: "Sarah Johnson",
  },
  {
    amount: 150.0,
    date: new Date("2024-01-16"),
    description: "Freelance Job",
    type: "credit",
    referenceNumber: "REF016",
    name: "Emily Davis",
  },
  {
    amount: 22.0,
    date: new Date("2024-01-17"),
    description: "Parking",
    type: "debit",
    referenceNumber: "REF017",
    name: "Michael Brown",
  },
  {
    amount: 70.0,
    date: new Date("2024-01-18"),
    description: "Dinner",
    type: "debit",
    referenceNumber: "REF018",
    name: "John Doe",
  },
  {
    amount: 95.0,
    date: new Date("2024-01-19"),
    description: "Web Design",
    type: "credit",
    referenceNumber: "REF019",
    name: "David Wilson",
  },
  {
    amount: 18.0,
    date: new Date("2024-01-20"),
    description: "Taxi Fare",
    type: "debit",
    referenceNumber: "REF020",
    name: "Sarah Johnson",
  },
  {
    amount: 140.0,
    date: new Date("2024-01-21"),
    description: "Online Project",
    type: "credit",
    referenceNumber: "REF021",
    name: "Jane Smith",
  },
  {
    amount: 85.0,
    date: new Date("2024-01-22"),
    description: "Subscription",
    type: "debit",
    referenceNumber: "REF022",
    name: "Emily Davis",
  },
  {
    amount: 250.0,
    date: new Date("2024-01-23"),
    description: "Side Project",
    type: "credit",
    referenceNumber: "REF023",
    name: "Michael Brown",
  },
  {
    amount: 48.0,
    date: new Date("2024-01-24"),
    description: "Coffee Shop",
    type: "debit",
    referenceNumber: "REF024",
    name: "John Doe",
  },
  {
    amount: 200.0,
    date: new Date("2024-01-25"),
    description: "Contract Work",
    type: "credit",
    referenceNumber: "REF025",
    name: "David Wilson",
  },
  {
    amount: 75.0,
    date: new Date("2024-01-26"),
    description: "Apparel Store",
    type: "debit",
    referenceNumber: "REF026",
    name: "Sarah Johnson",
  },
  {
    amount: 55.0,
    date: new Date("2024-01-27"),
    description: "Grocery Store",
    type: "debit",
    referenceNumber: "REF027",
    name: "Emily Davis",
  },
  {
    amount: 310.0,
    date: new Date("2024-01-28"),
    description: "Payment Received",
    type: "credit",
    referenceNumber: "REF028",
    name: "Michael Brown",
  },
  {
    amount: 40.0,
    date: new Date("2024-01-29"),
    description: "Utility Bill",
    type: "debit",
    referenceNumber: "REF029",
    name: "John Doe",
  },
  {
    amount: 95.0,
    date: new Date("2024-01-30"),
    description: "Consulting",
    type: "credit",
    referenceNumber: "REF030",
    name: "David Wilson",
  },
  {
    amount: 30.0,
    date: new Date("2024-01-31"),
    description: "Book Store",
    type: "debit",
    referenceNumber: "REF031",
    name: "Sarah Johnson",
  },
  {
    amount: 120.0,
    date: new Date("2024-02-01"),
    description: "Freelance Payment",
    type: "credit",
    referenceNumber: "REF032",
    name: "Emily Davis",
  },
  {
    amount: 65.0,
    date: new Date("2024-02-02"),
    description: "Retail Store",
    type: "debit",
    referenceNumber: "REF033",
    name: "Michael Brown",
  },
  {
    amount: 190.0,
    date: new Date("2024-02-03"),
    description: "Project Fee",
    type: "credit",
    referenceNumber: "REF034",
    name: "John Doe",
  },
  {
    amount: 85.0,
    date: new Date("2024-02-04"),
    description: "Subscription",
    type: "debit",
    referenceNumber: "REF035",
    name: "Sarah Johnson",
  },
  {
    amount: 300.0,
    date: new Date("2024-02-05"),
    description: "Client Payment",
    type: "credit",
    referenceNumber: "REF036",
    name: "Emily Davis",
  },
  {
    amount: 22.0,
    date: new Date("2024-02-06"),
    description: "Taxi Fare",
    type: "debit",
    referenceNumber: "REF037",
    name: "Michael Brown",
  },
  {
    amount: 120.0,
    date: new Date("2024-02-07"),
    description: "Freelance Work",
    type: "credit",
    referenceNumber: "REF038",
    name: "John Doe",
  },
  {
    amount: 50.0,
    date: new Date("2024-02-08"),
    description: "Gym Membership",
    type: "debit",
    referenceNumber: "REF039",
    name: "Sarah Johnson",
  },
  {
    amount: 220.0,
    date: new Date("2024-02-09"),
    description: "Consulting Fee",
    type: "credit",
    referenceNumber: "REF040",
    name: "Michael Brown",
  },
];

export default function TransactionHistoryScreen() {
  const [email, setEmail] = useState("");
  const [shouldRevealAmount, setShouldRevealAmount] = useState(false);
  const { authenticate } = useBiometricAuthentication();
  const { setTransaction } = useTransactionContext();
  useEffect(() => {
    AsyncStorage.getItem(AUTHENTICATED_USER)
      .then((email) => setEmail(email!))
      .catch((err) => console.error(err));
  }, []);

  function onPressTransaction(item: Transaction) {
    setTransaction(item);
    router.push({
      pathname: "/transaction-details",
    });
  }

  const renderTransactionHistoryList = ({ item }: { item: Transaction }) => {
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

        <Text>Description: {item.description}</Text>
        <Text style={styles.amountText}>
          Amount: RM {shouldRevealAmount ? item.amount.toFixed(2) : "****.**"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.flatlist}
      ListHeaderComponent={() => {
        return (
          <View style={styles.welcomeBackContainer}>
            <Text style={styles.welcomeBack}>{`Welcome back, ${
              email || ""
            }`}</Text>
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
      data={TRANSACTION_DATA}
      keyExtractor={(_, index) => index.toString()}
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
