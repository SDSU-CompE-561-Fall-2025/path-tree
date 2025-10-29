from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, Float
from app.core.database import Base

class Course(Base):
    __tablename__ = "course"
    id: Mapped[str] = mapped_column(String, primary_key=True)      
    title: Mapped[str] = mapped_column(String, nullable=False)
    units: Mapped[int] = mapped_column(Integer, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False)
    prereq_rules: Mapped[list["CoursePrereq"]] = relationship(
        back_populates="target_course", foreign_keys="CoursePrereq.target_course_id", cascade="all, delete-orphan"
    )
    as_prereq_for: Mapped[list["CoursePrereq"]] = relationship(
        back_populates="prereq_course", foreign_keys="CoursePrereq.prereq_course_id"
    )

class CoursePrereq(Base):
    __tablename__ = "course_prereq"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    target_course_id: Mapped[str] = mapped_column(ForeignKey("course.id"), nullable=False)
    prereq_course_id: Mapped[str] = mapped_column(ForeignKey("course.id"), nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)    
    group_tag: Mapped[str | None] = mapped_column(String)
    min_grade: Mapped[float | None] = mapped_column(Float)
    target_course = relationship("Course", back_populates="prereq_rules", foreign_keys=[target_course_id])
    prereq_course = relationship("Course", back_populates="as_prereq_for", foreign_keys=[prereq_course_id])
