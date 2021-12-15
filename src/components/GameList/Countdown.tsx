import { createContext, useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

const CurrentDateContext = createContext<Date | undefined>(undefined);

function CurrentDateContextProvider(props: any) {
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const timer = setTimeout(() => setDate(new Date()), 1000);
        return () => clearTimeout(timer);
    })

    return (<CurrentDateContext.Provider value={date}>
        {props.children}
    </CurrentDateContext.Provider>);
}

function Countdown(props: { startDate: Date }) {
    const date = useContext(CurrentDateContext);
    let text = "00:00:00";
    if (typeof date != 'undefined') {
        const distance = props.startDate.getTime() - date.getTime();

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        text = `${hours}:${minutes}:${seconds}`;
    }

    return <Badge bg="dark">{text}</Badge>;
}

export { CurrentDateContextProvider, Countdown };
