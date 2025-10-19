# **App Name**: CareCloud SaaS

## Core Features:

- User Authentication: Secure user authentication with Firebase, supporting email/password login and role-based access control (RBAC).
- Multi-Tenant Firestore Database: Firestore database setup with a multi-tenant architecture to isolate data between different daycare organizations.
- Client Management: Create, read, update, and delete (CRUD) operations for managing client profiles, including basic information, attendance records, care plans, authorizations, transportation, and documents.
- Staff Management: Manage staff profiles, roles, and permissions within the organization. Allows assigning roles such as admin, org_admin, caregiver, and nurse with specific access levels.
- Stripe Subscription Management: Integrate Stripe for handling subscription payments, including monthly/annual plans. Webhooks update tenant status upon successful payment or cancellation.
- Dashboard KPIs: Display key performance indicators (KPIs) such as total clients, attendance today, compliance alerts, and upcoming care plans to provide insights at a glance.
- Automated Compliance Check Tool: An AI powered tool to assess staff credentials and training records, highlighting potential compliance issues with an estimation of compliance risk based on expiry dates.

## Style Guidelines:

- Primary color: Light and calming blue (#A0D2EB) to inspire trust and reliability.
- Background color: Very light, desaturated blue (#F0F8FF) to provide a clean and spacious feel.
- Accent color: A contrasting warm orange (#FFB347) to highlight important actions and notifications.
- Body font: 'Inter' (sans-serif) for clear and accessible readability across the platform.
- Headline font: 'Space Grotesk' (sans-serif) providing a modern and slightly technical aesthetic suitable for dashboard elements and section headers; use 'Inter' for body text.
- Use simple, modern icons from a consistent set (e.g., Material Design Icons) to represent different features and modules.
- Responsive grid layout adapting to different screen sizes, with mobile-first approach. Collapsible sidebar on smaller screens.