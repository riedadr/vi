import { ScrollArea } from "@mantine/core";
import React from "react";
import { planDi } from "../stundenpläne/planDi";
import { planDo } from "../stundenpläne/planDo";
import { planFr } from "../stundenpläne/planFr";
import { planMi } from "../stundenpläne/planMi";
import { planMo } from "../stundenpläne/planMo";
import Tag from "../Tag";

export default function StundenListe() {
    return (
        <div className="stundenListe">
            <ScrollArea  id="stundenListe" scrollHideDelay={200}>
                <ul className="grid gap-6">
                    <li>
                        <h2>Montag</h2>
                        <Tag list={planMo} />
                    </li>
                    <li>
                        <h2>Dienstag</h2>
                        <Tag list={planDi} />
                    </li>
                    <li>
                        <h2>Mittwoch</h2>
                        <Tag list={planMi} />
                    </li>
                    <li>
                        <h2>Donnerstag</h2>
                        <Tag list={planDo} />
                    </li>
                    <li>
                        <h2>Freitag</h2>
                        <Tag list={planFr} />
                    </li>
                </ul>
            </ScrollArea>
        </div>
    );
}
