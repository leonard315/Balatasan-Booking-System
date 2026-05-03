# **App Name**: Balatasan Stay

## Core Features:

- Guest Booking & Checkout: An intuitive calendar-based booking engine for rooms and tours with real-time availability, allowing guests to select dates, view filtered options, and proceed to a secure checkout with manual payment receipt upload functionality.
- Dynamic Real-time Availability: Ensures instant updates to room and tour availability across all user interfaces, leveraging Firebase Firestore's real-time listeners (onSnapshot) to reflect booking changes immediately without page refresh.
- Admin Booking & Status Management: A protected dashboard providing administrators with a high-level reservation calendar, tools to view detailed bookings, and functionality to easily confirm, pending, or cancel booking statuses.
- Admin Inventory & Media Management: CRUD (Create, Read, Update, Delete) functionality for managing rooms and tour packages, including uploading and associating images using Firebase Storage to enrich listings.
- User Authentication & Role-Based Access: Secures guest sign-up and login using Firebase Authentication and enforces role-based access control, ensuring only authorized administrators can access and modify sensitive backend data.
- AI-Powered Content Assistant (Admin): A tool that assists administrators in generating engaging and descriptive text for room and tour listings, suggesting creative copy based on provided details to enhance their appeal to potential guests.

## Style Guidelines:

- Primary color: A vibrant Teal (#12AFAB) embodying the clear coastal waters and natural eco-friendliness of Balatasan Beach Resort. This color will be used for interactive elements and highlights.
- Background color: A very light, desaturated shade of Teal (#EAF7F6) to maintain an airy and spacious feel, allowing the primary content to stand out.
- Accent color: A soft, inviting Mint Green (#6FDDC2), providing a gentle contrast and supporting the eco-friendly aesthetic, suitable for secondary actions or decorative elements.
- Headlines font: 'Poppins' (sans-serif) for its precise, contemporary, and avant-garde look, capturing a modern aesthetic. Body text font: 'Inter' (sans-serif) for its modern, neutral, and highly legible appearance, ensuring clarity in descriptions and content.
- Utilize Lucide-React icons, selecting clean, line-art styles that convey concepts related to coastal activities, resort amenities, and navigation, maintaining an eco-friendly aesthetic that harmonizes with the brand.
- Implement a 'Mobile-First' responsive layout using Tailwind CSS, ensuring optimal display and usability across all devices. Focus on intuitive, single-column flows for smaller screens and adaptable grid systems for larger viewports, alongside clear navigation for Home, Accommodations, Tours, About Balatasan, and My Bookings.
- Subtle, smooth transition animations for UI elements like buttons, cards, and modal changes. These animations should enhance user feedback without being distracting, reinforcing the calm and eco-friendly vibe of the resort.