-- Run after schema.sql on an empty database. All identities are fictional.
INSERT INTO students (id, full_name, email, created_at) VALUES
('S01', 'Học viên S01', 's01@example.test', '2026-11-01T09:00:00+07:00'),
('S02', 'Học viên S02', 's02@example.test', '2026-11-01T09:00:00+07:00');
INSERT INTO lessons (id, unit, skill, title) VALUES
('FND-U1-READING', 'U1', 'Reading', 'Foundation U1 – Reading'),
('FND-U2-LISTENING', 'U2', 'Listening', 'Foundation U2 – Listening'),
('FND-U3-WRITING', 'U3', 'Writing', 'Foundation U3 – Writing'),
('FND-U4-SPEAKING', 'U4', 'Speaking', 'Foundation U4 – Speaking');
INSERT INTO assignments (id, student_id, lesson_id, title, due_at) VALUES
('A01', 'S01', 'FND-U1-READING', 'Foundation U1 – Reading', '2026-11-13T23:59:00+07:00'),
('A02', 'S01', 'FND-U2-LISTENING', 'Foundation U2 – Listening', '2026-11-09T23:59:00+07:00'),
('A03', 'S01', 'FND-U3-WRITING', 'Foundation U3 – Writing', '2026-11-10T23:59:00+07:00'),
('A04', 'S01', 'FND-U4-SPEAKING', 'Foundation U4 – Speaking', '2026-11-08T23:59:00+07:00'),
('B01', 'S02', 'FND-U1-READING', 'Foundation U1 – Reading', '2026-11-13T23:59:00+07:00');
INSERT INTO submissions (id, assignment_id, submitted_at) VALUES
('SUB-A03', 'A03', '2026-11-10T20:00:00+07:00'),
('SUB-A04', 'A04', '2026-11-10T12:00:00+07:00');
