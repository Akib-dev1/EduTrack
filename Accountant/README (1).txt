SCHOLIVANCE - COACHING CENTER MANAGEMENT SYSTEM
ACCOUNTANT MODULE - README.txt
Assigned owner: Group Member 4
Project name is a working title and can be changed.
Planning dates: 26 October to 9 November 2026.
Assumption: 'around 9 November' means 9 November 2026; confirm the exact
submission time with your instructor. Aim to finish on 8 November.

1. YOUR RESPONSIBILITY
======================
Record fees received at the coaching center, view payment history, and identify unpaid balances. Keep this as manual fee recording with no online payment gateway.

Strict technology stack:
- HTML: page structure.
- CSS: layout, colours, forms, tables, and responsive design.
- Vanilla JavaScript: frontend interaction and demonstration data.
- PHP: server logic and authentication in the later phase.
- SQL: persistent relational database in the later phase.
Agree one SQL database engine as a team; MySQL is a reasonable choice if
allowed by your course. Do not add frameworks, Node.js, React, or Firebase.

Your module has FOUR user-facing pages.
Whole project: Admin 4 + Teacher 4 + Student 4 + Accountant 4 + Login 1 = 17.
Forms, modals, confirmation messages, and tabs remain on these pages.
PHP action scripts and shared include files are not extra visible pages.

2. TWO-PHASE DELIVERY
====================
PHASE 1 - SUBMIT BY 9 NOVEMBER: HTML, CSS, JAVASCRIPT
Deliver the complete visual interface for your four pages with working
navigation, meaningful sample data, filters, validation, and demo actions.
Member 1 also delivers the shared login interface.
All important buttons must work in the prototype or clearly explain that
a server feature will be connected in Phase 2.
Label the prototype 'Demo - fictional data'. Frontend validation and role
navigation are demonstrations, not real security or permanent storage.

PHASE 2 - DATE TO BE ANNOUNCED: PHP AND SQL
Connect the finished interface to database records; add real login,
authorization, server validation, and persistent create/read/update actions.
Do not delay the frontend deadline while building the backend.

3. YOUR PAGES AND FUNCTIONALITY
==============================
PAGE 1: ACCOUNTANT DASHBOARD (accountant/dashboard.html)
Purpose: Summarize the current billing month.
Layout:
- Sidebar linking to four accountant pages; name and logout in the header.
- Cards: expected fees, payments allocated to this billing month,
  outstanding fees.
- Small table of recent payments with student, batch, billing month,
  payment date, and amount.
Phase 1:
- Calculate cards from fictional enrollments and payments.
- Clearly distinguish billing month from the date money was received.
Phase 2:
- Query eligible enrollments and payments allocated to the current month.
- Sum payments separately before joining so fees are not duplicated when
  an enrollment has several payment rows.
Acceptance: For fees of 1000 and a partial payment of 400, paid is 400 and
outstanding is 600.

PAGE 2: FEE COLLECTION (accountant/collection.html)
Purpose: Record a student's payment for one batch and billing month.
Layout:
- Student search/select, enrollment/batch dropdown, billing-month picker.
- Read-only expected fee, already paid, and remaining balance.
- Inputs: amount received and payment date; Save Payment button.
- Clear success/error message and refreshed remaining balance.
Phase 1:
- Filter enrollment options for the selected student.
- Recalculate the displayed balance when enrollment or month changes.
- Simulate a payment save in demo data.
- Reject blank/nonpositive amounts and amounts greater than the balance.
Phase 2:
- Save a payment referencing an enrollment and billing month.
- Recalculate the balance on the server; do not trust the browser value.
- Use a transaction and lock the enrollment while checking/saving to
  prevent concurrent submissions from overpaying.
- Redirect after a successful POST to avoid resubmission on refresh.
Acceptance: A partial payment is allowed; the remainder updates correctly;
paying again after full payment is blocked.

