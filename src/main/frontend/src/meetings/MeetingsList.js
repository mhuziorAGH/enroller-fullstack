import './MeetingsList.css';

export default function MeetingsList({meetings, onDelete}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>
                        <button type="button" className="button-red button-outline" onClick={() => onDelete(meeting)}>Usuń</button>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
