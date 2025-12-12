# Course Planner - Video Presentation Script
## 10-Minute Demo Video

---

## [00:00 - 00:45] INTRODUCTION (45 seconds)

**[Speaker: Team Lead or rotating speakers]**

*[Show landing page with Course Planner logo]*

"Hello! Welcome to Course Planner - a comprehensive academic planning tool built for SDSU students by SDSU students. Our team of four Computer Engineering students - Mario, Michael, Edwin, and Parsh - developed this full-stack web application to solve a real problem we all face: planning our academic path through graduation.

Course Planner helps students visualize their degree requirements, search for classes, build semester-by-semester plans, and track their progress toward graduation. Let's dive into what makes our application special."

---

## [00:45 - 01:45] TECHNICAL ARCHITECTURE (60 seconds)

**[Speaker: Technical overview - suggest Parsh or Mario]**

*[Show architecture diagram or split-screen of backend/frontend code]*

"Course Planner is built on a modern, scalable technology stack. Our backend uses FastAPI, a high-performance Python framework, connected to a PostgreSQL database containing real SDSU course data. We've implemented a clean layered architecture with separate routes, services, repositories, and data models.

The frontend is built with Next.js 16 and React, featuring a responsive design that works seamlessly on desktop and mobile. We use TypeScript for type safety and shadcn/ui components for a polished, professional interface.

For authentication, we implemented JWT tokens with refresh token functionality, ensuring secure access to student data. The entire application is containerized with Docker for easy deployment, and we've set up automated testing to maintain code quality."

---

## [01:45 - 02:30] HOME PAGE & THEME SWITCHING (45 seconds)

**[Speaker: Michael]**

*[Navigate to home page, demonstrate theme switching]*

"Let me show you our landing page. We designed it to be welcoming and intuitive. One feature I'm particularly proud of is the light and dark mode toggle."

*[Click theme switcher button]*

"As you can see, the entire interface seamlessly transitions between themes, making it comfortable to use whether you're planning your schedule at noon or midnight. The theme preference is saved locally, so it remembers your choice.

The homepage provides quick navigation to all major features - let's explore them."

---

## [02:30 - 03:30] AUTHENTICATION & USER PROFILE (60 seconds)

**[Speaker: Parsh]**

*[Navigate to sign-up page]*

"Security was a top priority for us. I implemented the complete authentication system. New users can register with their email and create a secure account."

*[Show registration form, then login]*

"Once registered, users can log in using their credentials. Behind the scenes, our backend generates a JWT access token valid for 15 minutes and a refresh token that lasts 30 days. This means you stay logged in across sessions without compromising security."

*[Navigate to profile page]*

"The profile page displays your saved academic plans. From here, you can create new plans, view existing ones, or manage your account settings. This is your personal dashboard for all academic planning activities."

---

## [03:30 - 05:00] PROGRAM OF STUDY PAGE (90 seconds)

**[Speaker: Mario]**

*[Navigate to Program of Study page]*

"One of the core features I built is the Program of Study page. This is where students can see their complete degree requirements broken down by category.

*[Show program selection or current program view]*

For Computer Engineering majors, you'll see all the required courses organized into categories: Foundation courses, Core requirements, Technical Electives, and General Education. Each category shows how many units are required.

*[Scroll through requirements]*

The page displays GPA requirements and unit totals. We integrated this with the backend to pull real program data from our database, which contains actual SDSU degree requirements.

*[Show unit calculations]*

As you select courses or mark them complete, the system automatically calculates your progress toward each requirement and your overall degree completion. This helps you see at a glance what you've finished and what's remaining."

---

## [05:00 - 06:30] CLASS SEARCH & CATALOG (90 seconds)

**[Speaker: Mario]**

*[Navigate to Classes page]*

"Finding the right classes is crucial for planning. I developed this comprehensive class search feature that makes it easy to discover courses.

*[Demonstrate search functionality]*

You can search by course code - let's try 'COMPE' - and instantly see all Computer Engineering courses. Or search by keyword - typing 'programming' shows all courses with programming in the title.

*[Show filter options]*

We've added filters for GE categories, units, and course level. Want to find all 3-unit upper-division courses? Just apply the filters.

*[Click on a course to show details]*

Each course displays its code, full title, unit count, and description. We populated our database with over 300 real SDSU courses across multiple departments - Computer Engineering, Electrical Engineering, Mathematics, and the complete General Education catalog.

This data integration was a significant effort, ensuring students have access to accurate, up-to-date course information."

---

## [06:30 - 08:30] ACADEMIC PLAN BUILDER (120 seconds)

