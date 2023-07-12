
import { DBException } from "../../../../../util/exceptions/HttpExceptions";
import { ClientRepository } from "../client.repository";






describe('Tests for Client repository', () => {

    const clientRepository = new ClientRepository()

    beforeAll(async () => {
        await clientRepository.deleteAll();


    });



    describe('When creating a client', () => {


        it('Should create a client', async () => {

            const newUser = {
                email: 'john@mail.com',
                password: '1234',
                name: 'John Doe',
                phone: '1234567890'

            };
            const user = await clientRepository.create(newUser);
            console.log(user);


            expect(user).toEqual({
                id: expect.any(String),
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                phone: newUser.phone
            });

        });


        it('Should return a error if email already exists', async () => {
            const newUser = {
                email: 'john@mail.com',
                password: '1234',
                name: 'John Doe',
                phone: '1234567890'

            };

            await expect(clientRepository.create(newUser)).rejects.toThrowError(
                new DBException(`Failed to create client: Client with email ${newUser.email} exists`, 400)
            );
        });





    })




})
