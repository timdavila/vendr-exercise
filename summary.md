# Wizard Component
I implemented a basic onboarding wizard using React, TypeScript, Radix UI, and Tailwind CSS. The goal was to create an interactive and user-friendly wizard to guide users through a multi-step onboarding process, while keeping things simple and focusing on functionality. 

## Structure and Components
The Wizard component itself is a single, monolithic component, which is currently hardcoded for onboarding purposes. The wizard is composed of more primitive components such as Input, Label, and Button, which are used to compose forms that collect user data. Each step in the wizard is its own form, with its own validation to determine whether the user can proceed. The form state for the entire wizard is stored in a single `formData` object. This ensures that the data can easily be submitted to an API once the user completes the entire wizard. It also means that users can move backwards and forwards between steps without losing any progress. The number of steps, their names, and the progress percentage are hardcoded. If I had more time, I would abstract this, allowing for flexible use cases beyond onboarding.

## Key Features
### State Management
All user supplied data is held in one `formData` object. This way we have one source of truth and it makes it easy to submit the collected data at the end. It also has the benefit of easily preserving the data when the user navigates back and forth between steps, with the exception of the conditional `features` array. In the interest of time, I rebuild the array with the valid options each time the company step is submitted.

### Validation and Error Handling
Each form step has its own validation logic. If validation fails, the user is prevented from proceeding. In the current implementation, error messages are shown in an alert dialog. If I had more time, I would highlight the specific form field that has an error (e.g., a red border around the email field) and display user friendly error messages inline with the form rather than in the alert.

## Potential Improvements
* Internationalization (i18n): The wizard could be extended to support multiple languages.
* ADA Compliance: Adding accessibility features, such as better keyboard navigation and screen reader support, would make the wizard more inclusive.
* Persistence (LocalStorage): To improve the user experience, I would store the wizard state in localStorage so that if the user closes the window and returns later, their progress is saved and can be continued from where they left off.
* Component Abstraction for Reusability: The wizard's steps and progress could be made dynamic. Instead of hardcoding them, I would make each step configurable based on the use case. To extend the wizard to other use cases, I would create an intermediary <WizardStep> component, which could be a child of the <Wizard>. Each step would handle its own form validation and business logic. The <Wizard> component would be responsible for managing the overall progress, state, and handling form submission. I would use events like `completeStep` or `setCurrentStep` to lift state up to the parent <Wizard> component and manage progress smoothly. And the <Wizard> could be rewritten to dynamically compute progress, as well as which step is the previous and next for navigation.

## Data Submission
Currently, after completing the wizard, I display the `formData` object in a simple table for review.
In a real application, this data should be sent to an API for processing once the wizard is complete.

## UI Design and Component Library
All primitive UI components (like buttons, inputs, and labels) should be part of a design system for consistency. Fortunately using Radix UI simplifies this by providing accessible, customizable components that I used to build the wizard UI. These components handle the UI structure and presentation, allowing the wizard to focus on the business logic (e.g., form validation, progress tracking, etc.).

## Conclusion
This wizard provides a solid foundation for a multi-step onboarding process, but there are several areas where improvements can be made. The code is available at https://github.com/timdavila/vendr-exercise and a hosted demo is at https://vendr.timdavila.com. I enjoyed the process and hope to hear from you soon!