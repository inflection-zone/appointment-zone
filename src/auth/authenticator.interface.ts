import express from 'express';
import { AuthenticationResult } from '../domain.types/auth.domain.types';

export interface IAuthenticator {

    
    authenticateClient(request: express.Request) : Promise<AuthenticationResult>;

}
