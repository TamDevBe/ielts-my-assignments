-- PostgreSQL reference only; the application runs entirely on server-side mock arrays.
CREATE TABLE students (
  id VARCHAR(10) PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE lessons (
  id VARCHAR(20) PRIMARY KEY,
  unit VARCHAR(10) NOT NULL,
  skill VARCHAR(20) NOT NULL CHECK (skill IN ('Reading', 'Listening', 'Writing', 'Speaking')),
  title VARCHAR(200) NOT NULL
);
CREATE TABLE assignments (
  id VARCHAR(10) PRIMARY KEY,
  student_id VARCHAR(10) NOT NULL REFERENCES students(id),
  lesson_id VARCHAR(20) NOT NULL REFERENCES lessons(id),
  title VARCHAR(200) NOT NULL,
  due_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_assignments_student ON assignments(student_id);
CREATE TABLE submissions (
  id VARCHAR(20) PRIMARY KEY,
  assignment_id VARCHAR(10) NOT NULL UNIQUE REFERENCES assignments(id),
  submitted_at TIMESTAMPTZ NOT NULL
);
