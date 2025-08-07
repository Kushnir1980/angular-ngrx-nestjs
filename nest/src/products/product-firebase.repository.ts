
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
        const snapshot = await this.firestore.collection('products').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as ProductDto));
    }

    async findById(id: string) {
        const doc = await this.firestore.collection('products').doc(id).get();
        return doc.exists ? doc.data() : null;
    }

    async create(id: string, product: ProductDto) {
        return this.firestore.collection('products').doc(id).set(product);
    }

    async update(id: string, product: ProductDto) {
        return this.firestore.collection('products').doc(id).update({ data: product });
    }

    async remove(id: string) {
        return this.firestore.collection('products').doc(id).delete();
    }

}