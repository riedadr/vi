import { Checkbox, ScrollArea } from "@mantine/core";
import React from "react";
import { planDi } from "../stundenpläne/planDi";
import { planDo } from "../stundenpläne/planDo";
import { planFr } from "../stundenpläne/planFr";
import { planMi } from "../stundenpläne/planMi";
import { planMo } from "../stundenpläne/planMo";
import Tag from "../Tag";

//? Gibt die Stunden der Woche als Liste aus (für kleine Bildschirme)
export default function StundenListe() {
    const [checked, setChecked] = React.useState(false);

    return (
        <div className="stundenListe">
            <ScrollArea
                className="pr-2"
                id="stundenListe"
                scrollHideDelay={200}
                mr={-16}
            >
                <ul className="grid gap-6 mr-4">
                    <li className="border-b-2 border-solid border-zinc-500 pb-4">
                        <h2 className="flex justify-between">
                            Montag
                            <Checkbox
                                className="flex-row-reverse gap-4"
                                label="alle Gruppen anzeigen"
                                checked={checked}
                                onChange={(event) =>
                                    setChecked(event.currentTarget.checked)
                                }
                            />
                        </h2>
                        <Tag list={planMo} showAll={checked} />
                    </li>
                    <li className="border-b-2 border-solid border-zinc-500 pb-4">
                        <h2>Dienstag</h2>
                        <Tag list={planDi} showAll={checked} />
                    </li>
                    <li className="border-b-2 border-solid border-zinc-500 pb-4">
                        <h2>Mittwoch</h2>
                        <Tag list={planMi} showAll={checked} />
                    </li>
                    <li className="border-b-2 border-solid border-zinc-500 pb-4">
                        <h2>Donnerstag</h2>
                        <Tag list={planDo} showAll={checked} />
                    </li>
                    <li>
                        <h2>Freitag</h2>
                        <Tag list={planFr} showAll={checked} />
                    </li>
                </ul>
            </ScrollArea>
        </div>
    );
}
