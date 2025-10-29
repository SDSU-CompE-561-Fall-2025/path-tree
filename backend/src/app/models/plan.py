from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import String, Integer, ForeignKey
import uuid
from app.core.database import Base

class StudentProfile(Base):
    __tablename__ = "student_profile"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    major_program_id: Mapped[str | None] = mapped_column(String)
    catalog_year: Mapped[str | None] = mapped_column(String)
    plans: Mapped[list["DegreePlan"]] = relationship(back_populates="student", cascade="all, delete-orphan")

class DegreePlan(Base):
    __tablename__ = "degree_plan"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("student_profile.id"), nullable=False)
    program_id: Mapped[str] = mapped_column(String, nullable=False)
    catalog_year: Mapped[str] = mapped_column(String, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False, default="My Plan")
    settings: Mapped[dict] = mapped_column(JSONB, nullable=False, default={})
    student: Mapped[StudentProfile] = relationship(back_populates="plans")
    terms: Mapped[list["Term"]] = relationship(back_populates="plan", cascade="all, delete-orphan")

class Term(Base):
    __tablename__ = "term"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plan_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("degree_plan.id"), nullable=False)
    term_code: Mapped[str] = mapped_column(String, nullable=False)
    max_units: Mapped[int | None] = mapped_column(Integer)
    plan: Mapped[DegreePlan] = relationship(back_populates="terms")
    courses: Mapped[list["PlannedCourse"]] = relationship(back_populates="term", cascade="all, delete-orphan")

class PlannedCourse(Base):
    __tablename__ = "planned_course"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    term_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("term.id"), nullable=False)
    course_id: Mapped[str] = mapped_column(String, nullable=False) 
    status: Mapped[str] = mapped_column(String, nullable=False, default="planned") 
    term: Mapped[Term] = relationship(back_populates="courses")
