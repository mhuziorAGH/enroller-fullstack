import "milligram";
import './App.css';
import {useState} from "react";
import LoginForm from "./LoginForm";
import UserPanel from "./UserPanel";

function App() {
    const [loggedIn, setLoggedIn] = useState('');

    async function login(email) {
        if (!email) {
            return;
        }

        // sprawdź, czy taki uczestnik już istnieje
        const checkResponse = await fetch(`/api/participants/${email}`);

        if (checkResponse.status === 404) {
            // nie istnieje - zarejestruj go automatycznie
            const createResponse = await fetch('/api/participants', {
                method: 'POST',
                body: JSON.stringify({login: email, password: ''}),
                headers: {'Content-Type': 'application/json'}
            });

            if (!createResponse.ok) {
                console.error('Nie udało się zarejestrować uczestnika');
                return;
            }
        }

        setLoggedIn(email);
    }

    function logout() {
        setLoggedIn('');
    }

    return (
        <div>
            <h1>System do zapisów na zajęcia</h1>
            {loggedIn ? <UserPanel username={loggedIn} onLogout={logout}/> : <LoginForm onLogin={login}/>}
        </div>
    );
}

export default App;