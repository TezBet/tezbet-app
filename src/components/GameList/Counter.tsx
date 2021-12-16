import { createContext, useContext, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

const CurrentDateContext = createContext<Date | undefined>(undefined);

function CurrentDateContextProvider(props: any) {
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const timer = setTimeout(() => setDate(new Date()), 1000);
        return () => clearTimeout(timer);
    });

    return <CurrentDateContext.Provider value={date}>{props.children}</CurrentDateContext.Provider>;
}

function zerofill(n: number) {
    if (n >= 10) {
        return n.toString();
    } else {
        return "0" + n.toString();
    }
}

function Counter(props: { targetDate: Date; isCountingUp: boolean }) {
    const date = useContext(CurrentDateContext);
    let text = "00:00:00";
    if (typeof date != "undefined") {
        let distance;
        if (props.isCountingUp) {
            distance = date.getTime() - props.targetDate.getTime();
        } else {
            distance = props.targetDate.getTime() - date.getTime();
        }
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        text = `${zerofill(hours)}:${zerofill(minutes)}:${zerofill(seconds)}`;
    }

    return <Badge bg="dark">{text}</Badge>;
}

export { CurrentDateContextProvider, Counter };