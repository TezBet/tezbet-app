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

function Counter(props: { targetDate: Date }) {
    const date = useContext(CurrentDateContext);
    let text = "00:00:00";
    if (typeof date != "undefined") {
        const distance = Math.abs(date.getTime() - props.targetDate.getTime()) / 1000;
        const hours = Math.floor(distance / (60 * 60));
        const minutes = Math.floor((distance % (60 * 60)) / (60));
        const seconds = Math.floor(distance % 60);

        text = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    }

    return <Badge className="game-item-counter" bg="dark">{text}</Badge>;
}

export { CurrentDateContextProvider, Counter };
