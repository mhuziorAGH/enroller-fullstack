import './MeetingsList.css';

export default function MeetingsList({meetings, username, onDelete, onRegister, onUnregister}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnicy</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting) => {
                    const isRegistered = meeting.participants?.some(p => p.login === username);
                    const isOwner = meeting.createdBy === username; // patrz punkt 3

                    return (
                        <tr key={meeting.id}>
                            <td>{meeting.title}</td>
                            <td>{meeting.description}</td>
                            <td>{meeting.participants?.map(p => p.login).join(', ')}</td>
                            <td>
                                {isRegistered
                                    ? <button type="button" className="button-outline" onClick={() => onUnregister(meeting)}>Wypisz się</button>
                                    : <button type="button" className="button-outline" onClick={() => onRegister(meeting)}>Zapisz się</button>
                                }
                                {isOwner &&
                                    <button type="button" className="button-red button-outline" onClick={() => onDelete(meeting)}>Usuń</button>
                                }
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
}