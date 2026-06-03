from Models.company import Company
from config import db
from sqlalchemy import select, update, delete

class CompanyRepository:

    @staticmethod
    async def create(company: Company):
        async with db as session:
            session.add(company)
            await session.commit()
            await session.refresh(company)
            return company

    @staticmethod
    async def get_by_id(id: int):
        async with db as session:
            query = select(Company).where(Company.id == id)
            result = await session.execute(query)
            return result.scalar_one_or_none()
