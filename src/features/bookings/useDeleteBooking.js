import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation(
        {
            mutationFn: deleteBookingApi,
            onSuccess: () => {
                toast.success("The booking was successfully deleted!");
                queryClient.invalidateQueries({
                    queryKey: ["bookings"],
                });
                navigate("/bookings");
            },
            onError: (err) => toast.error(err.message),
        }
    );

    return { deleteBooking, isDeletingBooking };
}
