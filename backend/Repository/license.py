from Models.license import License
from config import db
from sqlalchemy import select

class LicenseRepository:

    @staticmethod
    async def create(license_obj: License):
        async with db as session:
            session.add(license_obj)
            await session.commit()
            await session.refresh(license_obj)
            return license_obj

    @staticmethod
    async def get_by_company_id(company_id: int):
        async with db as session:
            query = select(License).where(License.company_id == company_id)
            result = await session.execute(query)
            return result.scalar_one_or_none()
