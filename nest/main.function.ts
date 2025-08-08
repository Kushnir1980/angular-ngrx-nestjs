import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './src/app.module';
import express from 'express';

const server = express();

const createFunction = async () => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
};

createFunction();

export const api = functions.https.onRequest(server);