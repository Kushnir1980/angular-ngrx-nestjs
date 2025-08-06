import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FirebaseRepository } from './firebase.repository';

@Global()
@Module({
  imports: [],
  controllers: [ProductController],
  providers: [{
    provide: 'FIREBASE_APP',
    useFactory: () => {
      return admin.initializeApp({
        credential: admin.credential.cert(require('../firebase.json')),
        databaseURL: 'https://nest-c0fb1.firebaseio.com', // for Realtime DB
      });
    },
  }, ProductService, FirebaseRepository],
  exports: ['FIREBASE_APP']
})
export class AppModule { }
