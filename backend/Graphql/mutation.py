import strawberry

from Service.note import NoteService
from Service.authentication import AuthenticationService
from schema import NoteType, NoteInput, RegisterInput, LoginInput, LoginType, AddCompanyUserInput
from Middleware.JWTBearer import IsAuthenticated
from Middleware.JWTManager import JWTManager

@strawberry.type
class Mutation:
    
    @strawberry.mutation(permission_classes=[IsAuthenticated])
    async def add_note(self, note: NoteInput) -> NoteType:
        return await NoteService.add_note(note)
    
    @strawberry.mutation(permission_classes=[IsAuthenticated])  
    async def delete_note(self, id: int) -> bool:
        return await NoteService.delete(id)

    @strawberry.mutation(permission_classes=[IsAuthenticated])
    async def update_note(self, id: int, note: NoteInput) -> NoteType | None:
        return await NoteService.update(id, note)

    @strawberry.mutation
    async def login(self, login: LoginInput) -> LoginType:
        return await AuthenticationService.login(login)

    @strawberry.mutation
    async def register(self, register_input: RegisterInput) -> str:
        return await AuthenticationService.register(register_input)

    @strawberry.mutation(permission_classes=[IsAuthenticated])
    async def add_company_user(self, info: strawberry.Info, new_user: AddCompanyUserInput) -> str:
        request = info.context["request"]
        authentication = request.headers.get("Authorization")
        token = authentication.split("Bearer ")[1]
        payload = JWTManager.verify_token(token)
        admin_email = payload.get("sub")
        
        return await AuthenticationService.add_company_user(admin_email, new_user)