PAGE 3: PAYMENT HISTORY (accountant/history.html)
Purpose: Find and correct recorded payments.
Layout:
- Student and billing-month filters.
- Table: payment ID, student, batch, billing month, payment date, amount.
- Edit action opens an inline form or modal.
Phase 1:
- Filter demo payments and edit amount/date with validation.
- Display a clear confirmation after changes.
Phase 2:
- Update the selected payment after server validation.
- Keep its enrollment and billing month fixed in this beginner version.
- When calculating the maximum edited amount, exclude the current
  payment from the already-paid total.
- Preserve records; no deletion/refund workflow in this scope.
Acceptance: Changing a payment from 400 to 500 against a fee of 1000
leaves 500 due, and the dashboard/student summaries update.

PAGE 4: DUE FEES (accountant/dues.html)
Purpose: List unpaid and partially paid fees for a selected billing month.
Layout:
- Billing-month picker and optional student-name search.
- Table: student, phone, batch, expected fee, paid, remaining, status.
- Status labels: Unpaid or Partial. Hide fully paid enrollments.
Phase 1:
- Calculate rows from enrollment fees and payments.
- Display 'No outstanding fees for this month' when appropriate.
Phase 2:
- Include enrollments covering the selected billing month.
- Aggregate that month's payments per enrollment and calculate the balance.
Acceptance: A student with two batches can have two distinct due rows.
The unpaid list changes correctly after payments are recorded.

4. FRONTEND FILE ORGANIZATION
=============================
Suggested project structure:
  scholivance/
    login.html
    admin/          dashboard.html, users.html,
                    courses-batches.html, enrollments.html
    teacher/        dashboard.html, students.html, attendance.html, marks.html
    student/        dashboard.html, courses.html, attendance.html, results.html
    accountant/     dashboard.html, collection.html, history.html, dues.html
    assets/css/     common.css, admin.css, teacher.css, student.css,
                    accountant.css
    assets/js/      demo-data.js, common.js, admin.js, teacher.js,
                    student.js, accountant.js

You own your role folder and role-specific CSS/JavaScript.
Member 1 coordinates common.css and login.html. Agree shared-file edits
before making them; avoid overwriting another member's work.
Use relative links, such as ../assets/css/common.css.
Put your role's four sidebar links on every role page and highlight the
current page. Keep the same header/sidebar layout throughout the project.
Use semantic HTML, explicit form labels, visible keyboard focus, readable
contrast, and text labels beside status colours.
On narrow screens, stack cards and wrap tables in horizontally scrollable
containers. Do not squeeze table text until it becomes unreadable.
Use text and simple CSS for the design; elaborate imagery is unnecessary.

5. STEP-BY-STEP PLAN BEFORE THE FIRST SUBMISSION
===============================================
1. 26 October 2026
   Sketch four accountant pages; agree billing-month rules and fee fields with admin/student members.

2. 27 October 2026
   Use shared layout; build finance cards, tables, amount inputs, and status badges.

3. 28-29 October 2026
   Build dashboard and collection HTML with clearly labelled balance fields.

4. 30-31 October 2026
   Build payment-history and due-fees HTML with filters and edit form.

5. 1-2 November 2026
   Implement fee/balance calculations and demo payment collection validation.

6. 3-4 November 2026
   Implement history filtering/editing and due-list calculation; test partial payments.

7. 5 November 2026
   Connect shared sample data and check that student fee totals match accountant totals.

8. 6-7 November 2026
   Check fully paid accounts, multiple payments, invalid amounts, edits, and narrow tables.

9. 8 November 2026
   Freeze the interface; rehearse payment-to-student-summary demo and fix integration issues.

10. 9 November 2026 - Submission day
    Open the final project from a clean copy and run your checklist.
    Submit the complete combined frontend folder in the format requested
    by the instructor. Keep a backup before submission.
    Be ready to explain which interactions use fictional JavaScript data
    and which will later use PHP and SQL.

