declare module '#auth-utils' {
    interface User {
        id: int,
        name: string,
        email: string,
    }

    interface UserSession {
        id: int,
        name: string,
        email: string,
    }

    interface SecureSessionData {
        // Add your own fields
    }
}

export {}
