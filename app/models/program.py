from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from app.core.database import Base

class Program(Base):
    __tablename__ = "program"
    id: Mapped[str] = mapped_column(String, primary_key=True)     
    name: Mapped[str] = mapped_column(String, nullable=False)
    level: Mapped[str] = mapped_column(String, nullable=False)     
    catalog_year: Mapped[str] = mapped_column(String, nullable=False)
    streams: Mapped[list["Stream"]] = relationship(back_populates="program", cascade="all, delete-orphan")
    requirements: Mapped[list["ProgramRequirement"]] = relationship(back_populates="program", cascade="all, delete-orphan")

class Stream(Base):
    __tablename__ = "stream"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    program_id: Mapped[str] = mapped_column(ForeignKey("program.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(String)
    program: Mapped[Program] = relationship(back_populates="streams")
    requirements: Mapped[list["ProgramRequirement"]] = relationship(back_populates="stream")

class ProgramRequirement(Base):
    __tablename__ = "program_requirement"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    program_id: Mapped[str] = mapped_column(ForeignKey("program.id"), nullable=False)
    stream_id: Mapped[str | None] = mapped_column(ForeignKey("stream.id"))
    kind: Mapped[str] = mapped_column(String, nullable=False)     
    min_units: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    rule: Mapped[dict] = mapped_column(JSONB, nullable=False, default={})
    program: Mapped[Program] = relationship(back_populates="requirements")
    stream: Mapped[Stream | None] = relationship(back_populates="requirements")