For each individual page, work in this order:
A. Write the page title, fields, table columns, and actions on paper.
B. Build semantic HTML with sample content before styling.
C. Apply shared CSS; then add small role-specific styles.
D. Add JavaScript rendering, filters, form checks, and event handlers.
E. Implement success, error, empty, and cancel states.
F. Test keyboard use, narrow screens, and navigation.
G. Compare against the page's acceptance criteria above.
Finish a usable version of every page before polishing minor decoration.

6. SHARED DEMO DATA AND TEAM INTEGRATION
=======================================
Use ONE agreed demo-data.js format with matching numeric IDs.
Suggested fictional seed set:
- 1 admin, 2 teachers, 3 students, 1 accountant.
- 2 courses and 2 batches, with one teacher per batch.
- 4 enrollments; one student belongs to both batches.
- Attendance for at least two class dates.
- One exam per batch, including a zero score and a missing score.
- Payments covering unpaid, partially paid, and fully paid cases.
Never use real personal information or store real passwords in demo data.

Simple persistence option:
- Keep seed data in demo-data.js.
- Store only fictional, editable demo records under one versioned
  localStorage key, such as scholivance_demo_v1.
- Agree shared loadDemoData(), saveDemoData(), resetDemoData() functions.
- On first load, copy the seed records; subsequent pages read saved records.
- Reset restores a known state for the presentation.
- Run all pages from the same local server/origin; localStorage behaviour
  under file:// is not a reliable integration plan.
- If using XAMPP for preview, Phase 1 can still consist only of HTML/CSS/JS.
- Remove demo storage as the source of truth once PHP/SQL is connected.

Do not save separate incompatible copies of attendance, fees, or results
inside individual role files. Store dates as YYYY-MM-DD and billing months
as YYYY-MM; format them for display separately.
The common demo login can select a fictional role/user. It provides no
access protection and must not be described as secure authentication.

Your integration agreement:
Read admin users, batches, and enrollments; own payments. Agree the exact fee formula with the student member. Do not change enrollment fees or student academic records.

7. AGREED DATABASE CONTRACT FOR THE LATER PHASE
==============================================
This is a proposed shared schema; finalize it together before SQL coding.
'id' is the primary key of each table. Fields ending in _id reference the
matching table. Use foreign keys and preserve referenced historical rows.

users:
  id, full_name, username (unique), password_hash, phone, role, is_active
  Roles: admin, teacher, student, accountant.

courses:
  id, name, description, is_active

batches:
  id, course_id, teacher_id, name, schedule_text, monthly_fee, is_active
  Exactly one assigned teacher per batch; simple weekly schedule text.

enrollments:
  id, student_id, batch_id, start_month, end_month (nullable),
  agreed_monthly_fee
  Unique student_id + batch_id for this beginner version.
  Store start/end as first-of-month DATE values in SQL.
  Copy the batch fee at enrollment; later batch price edits do not change
  an existing enrollment's agreed fee.

attendance:
  id, enrollment_id, class_date, status
  Status: present or absent. Unique enrollment_id + class_date.

exams:
  id, batch_id, title, exam_date, total_marks

marks:
  id, exam_id, student_id, obtained_marks
  Unique exam_id + student_id. No saved row means 'Not entered'.
  The server verifies that the student belongs to the exam's batch.

payments:
  id, enrollment_id, billing_month, amount, payment_date
  Multiple partial payments per enrollment/month are allowed.
  Store billing_month as a first-of-month DATE in SQL.
  Money fields use DECIMAL with two decimal places, not floating-point SQL.

Common rules:
- Enrollment start and end months are inclusive; null end means ongoing.
- No prorated fees, scholarships, discounts, late fees, refunds, or fee
  changes within an existing enrollment in this version.
- For one eligible enrollment/month:
  expected = agreed_monthly_fee
  paid = sum of payments assigned to that billing month
  due = expected - paid
- Reject overpayments rather than silently allowing a negative balance.
- Use integer minor units for JavaScript money calculations to avoid
  floating-point rounding errors.
