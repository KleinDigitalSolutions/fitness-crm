# Fitness CRM Project

This directory contains the complete research, planning, and future implementation of a production-ready, multi-tenant Fitness CRM SaaS application.

## Project Overview

The goal is to build a comprehensive CRM for fitness studios, based on the extensive research documents provided. The planning phase is complete, and the project is ready for implementation.

**Key Characteristics:**
*   **Product:** A Software-as-a-Service (SaaS) platform for Fitness Studios.
*   **Architecture:** A multi-tenant system using Next.js for the frontend and Supabase for the backend, designed to be hosted as a single web application accessible to all clients.
*   **Status:** Ready for a "GO" decision to begin **Phase 1 (MVP Development)**.

## Key Technologies

*   **Core:** Next.js 15, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage)
*   **UI:** Shadcn UI, TanStack Query, Recharts
*   **Payments:** GoCardless (for SEPA), Stripe (as a backup)
*   **Communications:** Resend (Email), Twilio (SMS/WhatsApp)
*   **Background Jobs:** Inngest
*   **Deployment:** Vercel

## Implementation Strategy

The development will follow the detailed, phased roadmap outlined in the research documents.

1.  **Separate Repository:** The project is intended to be built in a new, dedicated Git repository to ensure a clean separation from the agency website.
2.  **MVP First:** The immediate focus is on building the Minimum Viable Product (MVP) as defined in **Phase 1** of the roadmap. This includes essential features like member and class management, and SEPA payment integration.
3.  **Multi-Tenant Model:** The application will be a single, centrally hosted platform. Each fitness studio (tenant) will log in to access their own securely isolated data, managed via Supabase's Row Level Security.

## Key Documentation

The context for this project is defined by the following critical planning documents:

*   `FITNESS_CRM_INDEX.md`: An index and guide to all other research documents.
*   `FITNESS_CRM_RESEARCH.md`: The primary, in-depth research document (~103 pages) that details all requirements, the tech stack, and the full implementation roadmap.
*   `FITNESS_CRM_EXECUTIVE_SUMMARY.md`: A high-level business summary for stakeholders.
*   `FITNESS_CRM_DATABASE_DIAGRAM.md`: The complete visual database schema, including tables, relationships, and security policies.
*   `FITNESS_CRM_GETTING_STARTED.md`: A step-by-step checklist for the initial project setup and the development of the first MVP features.
*   `FITNESS_CRM_QUICK_REFERENCE.md`: A quick reference card for essential commands, environment variables, and key performance indicators.

## Building and Running (Initial Setup)

The initial setup process is detailed in `FITNESS_CRM_GETTING_STARTED.md`. Key steps will include:

1.  **Initialize Project:** Set up a new Git repository.
2.  **Setup Supabase:** Create a new Supabase project and configure the local environment using the Supabase CLI.
3.  **Install Dependencies:** `npm install`
4.  **Database Migrations:** Run the initial schema migrations.
5.  **Run Development Server:** `npm run dev`