**[Speaker: Mario and Parsh]**

**Mario:**
*[Click 'Create a Plan' button]*

"Now let's build an actual academic plan. This is where Course Planner really shines - the ability to map out your entire path to graduation.

*[Enter plan name: 'My Graduation Plan']*

When creating a plan, you give it a name and can optionally associate it with a specific program of study.

*[Click 'Add Semester']*

Now I'll add semesters. Let's start with 'Fall 2025'."

*[Add another semester: 'Spring 2026']*

**Parsh:**
"Building on Mario's plan creation system, I integrated the course addition functionality. 

*[Click 'Add Course' button]*

When you click 'Add Course', you get a real-time search interface. 

*[Type 'COMPE 160' in search]*

As you type, the system queries our backend API and displays matching courses instantly. Let's add Introduction to Computer Programming.

*[Select course, it appears in the semester]*

The course is now in your fall semester. Notice it shows the course code, title, and unit count. 

*[Add a few more courses]*

Let's add a few more - Data Structures, Calculus, and a GE course. 

*[Show unit calculation]*

The system automatically calculates total units for each semester, helping you ensure you're taking the right course load - not too many, not too few."

---

## [08:30 - 09:15] PLAN MANAGEMENT & FEATURES (45 seconds)

**[Speaker: Mario]**

*[Demonstrate plan editing features]*

"Once your plan is created, you have complete control. You can edit the plan name by clicking this icon, add or remove semesters with these buttons, and remove courses you no longer need.

*[Show statistics cards]*

The dashboard shows you key metrics: total semesters, total courses, and total units. This gives you a bird's-eye view of your academic journey.

*[Click delete button]*

If you need to start over or a plan is no longer relevant, you can delete it entirely. The system asks for confirmation to prevent accidental deletions.

All changes are saved immediately to our database, so you can access your plans from any device."

---

## [09:15 - 09:45] ABOUT PAGE & TEAM (30 seconds)

**[Speaker: Edwin]**

*[Navigate to About page]*

"I created our About page to tell the story of Course Planner and introduce our team.

*[Show team photo and information]*

Here you can see our team photo and learn about each team member's contributions to the project. We wanted users to know that real students built this tool, understanding the challenges of academic planning firsthand.

The page also explains our mission and the technology behind Course Planner."

---

## [09:45 - 10:00] CLOSING (15 seconds)

**[Speaker: All team members or team lead]**

*[Return to home page or show all features in quick montage]*

"Course Planner represents hundreds of hours of collaborative development, combining modern web technologies with a user-centered design. We've created a tool that we ourselves use and believe will help SDSU students succeed.

Thank you for watching. Visit our application to start planning your path to graduation today!"

*[Fade out with Course Planner logo and URL]*

---

## PRODUCTION NOTES:

### Timing Breakdown:
- Introduction: 45 seconds
- Technical Architecture: 60 seconds  
- Home & Theme: 45 seconds
- Authentication: 60 seconds
- Program of Study: 90 seconds
- Class Search: 90 seconds
- Plan Builder: 120 seconds
- Plan Management: 45 seconds
- About Page: 30 seconds
- Closing: 15 seconds
**Total: 10 minutes**

### Speaker Assignments:
- **Michael**: Home page, theme switching
- **Edwin**: About page (can also do intro or closing)
- **Mario**: Program of Study, Class Search, Plan Builder (first half), Plan Management
- **Parsh**: Authentication, Plan Builder (second half), can do Technical Architecture

### Filming Tips:
1. **Screen Recording**: Use OBS Studio or similar for high-quality screen capture
2. **Audio**: Use a good microphone in a quiet space
3. **Transitions**: Use smooth transitions between features
4. **Highlights**: Use cursor highlights or zoom effects to draw attention to important clicks
5. **B-Roll**: Consider adding code snippets or architecture diagrams during technical sections
6. **Pacing**: Practice to stay within time limits - each speaker should rehearse their section

### Key Features to Showcase:
✅ Light/Dark mode toggle
✅ User authentication (register/login)
✅ Profile dashboard
✅ Program of Study with requirements
✅ Course search and filtering
✅ Real-time search as you type
✅ Academic plan creation
✅ Semester management (add/remove)
✅ Course management (add/remove)
✅ Automatic unit calculations
✅ Plan editing and deletion
✅ Responsive design
✅ About page with team info

### Optional Additions (if time allows or for extended version):
- Show mobile responsiveness
- Demonstrate refresh token functionality
- Show backend API documentation (Swagger/OpenAPI)
- Display database schema
- Show Docker setup
- Demonstrate unit tests (Edwin's work)
