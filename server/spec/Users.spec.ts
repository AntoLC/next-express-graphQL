import app from '@Server';
import supertest from 'supertest';

import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import { User } from '@models';
import { pErr, paramMissingError } from '@shared';

const mongoose = require('mongoose');


describe('Users Routes', () => {

    const usersPath = '/api/users';
    const getUsersPath = `${usersPath}/all`;
    const addUsersPath = `${usersPath}/add`;
    const updateUserPath = `${usersPath}/update`;
    const deleteUserPath = `${usersPath}/delete/:id`;

    const user_data = { user: {"name":"tata","email":"tata.anthony@gmail.com"}};

    let agent: SuperTest<Test>;
    let db:any;

    beforeAll(async (done) => {
        await User.deleteMany({});
        agent = supertest.agent(app);
        done();
    });

    afterAll(async (done) => {
        await User.deleteMany({});
        done();
    });

    describe(`"POST:${addUsersPath}"`, () => {
        it(`Request success`, (done) => 
        {
            agent.post(addUsersPath).type('form').send(user_data)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`Request failed`, (done) => 
        {
            const user_data_failed = { user: {"name":"tata"}};

            agent.post(addUsersPath).type('form').send(user_data_failed)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBeDefined();
                    done();
                });
        });
    });

    describe(`"GET:${getUsersPath}"`, () => {
        it(`All User`, (done) => {
            agent.get(getUsersPath).end((err: Error, res: Response) => {
                pErr(err);

                //console.log("GET", res);

                expect(res.status).toBe(OK);
                
                const {email, name} = res.body.users[0];
                const response_user = {user: {email: email, name: name}}
                expect(response_user).toEqual(user_data);

                done();
            });
        });
    });

    describe(`"PUT:${addUsersPath}"`, () => {
        it(`Update User`, (done) => 
        {
            const new_value = "toto";
            // We get the existing ID from db to update
            agent.get(getUsersPath).end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(OK);

                const {_id} = res.body.users[0];
                const user_data_update = { user: {"id":_id, "name":new_value,"email": new_value+".anthony@gmail.com"}};
                
                // Then - We make the update
                agent.put(updateUserPath).type('form').send(user_data_update)
                    .end((err: Error, res: Response) => {
                        pErr(err);
                        expect(res.status).toBe(OK);
                        expect(res.body.error).toBeUndefined();
                        
                        // Then - We Check if update is made
                        agent.get(getUsersPath).end((err: Error, res: Response) => {
                            pErr(err);
                            expect(res.status).toBe(OK);
                            
                            const {name} = res.body.users[0];
                            expect(name).toEqual(new_value);
        
                            done();
                        });
                    });
            });
        });
    });

    describe(`"DELETE:${deleteUserPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteUserPath.replace(':id', id.toString()));
        };

        it(`Delete successful.`, (done) => {
            agent.get(getUsersPath).end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(OK);

                const {_id} = res.body.users[0];
                callApi(_id).end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
            });
        });

        it(`Delete unsuccessful.`, (done) => {
            callApi(123).end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBeDefined();
                done();
            });
        });
    });
});
