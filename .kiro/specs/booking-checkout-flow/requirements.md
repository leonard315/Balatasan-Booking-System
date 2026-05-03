# Requirements Document

## Introduction

The Booking Checkout Flow is a structured, multi-step process that allows authenticated guests of Balatasan Beach Resort to select dates and guest count for a room (cottage) or tour, review a booking summary, and submit the booking. Upon submission, a Firestore document is created under `users/{uid}/bookings` with status `"Pending Payment"`. The flow replaces the current inline booking widgets embedded in the accommodation and tour detail pages, providing a dedicated, consistent checkout experience across both booking types.

## Glossary

- **Checkout_Flow**: The multi-step UI process a guest follows to create a booking, consisting of a Selection Step, a Review Step, and a Confirmation Step.
- **Guest**: An authenticated Firebase user browsing the resort's accommodations or tours.
- **Booking**: A Firestore document stored at `users/{uid}/bookings/{bookingId}` representing a reservation made by a Guest.
- **Booking_Status**: The current state of a Booking. Valid values are `"Pending Payment"`, `"Confirmed"`, and `"Cancelled"`.
- **Room**: An accommodation listing stored in the Firestore `rooms` collection (e.g., a floating cottage or eco-tent).
- **Tour**: An activity listing stored in the Firestore `tours` collection (e.g., island hopping, jet ski, flying fish).
- **Selection_Step**: The first step of the Checkout_Flow where the Guest selects dates and guest count (or duration for time-based tours).
- **Review_Step**: The second step of the Checkout_Flow where the Guest reviews the booking summary before submitting.
- **Confirmation_Step**: The third step of the Checkout_Flow shown after a Booking is successfully created, providing next-step instructions.
- **Total_Price**: The computed booking cost. For Rooms: `pricePerPerson × guestCount × nights`. For per-person Tours: `pricePerPerson × guestCount`. For time-based Tours (e.g., Jet Ski): `ratePerMinute × durationMinutes`.
- **GCash**: The manual payment method used by the resort. Guests send payment to the resort's GCash number and upload proof in My Bookings.
- **Proof_of_Payment**: An image uploaded by the Guest to the My Bookings page to evidence a GCash transfer.

---

## Requirements

### Requirement 1: Authentication Gate

**User Story:** As a Guest, I want to be redirected to the login page when I attempt to start a booking without being signed in, so that only authenticated users can create bookings.

#### Acceptance Criteria

1. WHEN an unauthenticated user initiates the Checkout_Flow, THE Checkout_Flow SHALL redirect the user to `/login`.
2. WHEN an unauthenticated user is redirected to `/login`, THE Checkout_Flow SHALL preserve the intended booking URL so the user is returned to the correct page after login.
3. WHILE a user's authentication state is loading, THE Checkout_Flow SHALL display a loading indicator and withhold rendering the booking form.

---

### Requirement 2: Selection Step — Room Booking

**User Story:** As a Guest, I want to select check-in and check-out dates and the number of guests for a cottage, so that I can specify the details of my stay.

#### Acceptance Criteria

1. WHEN a Guest opens the Selection_Step for a Room, THE Selection_Step SHALL display a check-in date picker, a check-out date picker, and a guest count selector.
2. WHEN a Guest selects a check-in date, THE Selection_Step SHALL disable all dates before the current date in the check-in date picker.
3. WHEN a Guest selects a check-out date, THE Selection_Step SHALL disable all dates on or before the selected check-in date in the check-out date picker.
4. WHEN a Guest selects dates, THE Selection_Step SHALL compute and display the number of nights as `differenceInDays(checkOut, checkIn)`.
5. THE Selection_Step SHALL populate the guest count selector with integer options from 1 to the Room's `capacity` value.
6. WHEN a Guest attempts to proceed from the Selection_Step with a check-out date that is not after the check-in date, THE Selection_Step SHALL display a validation error message and prevent navigation to the Review_Step.
7. WHEN a Guest attempts to proceed from the Selection_Step without selecting both a check-in and check-out date, THE Selection_Step SHALL display a validation error message and prevent navigation to the Review_Step.

---

### Requirement 3: Selection Step — Tour Booking

**User Story:** As a Guest, I want to select a date and the number of guests (or duration) for a tour, so that I can specify the details of my activity.

#### Acceptance Criteria

1. WHEN a Guest opens the Selection_Step for a per-person Tour, THE Selection_Step SHALL display a date picker and a guest count selector.
2. WHEN a Guest opens the Selection_Step for a time-based Tour (Jet Ski), THE Selection_Step SHALL display a date picker and a duration selector with options of 15, 30, and 60 minutes.
3. WHEN a Guest selects a date, THE Selection_Step SHALL disable all dates before the current date in the date picker.
4. THE Selection_Step SHALL populate the guest count selector with integer options from 1 to the Tour's `capacity` value.
5. WHEN a Guest attempts to proceed from the Selection_Step without selecting a date, THE Selection_Step SHALL display a validation error message and prevent navigation to the Review_Step.

---

### Requirement 4: Total Price Calculation

**User Story:** As a Guest, I want to see the total price update in real time as I change my booking details, so that I know the cost before confirming.

#### Acceptance Criteria

1. WHEN a Guest changes the check-in date, check-out date, or guest count for a Room booking, THE Selection_Step SHALL recompute and display the Total_Price as `pricePerPerson × guestCount × nights`.
2. WHEN a Guest changes the guest count for a per-person Tour booking, THE Selection_Step SHALL recompute and display the Total_Price as `pricePerPerson × guestCount`.
3. WHEN a Guest changes the duration for a time-based Tour booking, THE Selection_Step SHALL recompute and display the Total_Price as `ratePerMinute × durationMinutes`.
4. THE Selection_Step SHALL display the pricing formula breakdown (e.g., "₱500 × 2 guests × 3 nights") alongside the Total_Price.
5. IF the computed Total_Price is zero or negative, THEN THE Selection_Step SHALL display a validation error and disable the proceed button.

