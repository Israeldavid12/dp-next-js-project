'use client'
import { jwtDecode } from 'jwt-decode';




class User {
    static async getUserName() {
        try {
            const token = localStorage.getItem('sessionToken');
            if (token) {
                const decoded = jwtDecode(token);
                return decoded.name
            } else {
                console.log('Token não encontrado');
                return null
            }

        } catch (e) {
            console.log(e)
            console.log('Token não encontrado');
            return null
        }

    }

    static async getEmail() {
        try {
            const token = localStorage.getItem('sessionToken');
            if (token) {
                const decoded = jwtDecode(token);
                return decoded.email
            } else {
                console.log('Token não encontrado');
                return null
            }

        } catch (e) {
            console.log(e)
            console.log('Token não encontrado');
            return null
        }
    }
}

export default User;