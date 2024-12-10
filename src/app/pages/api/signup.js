// /pages/api/signup.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/firebaseConfig'; // Adjust path to your firebaseConfig.js

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            res.status(201).json({
                message: 'User created successfully',
                user: { uid: user.uid, email: user.email },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
