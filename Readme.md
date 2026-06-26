# Dispatch Automation Tests

## Overview

This project contains automated end-to-end tests for the Dispatch module using Playwright and TypeScript.

The tests automate common Dispatch workflows such as:

* Creating a dispatch
* Allocating dispatches
* Fueling dispatches
* Cancelling dispatches
* Resetting dispatches to quotation
* Validating business rules and workflow transitions

The automation suite is designed to run:

* Locally by developers
* In CI/CD pipelines
* On scheduled executions
* With Microsoft Teams notifications after execution

---

# Project Structure

```
dispatch-playwright/
│
├── tests/                  # Playwright test files
├── page_objects/                  # Page Object Models
├── fixtures/               # Shared fixtures
├── utils/                  # Helper functions
├── playwright.config.ts
├── package.json
├── execute_playwright.sh
└── README.md
```

---

# Prerequisites

Before running the project ensure you have:

* Node.js (v18 or later recommended)
* npm
* Git
* Access to Odoo application
* Appropriate test user credentials

---

# Clone the Repository

Clone the project from Git.

```bash
git clone https://github.com/kiarieking/odoo19-playwright-tests.git
```

Navigate into the project.

```bash
cd odoo19playwright
```

---

# Install Dependencies

Install all project dependencies.

```bash
npm install
```

---

# Install Playwright Browsers

The first time you set up the project install the browser binaries.

```bash
npx playwright install
```

If running inside Linux CI environments:

```bash
npx playwright install --with-deps
```

---

# Configure Environment

Create the required environment variables or update the configuration file with:

* Application URL
* Username
* Password
* Other environment-specific settings

Example:

```env
BASE_URL=https://example.company.com

USERNAME=test.user

PASSWORD=password
```

---

# Running Tests

## Run all tests

```bash
npx playwright test
```

---

## Run a single test file

```bash
npx playwright test tests/dispatch.spec.ts
```

---

## Run in headed mode

Useful for debugging.

```bash
npx playwright test --headed
```

---

## Run a specific test

```bash
npx playwright test -g "Create Dispatch"
```

---

## Run with one worker

```bash
npx playwright test --workers=1
```

---

## Run tests in parallel

```bash
npx playwright test --workers=4
```

Adjust the number of workers depending on your machine.

---

# Debugging Tests

Use Playwright Inspector.

```bash
npx playwright test --debug
```

Or

```bash
PWDEBUG=1 npx playwright test
```

---

# Viewing Test Reports

After every execution Playwright generates an HTML report.

Generate the report (if required):

```bash
npx playwright show-report
```

or

```bash
npx playwright test
npx playwright show-report
```

The report contains:

* Test summary
* Passed tests
* Failed tests
* Screenshots
* Trace files
* Execution time
* Error details

Example report:

```
playwright-report/
    index.html
```

Open it using:

```bash
npx playwright show-report
```

---

# Traces

If tracing is enabled, failed tests include Playwright trace files.

Open a trace using:

```bash
npx playwright show-trace trace.zip
```

This allows you to inspect:

* Network requests
* Console logs
* DOM snapshots
* Clicks
* Screenshots
* Timeline of the test

---

# Microsoft Teams Notifications

After the test suite completes, a notification is automatically sent to the configured Microsoft Teams channel.

The notification typically includes:

* Pipeline status (Success/Failed)
* Total tests executed
* Passed tests
* Failed tests
* Execution duration
* Link to the pipeline or report (if configured)

Example:

```
Dispatch Automation Results

Environment: UAT

Passed: 24

Failed: 1

Duration: 11m 42s

Status: FAILED
```

If no notification is received:

* Verify the Teams Incoming Webhook URL is configured correctly.
* Ensure the notification step in the CI/CD pipeline completed successfully.
* Check the pipeline logs for any errors during the notification stage.

---

# CI/CD Execution

The automation suite is designed to run automatically through the CI/CD pipeline.

Typical pipeline steps:

1. Checkout repository
2. Install Node dependencies
3. Install Playwright browsers
4. Execute tests
5. Generate HTML report
6. Archive artifacts
7. Send Microsoft Teams notification

---

# Updating Dependencies

Update project packages:

```bash
npm update
```

Update Playwright:

```bash
npm install @playwright/test@latest
```

Install the latest browser binaries:

```bash
npx playwright install
```

---

# Useful Commands

| Command                               | Description                  |
| ------------------------------------- | ---------------------------- |
| `npm install`                         | Install project dependencies |
| `npx playwright install`              | Install Playwright browsers  |
| `npx playwright test`                 | Run all tests                |
| `npx playwright test --headed`        | Run with browser visible     |
| `npx playwright test --debug`         | Debug tests                  |
| `npx playwright show-report`          | Open HTML report             |
| `npx playwright show-trace trace.zip` | Open Playwright trace        |

---

# Troubleshooting

## Browser not installed

Run:

```bash
npx playwright install
```

---

## Missing Node modules

Run:

```bash
npm install
```

---

## Report not generated

Re-run the test suite and then execute:

```bash
npx playwright show-report
```

---

## Teams notification not sent

Verify:

* Incoming Webhook URL is valid.
* CI/CD pipeline completed successfully.
* The notification script executed without errors.
* The Teams channel allows incoming webhook messages.

---

# Contributing

When adding new tests:

* Follow the Page Object Model (POM) pattern.
* Use reliable Playwright locators (`getByRole`, `getByLabel`, `getByTestId`) where possible.
* Avoid hard-coded waits; use Playwright's built-in waiting mechanisms.
* Ensure new tests pass locally before creating a pull request.
* Keep test data isolated to prevent interference during parallel execution.

---

# Maintainers

Dispatch QA Automation Team
