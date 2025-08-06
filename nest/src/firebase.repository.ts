
import { ProductDto } from './product.dto';
import * as admin from 'firebase-admin';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FirebaseRepository {
    private firestore: admin.firestore.Firestore;

    constructor(@Inject('FIREBASE_APP') private readonly app: admin.app.App) {
        this.firestore = app.firestore();
    }

    async findAll() {
        return await this.firestore.collection('products').get();
    }

    async findById(id: string) {
        const doc = await this.firestore.collection('products').doc(id).get();
        return doc.exists ? doc.data() : null;
    }

    async create(id: string, product: ProductDto) {
        return this.firestore.collection('products').doc(id).set(product);
    }

}