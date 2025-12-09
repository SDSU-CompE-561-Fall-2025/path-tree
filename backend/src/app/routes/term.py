from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, distinct
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.models.plan import PlanTerm  # this is your PlanTerm model

router = APIRouter(
    
    tags=["terms"],
)


@router.get("/")
async def list_terms(db: AsyncSession = Depends(get_db)):
    """
    Return all distinct term codes from plan_terms.
    Example: [{ "code": "2025-Fall", "name": "2025-Fall" }, ...]
    """
    result = await db.execute(
        select(distinct(PlanTerm.term_code)).order_by(PlanTerm.term_code)
    )
    codes = result.scalars().all()

    return [{"code": code, "name": code} for code in codes]


@router.get("/{term_id}")
async def get_term(term_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get one term row by ID.
    """
    result = await db.execute(
        select(PlanTerm).where(PlanTerm.id == term_id)
    )
    term = result.scalar_one_or_none()

    if term is None:
        raise HTTPException(status_code=404, detail="Term not found")

    return {
        "id": term.id,
        "code": term.term_code,
        "name": term.term_code,
        "plan_id": term.plan_id,
    }