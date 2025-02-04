import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Calendar } from "react-native-calendars"

const ReservationDialog = ({ visible, onClose, onSubmit }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectingStartDate, setSelectingStartDate] = useState(true)

  const handleDateSelect = (day) => {
    if (selectingStartDate) {
      setStartDate(day.dateString)
      setSelectingStartDate(false)
    } else {
      setEndDate(day.dateString)
    }
  }

  const handleSubmit = () => {
    if (startDate && endDate) {
      onSubmit(new Date(startDate), new Date(endDate))
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Select Reservation Dates</Text>

          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [startDate]: { selected: true, startingDay: true, color: "blue" },
              [endDate]: { selected: true, endingDay: true, color: "blue" },
            }}
            minDate={new Date().toISOString().split("T")[0]}
          />

          <Text style={styles.dateText}>Start Date: {startDate || "Not selected"}</Text>
          <Text style={styles.dateText}>End Date: {endDate || "Not selected"}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#1E90FF",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default ReservationDialog

