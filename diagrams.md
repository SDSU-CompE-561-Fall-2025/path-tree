# Entity Relationship Diagram (ERD)
```mermaid
erDiagram
  ACCOUNT ||--o| STUDENT_PROFILE : "owns (student only)"
  ACCOUNT ||--o{ NOTIFICATION : "receives"
  STUDENT_PROFILE ||--o{ DEGREE_PLAN : "has"
  STUDENT_PROFILE ||--o{ COMPLETION : "past courses"
  STUDENT_PROFILE ||--o{ STUDENT_INTEREST : "tags"
  INTEREST_TAG ||--o{ STUDENT_INTEREST : "is used by"

  DEGREE_PLAN ||--|{ TERM : "organizes"
  TERM ||--o{ PLANNED_COURSE : "includes"
  COURSE ||--o{ PLANNED_COURSE : "is planned as"
  DEGREE_PLAN ||--o{ AUDIT_RESULT : "produces"
  DEGREE_PLAN ||--o{ SHARE_LINK : "can share via"

  PROGRAM ||--o{ STREAM : "offers"
  PROGRAM ||--|{ PROGRAM_REQUIREMENT : "defines"
  STREAM ||--o{ PROGRAM_REQUIREMENT : "adds"

  COURSE ||--o{ COURSE_PREREQ : "target_of"
  COURSE ||--o{ COURSE_PREREQ : "prereq_of"
  COURSE ||--o{ COURSE_EQUIV : "equivalent_to"
  COURSE ||--o{ COURSE_OFFERING : "offered_as"
  COURSE ||--o{ COMPLETION : "completed_as"

  ACCOUNT {
    uuid id PK
    string email
    string password_hash
    string role        // student | advisor | admin
    boolean email_verified
    datetime created_at
  }

  STUDENT_PROFILE {
    uuid id PK
    uuid account_id FK
    string name
    string major_program_id FK
    string catalog_year
  }

  PROGRAM {
    string id PK       // e.g., BS-COMPE
    string name
    string level       // BS/MS
    string catalog_year
  }

  STREAM {
    string id PK
    string program_id FK
    string name
    string description
  }

  PROGRAM_REQUIREMENT {
    string id PK
    string program_id FK
    string stream_id FK   // nullable
    string kind           // core | elective | capstone
    int min_units
    json rule             // eligible courses, groups, logic
  }

  COURSE {
    string id PK          // e.g., COMPE-510
    string title
    int units
    string department
  }

  COURSE_PREREQ {
    string id PK
    string target_course_id FK
    string prereq_course_id FK
    string type           // prereq | coreq
    string group_tag      // AND/OR grouping
    float min_grade
  }

  COURSE_EQUIV {
    string id PK
    string course_a_id FK
    string course_b_id FK
    string note
  }

  COURSE_OFFERING {
    string id PK
    string course_id FK
    string term_code      // e.g., 2026-Fall
    json meeting_times    // day/time/location
  }

  DEGREE_PLAN {
    uuid id PK
    uuid student_profile_id FK
    string program_id FK
    string catalog_year
    json settings         // credit caps, preferences
  }

  TERM {
    uuid id PK
    uuid plan_id FK
    string term_code      // semester-based only
    int max_units
  }

  PLANNED_COURSE {
    uuid id PK
    uuid term_id FK
    string course_id FK
    string status         // planned | waitlist | registered
    string source         // manual | recommended
  }

  COMPLETION {
    uuid id PK
    uuid student_profile_id FK
    string course_id FK
    string term_code
    string grade
    int units_earned
    string source         // import | manual
  }

  AUDIT_RESULT {
    uuid id PK
    uuid plan_id FK
    datetime run_at
    json summary          // satisfied/remaining
    json issues           // prereqs, overloads, gaps
  }

  SHARE_LINK {
    uuid id PK
    uuid plan_id FK
    string token
    datetime expires_at
    string permission     // view | comment
  }

  NOTIFICATION {
    uuid id PK
    uuid account_id FK
    string kind           // deadline | overload | reminder
    json payload
    datetime deliver_at
    string status         // queued | sent | read
  }

  INTEREST_TAG {
    string id PK
    string name
  }

  STUDENT_INTEREST {
    uuid id PK
    uuid student_profile_id FK
    string tag_id FK
  }
  ```
##Authentication flow
```mermaid
sequenceDiagram
  actor U as User
  participant UI as Web App
  participant GW as API Gateway
  participant AUTH as Auth Service
  participant DB as Auth DB
  participant MAIL as Email Service

  %% Sign Up
  U->>UI: Fill name, email, password
  UI->>GW: POST /auth/register
  GW->>AUTH: /register
  AUTH->>DB: Create account (email_verified=false)
  AUTH->>MAIL: Send verification link
  MAIL-->>U: Verification email
  U->>UI: Click verify link
  UI->>GW: GET /auth/verify?token=...
  GW->>AUTH: /verify
  AUTH->>DB: Set email_verified=true
  AUTH-->>UI: Verified

  %% Login
  U->>UI: Enter email/password
  UI->>GW: POST /auth/login
  GW->>AUTH: /login
  AUTH->>DB: Validate credentials
  AUTH-->>GW: access_token + refresh_token
  GW-->>UI: tokens

  %% Authorized call
  UI->>GW: GET /plans (Bearer access)
  GW->>AUTH: Validate JWT
  AUTH-->>GW: OK
  GW-->>UI: 200 data

  %% Refresh & Logout
  UI->>GW: POST /auth/refresh
  GW->>AUTH: /refresh
  AUTH-->>GW: new access_token
  GW-->>UI: new access_token
  U->>UI: Logout
  UI->>GW: POST /auth/logout
  GW->>AUTH: Revoke refresh token
  AUTH-->>GW: 204
```
##System Arhitecture
