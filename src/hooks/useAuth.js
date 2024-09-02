import { useState } from "react"

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt_token"))

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return {isAuthenticated, login, logout}
}