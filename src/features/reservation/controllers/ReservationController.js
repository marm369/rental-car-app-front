import { ReservationService } from "../services/ReservationService"
export const ReservationController = {
  getOwnerReservations: async (ownerId) => {
    try {
      return await ReservationService.getOwnerReservations(ownerId)
    } catch (error) {
      console.error("Error in getOwnerReservations controller:", error)
      throw error
    }
  },

  getUserReservationStatus: async (userId) => {
    try {
      return await ReservationService.getUserReservationStatus(userId)
    } catch (error) {
      console.error("Error in getUserReservationStatus controller:", error)
      throw error
    }
  },

  approveReservation: async (reservationId, status) => {
    try {
      return await ReservationService.approveReservation(reservationId, status)
    } catch (error) {
      console.error("Error in approveReservation controller:", error)
      throw error
    }
  },
}