- A payment's received date and billing month can differ.
- Attendance percentage counts recorded present/absent rows only.
- Exam percentage = obtained_marks / total_marks x 100.
- Account/batch deactivation must not erase historical records or dues.
- Ending an enrollment controls which future months are charged.
- Existing enrollments cannot be deleted to remove outstanding balances.
- No additional messaging, online exams, payroll, SMS, video lessons,
  payment gateways, public signup, or complex scheduling.

8. STEP-BY-STEP PHP AND SQL PLAN - AFTER FRONTEND SUBMISSION
==========================================================
Keep the submitted frontend snapshot before converting pages to .php.
Preserve the layout and page count. Move repeated HTML to shared includes
when useful; replace demo values with escaped server-generated values.

1. Use the shared connection and accountant-only session guard.
2. Load student enrollment choices from admin-created records.
3. Implement one agreed balance calculation for billing month/enrollment.
4. Build transactional payment creation with server validation.
5. Build payment-history queries and amount/date corrections.
6. Build due-fee and dashboard aggregate queries without double-counting.
7. Share the fee-summary query logic with the student member.
8. Test partial payments, multiple payments, completed payments, and
   unauthorized write attempts from teacher/student accounts.

Every member must follow these backend basics:
- Start/check the session on every protected page and action endpoint.
- Validate both role and record ownership on the server.
- Use PDO prepared statements; never concatenate user input into SQL.
- Validate required fields, IDs, dates, ranges, and uniqueness in PHP.
- Escape displayed user content with htmlspecialchars.
- Use POST for state changes and check a CSRF token.
- Use password_hash/password_verify; never plaintext passwords.
- Do not expose database errors or database credentials to the browser.
- Reject inactive accounts during login and check status on protected
  requests so deactivation also affects an existing session.
- Redirect after successful form submissions.
These checks belong to Phase 2; JavaScript cannot replace them.

9. YOUR TESTING CHECKLIST
========================
- Fee 1000, payment 400 => balance 600 and status Partial.
- A later payment of 600 => balance 0; enrollment disappears from dues.
- Payment of 0, a negative value, or more than balance is rejected.
- Editing 400 to 500 => balance changes by 100, not 500.
- Two batches for one student have independent monthly balances.
- A payment received in November for October affects October billing totals.
- No enrollment outside its start/end months is charged.
- Student and accountant agree on current-month expected/paid/due totals.

Frontend checks before 9 November:
[ ] All four role pages open with no missing assets.
[ ] Sidebar links and shared login demo navigation work.
[ ] Every form has labels and helpful inline error messages.
[ ] Search/filter controls actually change displayed data.
[ ] Demonstration save/edit actions visibly update the expected records.
[ ] Empty data and cancelled actions are handled.
[ ] No JavaScript console errors occur during the demo.
[ ] Layout remains usable on a laptop and a narrow mobile viewport.
[ ] No real passwords or personal data appear in the prototype.
[ ] The complete frontend works from the team's combined project folder.

Later integration checks:
[ ] Reloading preserves database changes.
[ ] Direct URL and forged form requests are permission-checked.
[ ] Invalid inputs are rejected by PHP even with JavaScript disabled.
[ ] Records shown in other roles match the values this module uses.
[ ] Duplicate saves do not create invalid duplicate records.

10. SUBMISSION AND PRESENTATION HANDOFF
=======================================
Before 9 November, give the team:
- Your four completed HTML pages.
- Your role CSS and JavaScript files.
- Any agreed changes to shared demo data.
- This README and a short note of any remaining limitations.

Demonstrate the complete team story:
1. Admin creates/opens a student and assigns a batch.
2. Teacher records attendance and an exam score.
3. Accountant records a partial fee payment.
4. Student sees the matching schedule, attendance, result, and fee summary.

For Phase 1, perform this story using fictional shared demo records.
For Phase 2, repeat it using real PHP requests and persisted SQL records.
Do not claim a backend feature is complete until it has been implemented
and tested. The first submission is the finished frontend prototype.

