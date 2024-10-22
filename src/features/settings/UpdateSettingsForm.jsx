import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
    const { isLoading, error, settings } = useSettings();
    const { isUpdating, updateSetting } = useUpdateSetting();

    if (isLoading) return <Spinner />;
    if (error) return toast.error(error.message);

    const {
        maxBookingLength,
        maxGuestsPerBooking,
        minBookingLength,
        breakfastPrice,
    } = settings;

    function handleUpdate(e, field) {
        const { value } = e.target;
        if (!value) return;

        updateSetting({ [field]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking:">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking:">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking:">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Breakfast price:">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                    disabled={isUpdating}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
