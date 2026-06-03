from fastapi import HTTPException
from passlib.context import CryptContext

from Models.user import User
from Models.company import Company
from Models.license import License
from Models.enums import RoleType, LicenseType
from Repository.user import UserRepository
from Repository.company import CompanyRepository
from Repository.license import LicenseRepository
from schema import RegisterInput, LoginInput, LoginType, AddCompanyUserInput
from Middleware.JWTManager import JWTManager

class AuthenticationService:
    pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return AuthenticationService.pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    async def login(login: LoginInput):
        existing_user = await UserRepository.get_by_email(login.email)

        if not existing_user:
            raise HTTPException(status_code=401, detail="Email not found!")

        if not AuthenticationService.verify_password(login.password, existing_user.password):
            raise HTTPException(status_code=401, detail="Incorrect password!")

        # You might want to include company_id in the token payload in the future
        token = JWTManager.generate_token({"sub": existing_user.email, "company_id": existing_user.company_id, "role": existing_user.role.value})

        return LoginType(email=existing_user.email, token=token)

    @staticmethod
    async def register(user_input: RegisterInput):
        existing_user = await UserRepository.get_by_email(user_input.email)

        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # 1. Create Company
        new_company = Company(name=user_input.company_name)
        created_company = await CompanyRepository.create(new_company)

        # 2. Create Default License (Free plan, 1 user max)
        new_license = License(company_id=created_company.id, type=LicenseType.PER_USER, max_users=1)
        await LicenseRepository.create(new_license)

        # 3. Create User as ADMIN for that company
        hashed_password = AuthenticationService.pwd_context.hash(user_input.password)
        new_user = User(
            name=user_input.name, 
            email=user_input.email, 
            password=hashed_password,
            company_id=created_company.id,
            role=RoleType.ADMIN
        )
        await UserRepository.create(new_user)

        return "Company and Admin User registered successfully"

    @staticmethod
    async def add_company_user(admin_email: str, new_user_input: AddCompanyUserInput):
        admin_user = await UserRepository.get_by_email(admin_email)
        
        if not admin_user or admin_user.role != RoleType.ADMIN:
            raise HTTPException(status_code=403, detail="Only ADMIN users can add new users")

        existing_user = await UserRepository.get_by_email(new_user_input.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User email already in use")

        # Check License Limits
        license_obj = await LicenseRepository.get_by_company_id(admin_user.company_id)
        if not license_obj or not license_obj.is_active:
            raise HTTPException(status_code=403, detail="Company license is invalid or inactive")

        if license_obj.type == LicenseType.PER_USER:
            current_user_count = await UserRepository.count_by_company(admin_user.company_id)
            if current_user_count >= license_obj.max_users:
                raise HTTPException(status_code=403, detail=f"License limit reached ({license_obj.max_users} users). Please upgrade your plan.")

        # Create new user
        hashed_password = AuthenticationService.pwd_context.hash(new_user_input.password)
        new_user = User(
            name=new_user_input.name, 
            email=new_user_input.email, 
            password=hashed_password,
            company_id=admin_user.company_id,
            role=new_user_input.role
        )
        await UserRepository.create(new_user)

        return "User added successfully to the company"