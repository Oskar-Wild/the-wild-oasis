import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";

import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { useCheckout } from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeletingBooking } = useDeleteBooking();

    const moveBack = useMoveBack();

    if (isLoading) return <Spinner />;

    if (!booking) return <Empty resourceName="booking" />;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const { status, id: bookingId } = booking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            onConfirm={() => deleteBooking(bookingId)}
                            resourceName="booking"
                            disabled={isDeletingBooking}
                        />
                    </Modal.Window>
                </Modal>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
