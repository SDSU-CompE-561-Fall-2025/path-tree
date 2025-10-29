from fastapi import APIRouter

router = APIRouter()


@router.get("/", summary="API Status", response_description="API is running")
def status():
    return {"Status": "API is running"}
