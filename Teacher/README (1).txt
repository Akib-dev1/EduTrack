SCHOLIVANCE - COACHING CENTER MANAGEMENT SYSTEM
TEACHER MODULE - README.txt
Assigned owner: Group Member 2
Project name is a working title and can be changed.
Planning dates: 26 October to 9 November 2026.
Assumption: 'around 9 November' means 9 November 2026; confirm the exact
submission time with your instructor. Aim to finish on 8 November.

1. YOUR RESPONSIBILITY
======================
Let teachers view assigned batches and students, take attendance, and enter exam marks. Academic changes must be limited to the logged-in teacher's own batches.

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
PAGE 1: TEACHER DASHBOARD (teacher/dashboard.html)
Purpose: Summarize the teacher's assignments.
Layout:
- Sidebar linking to four teacher pages; name and logout in the header.
- Cards for assigned active batches and distinct enrolled students.
- Assigned-batch table: course, batch, weekly schedule, student count.
- Quick links to attendance and marks.
Phase 1:
- Render cards and rows from the selected demo teacher's data.
- Make quick links open the correct page; optionally preselect a batch.
Phase 2:
- Load batches where teacher_id equals the authenticated session user.
- Calculate counts from that teacher's enrollments only.
Acceptance: Another teacher's batches are never included.

PAGE 2: MY STUDENTS (teacher/students.html)
Purpose: View students in assigned batches.
Layout:
- Assigned-batch dropdown and student-name search field.
- Table: student ID, name, phone, enrollment start/end month.
- Clear 'No students found' message.
Phase 1:
- Filter the shared demo enrollment/student data by selected batch.
- Combine search with the batch filter.
Phase 2:
- Join users and enrollments for a batch owned by the teacher.
- Show basic student information only, not passwords or fee-edit controls.
Acceptance: Switching batches changes the correct rows; searching with no
match shows an empty state instead of a broken table.

PAGE 3: ATTENDANCE MANAGEMENT (teacher/attendance.html)
Purpose: Record attendance for a batch on a selected class date.
Layout:
- Batch dropdown, date picker, and Load Students button.
- Rows: student ID, name, Present/Absent radio buttons.
- Save Attendance button, saved status, and present/absent totals.
- Existing records load for the chosen batch/date so they can be corrected.
Phase 1:
- Use fictional records in an array; start unsaved rows unmarked.
- Require every student to be marked before saving.
- Demonstrate save, reload within the demo session, and correction.
Phase 2:
- Only include students enrolled during the chosen date's month.
- Reject future dates for attendance in this scope.
- Store one attendance row per enrollment/date; use a transaction for a
  whole class save so half the class is not saved if an error occurs.
- Verify batch ownership again before every save.
Acceptance: Saving the same date again updates records, not duplicates.
Unrecorded attendance is not silently treated as absence.

PAGE 4: EXAM & MARKS MANAGEMENT (teacher/marks.html)
Purpose: Create simple exams and record results on one page.
Layout:
- Batch selector, exam selector, and an inline Create Exam form.
- Exam fields: title, date, total marks.
- Marks table: student ID, student name, obtained marks input.
- Save Marks button; show percentages for saved marks.
Phase 1:
- Create a fictional exam and enter/edit its marks.
- Require total marks greater than zero.
- Validate obtained marks between zero and total marks.
- An empty input means 'Not entered'; zero is a valid mark.
Phase 2:
- Store exams for owned batches and marks for eligible students.
- Use one marks row per exam/student; save or update without duplicates.
- Keep total marks fixed once marks have been entered in this version.
- Students see saved results immediately; no result-approval workflow.
Acceptance: Marks above the maximum are rejected; zero displays as zero;
a blank score is never converted into a failing grade.

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
   Sketch the four teacher pages; agree attendance and marks data with the student member.

2. 27 October 2026
   Use the shared layout; build teacher sidebar, headers, cards, and table styles.

3. 28-29 October 2026
   Build dashboard and student list HTML with realistic fictional rows.

4. 30-31 October 2026
   Build attendance controls and exam/marks forms with labels and error areas.

5. 1-2 November 2026
   Implement assigned-batch filtering, student search, and dashboard rendering.

6. 3-4 November 2026
   Implement attendance selection/save simulation and marks validation/edit simulation.

7. 5 November 2026
   Connect shared demo data; ensure saved demo academic records can be read by the student module.

8. 6-7 November 2026
   Check unmarked attendance, zero marks, empty scores, invalid values, and narrow screens.

9. 8 November 2026
   Freeze the interface; rehearse teacher-to-student demo and fix integration issues.

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
Read users, batches, courses, and enrollments created by the admin. Own attendance, exams, and marks. Agree record formats with the student member before writing JavaScript.

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

1. Use the shared database connection and teacher-only session guard.
2. Load the teacher's assigned batches using the session user ID.
3. Build the student-list query through enrollments.
4. Implement attendance loading and transactional save/update.
5. Implement exam creation and marks save/update with server validation.
6. Add ownership checks on every read/write; never trust batch IDs sent
   by the browser just because the dropdown originally contained them.
7. Replace dashboard values with live queries.
8. Test that the student's view reflects saved attendance and results.

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
- Selecting one batch shows only its students.
- Search behaves correctly with and without matches.
- Saving incomplete attendance shows a useful error.
- Reopening a saved date shows previous selections.
- Saving corrections creates no duplicate attendance rows.
- A score of zero is valid; negative or excessive marks are rejected.
- Blank marks display as 'Not entered' in the student view.
- Teacher A cannot read or change Teacher B's batches after Phase 2.

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

