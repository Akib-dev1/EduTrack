SCHOLIVANCE - COACHING CENTER MANAGEMENT SYSTEM
ADMIN MODULE - README.txt
Assigned owner: Group Member 1
Project name is a working title and can be changed.
Planning dates: 26 October to 9 November 2026.
Assumption: 'around 9 November' means 9 November 2026; confirm the exact
submission time with your instructor. Aim to finish on 8 November.

1. YOUR RESPONSIBILITY
======================
Manage accounts, courses, batches, and student enrollment. Own the shared login page and coordinate the shared database connection and session helpers in Phase 2.

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
PAGE 1: ADMIN DASHBOARD (admin/dashboard.html)
Purpose: Give the admin a quick overview.
Layout:
- Sidebar with links to all four admin pages; header with name and logout.
- Summary cards: total active students, total active teachers, active batches.
- A small table showing batch name, course, teacher, schedule, student count.
Phase 1:
- Render cards and batch rows from fictional JavaScript data.
- Add working navigation and an empty state when no batches are available.
Phase 2:
- Replace demo values with SQL counts and joined batch/enrollment records.
- Count unique students in student totals; do not count enrollments as people.
Acceptance: The cards and table agree with the sample records.

PAGE 2: USER MANAGEMENT (admin/users.html)
Purpose: Create and maintain student, teacher, and accountant accounts.
Layout:
- Search field, role filter, user table, and Add User button.
- Inline form or modal: full name, username, phone, role, initial password.
- Table: name, username, role, phone, status, Edit, Activate/Deactivate,
  Reset Password.
Phase 1:
- Search/filter demo records; add and edit records in the demo array.
- Show required-field errors and a confirmation before deactivation/reset.
- Show a demonstration-only password-reset message; do not store passwords.
Phase 2:
- Enforce unique usernames in SQL; hash passwords in PHP.
- Create the first admin through setup/seed data, not public registration.
- Keep a user's role fixed after account creation to avoid broken records.
- Deactivate accounts rather than deleting users with historical records.
Acceptance: Blank fields and duplicate usernames are rejected; editing a
record updates the right row; cancelling a confirmation makes no change.

PAGE 3: COURSE & BATCH MANAGEMENT (admin/courses-batches.html)
Purpose: Maintain courses and their teaching batches on one page.
Layout:
- Two sections or tabs: Courses and Batches.
- Course form: course name, short description, active status.
- Batch form: batch name, course, assigned teacher, weekly schedule text,
  monthly fee, active status.
- Tables with Edit and Activate/Deactivate actions.
Phase 1:
- Populate course/teacher dropdowns from shared demo data.
- Validate required fields and a positive monthly fee.
- Add/edit demo courses and batches; display changes immediately.
Phase 2:
- Save courses and batches with SQL foreign keys.
- Only assign active teachers; each batch has exactly one teacher.
- Preserve historical data when a course or batch is made inactive.
Acceptance: A batch cannot be saved without a course, teacher, schedule,
and valid fee. Use a simple schedule such as 'Sun, Tue, Thu: 5-6 PM';
no timetable generator or automatic clash detection is required.

PAGE 4: STUDENT ENROLLMENT (admin/enrollments.html)
Purpose: Connect students to batches.
Layout:
- Batch filter and enrollment table.
- Form: student, batch, start month, optional end month.
- Show the monthly fee copied from the selected batch.
- Actions: edit enrollment dates or end enrollment.
Phase 1:
- Use dropdowns and month inputs; show confirmation after saving.
- Reject duplicate student/batch enrollments and invalid date ranges.
Phase 2:
- Store enrollment rows and the agreed monthly fee for that enrollment.
- Prevent duplicate student/batch pairs for this beginner version.
- Do not change the student, batch, or agreed fee after academic/payment
  records exist. Keep existing fees unchanged when batch pricing changes.
- End month is inclusive; blank means continuing.
Acceptance: One student can join different batches, but cannot join the
same batch twice. Ending enrollment preserves past records.

EXTRA SHARED PAGE: LOGIN (login.html; owned by Member 1)
- Fields: username and password; Login button; clear error message area.
- Phase 1: show clearly labelled demo role buttons for navigating to each
  dashboard. Do not pretend the static prototype provides authentication.
- Phase 2: remove demo shortcuts; check password_hash/password_verify,
  active status, and role in PHP; redirect to the appropriate dashboard.
- Provide logout.php later; logout is an action, not an eighteenth page.
- No public registration, email reset, or separate password-reset page.

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
   Sketch the four admin pages plus shared login; agree navigation and account fields.

2. 27 October 2026
   Build shared colours, spacing, buttons, form styles, table styles, and login layout.

3. 28-29 October 2026
   Build dashboard and user management HTML; add table, filters, and user form.

4. 30-31 October 2026
   Build course/batch sections and enrollment HTML; check labels and layout.

5. 1-2 November 2026
   Implement demo user search, role filter, add/edit, and confirmation actions.

6. 3-4 November 2026
   Implement demo course/batch/enrollment actions and validation; connect login demo navigation.

7. 5 November 2026
   Share the completed common CSS and login with the team; merge all role folders.

8. 6-7 November 2026
   Check duplicate enrollment handling, empty tables, keyboard access, and mobile layout.

9. 8 November 2026
   Freeze styling; help run the full four-role demo and fix broken relative links.

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
Provide users, courses, batches, and enrollments to the other three members. Coordinate shared login/authentication. Do not change shared column names without telling the team.

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

1. Agree the SQL schema with all members; create tables in dependency order.
2. Create config/db.php using PHP PDO and a shared connection.
3. Build includes/auth.php, session login, logout, and role checking.
4. Seed one admin using a hashed password; implement account CRUD/status/reset.
5. Implement course and batch save/edit actions with prepared statements.
6. Implement enrollment save/end actions and duplicate/date checks.
7. Replace dashboard demo counts with live queries.
8. Review all modules together so direct page URLs and POST requests enforce
   permissions. Remove demo role shortcuts and demo-only account data.

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
- Admin can create one teacher, student, and accountant.
- Invalid forms show errors without losing typed values.
- Search and role filters work together.
- Course and batch edits affect the correct row.
- A duplicate enrollment is blocked.
- Deactivated accounts cannot log in after Phase 2.
- A teacher/student/accountant cannot open admin URLs after Phase 2.
- Historical attendance, marks, and payments survive deactivation.

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

