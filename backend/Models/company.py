from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Company(SQLModel, table=True):
    __tablename__ = "companies"

    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    name: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
