declare module '#auth-utils' {
    interface User {
        id: int,
        name: string,
    }

    interface UserSession {
        id: int,
        name: string,
    }

    interface SecureSessionData {
        // Add your own fields
    }
}

export {}
