// /pages/api/login.js

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/firebaseConfig'; // Adjust path to your firebaseConfig.js

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            res.status(200).json({
                message: 'User logged in successfully',
                user: { uid: user.uid, email: user.email },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
