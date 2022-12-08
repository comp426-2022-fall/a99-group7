import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [logsLoaded, setLogsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await axios.get('http://localhost:3000/app/logs').then((response) => {
                setLogs(response.data);
                setLogsLoaded(true);
            }).catch((response) =>  {
                alert("ERROR");
            })
        })();
    }, []);

    const displayLogs = () => {
        if (logsLoaded == true) {
            return (logs.data.map((listValue, index) => {
                return (
                    <tr key={index}>
                        <td>{listValue.email}</td>
                        <td>{listValue.datetime}</td>
                        <td>{listValue.event}</td>
                    </tr>
                )
            }))
        }
    }
    
    return (
        <div>
            <div>
                <h1 style = {{fontWeight: "bold", fontSize: 30}}>User Logs</h1>
            </div>
            <div>
                <table>
                    <tr>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>EMAIL</td>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>DATETIME</td>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>EVENT</td>
                    </tr>
                    {displayLogs(logs)}
                </table>
            </div>
        </div>
    )

}

export default Logs;