---

### Requirement 5: Review Step

**User Story:** As a Guest, I want to review a summary of my booking before submitting, so that I can verify all details are correct before committing.

#### Acceptance Criteria

1. WHEN a Guest proceeds to the Review_Step, THE Review_Step SHALL display the item name, item type (Room or Tour), selected dates, guest count, and Total_Price.
2. WHEN the booking is for a Room, THE Review_Step SHALL display the check-in date, check-out date, and number of nights.
3. WHEN the booking is for a time-based Tour, THE Review_Step SHALL display the selected date and selected duration.
4. WHEN the booking is for a per-person Tour, THE Review_Step SHALL display the selected date and guest count.
5. THE Review_Step SHALL display the GCash payment instructions, including the resort's GCash number.
6. THE Review_Step SHALL provide a "Back" button that returns the Guest to the Selection_Step without losing previously entered data.
7. THE Review_Step SHALL provide a "Confirm Booking" button that initiates the Booking submission.

---

### Requirement 6: Guest Contact Information

**User Story:** As a Guest, I want to provide my contact number during checkout, so that the resort can reach me regarding my booking.

#### Acceptance Criteria

1. THE Review_Step SHALL include a contact number input field.
2. WHEN a Guest submits the booking with an empty contact number field, THE Review_Step SHALL display a validation error and prevent submission.
3. WHEN a Guest submits the booking with a contact number containing fewer than 7 digits, THE Review_Step SHALL display a validation error and prevent submission.
4. WHEN a Guest submits a valid booking, THE Checkout_Flow SHALL store the provided contact number in the Booking document's `contactNumber` field.

---

### Requirement 7: Booking Submission

**User Story:** As a Guest, I want my booking to be saved to Firestore when I confirm, so that the resort receives my reservation request.

#### Acceptance Criteria

1. WHEN a Guest clicks "Confirm Booking", THE Checkout_Flow SHALL create a Booking document in Firestore at `users/{uid}/bookings/{bookingId}`.
2. WHEN the Booking document is created, THE Checkout_Flow SHALL set the `status` field to `"Pending Payment"`.
3. WHEN the Booking document is created, THE Checkout_Flow SHALL include the fields: `userId`, `itemId`, `itemName`, `itemType`, `startDate`, `endDate`, `status`, `totalPrice`, `guestCount`, `guestName`, `contactNumber`, and `createdAt`.
4. WHEN the Booking document is created, THE Checkout_Flow SHALL set `createdAt` to the current ISO 8601 timestamp.
5. WHILE the Booking document is being written to Firestore, THE Checkout_Flow SHALL display a loading indicator on the "Confirm Booking" button and disable it to prevent duplicate submissions.
6. IF the Firestore write fails, THEN THE Checkout_Flow SHALL display an error message to the Guest and re-enable the "Confirm Booking" button.

---

### Requirement 8: Confirmation Step

**User Story:** As a Guest, I want to see a confirmation screen after submitting my booking, so that I know my reservation was received and understand the next steps.

#### Acceptance Criteria

1. WHEN a Booking document is successfully created, THE Checkout_Flow SHALL navigate the Guest to the Confirmation_Step.
2. THE Confirmation_Step SHALL display the booking reference ID (first 8 characters of the Firestore document ID, uppercased).
3. THE Confirmation_Step SHALL display the item name and Total_Price of the confirmed Booking.
4. THE Confirmation_Step SHALL display the GCash payment instructions and the resort's GCash number.
5. THE Confirmation_Step SHALL provide a link that navigates the Guest to the My Bookings page (`/my-bookings`).
6. THE Confirmation_Step SHALL provide a link that navigates the Guest back to the Accommodations or Tours listing page, depending on the booking type.

---

### Requirement 9: Step Progress Indicator

**User Story:** As a Guest, I want to see which step of the checkout I am on, so that I understand how far along I am in the process.

#### Acceptance Criteria

1. THE Checkout_Flow SHALL display a step indicator showing the three steps: "Select Details", "Review", and "Confirmed".
2. WHEN the Guest is on the Selection_Step, THE Checkout_Flow SHALL visually mark "Select Details" as the active step.
3. WHEN the Guest is on the Review_Step, THE Checkout_Flow SHALL visually mark "Review" as the active step.
4. WHEN the Guest is on the Confirmation_Step, THE Checkout_Flow SHALL visually mark "Confirmed" as the active step.

---

### Requirement 10: Item Data Loading

**User Story:** As a Guest, I want the checkout page to load the correct room or tour details from Firestore, so that the booking is based on accurate, up-to-date information.

#### Acceptance Criteria

1. WHEN the Checkout_Flow is opened for a Room, THE Checkout_Flow SHALL fetch the Room document from the Firestore `rooms` collection using the item ID.
2. WHEN the Checkout_Flow is opened for a Tour, THE Checkout_Flow SHALL fetch the Tour document from the Firestore `tours` collection using the item ID.
3. WHILE the item document is loading from Firestore, THE Checkout_Flow SHALL display a loading indicator.
4. IF the item document does not exist in Firestore, THEN THE Checkout_Flow SHALL display a "not found" message and provide a link back to the relevant listing page.
5. THE Checkout_Flow SHALL display the item's name, image, and price rate on the Selection_Step and Review_Step.
