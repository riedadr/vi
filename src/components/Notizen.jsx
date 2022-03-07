import RichTextEditor from "@mantine/rte";
import React, { useState } from "react";

export default function Notizen() {
    const initialNote =
        "<p>Die Notizen werden <strong>lokal </strong>(<em>localStorage</em>) auf dem Gerät gespeichert. Werden die <u>Webseitendaten gelöscht</u>, so sind auch die <s>Notizen</s> weg.</p>";
    const [value, onChange] = useState(localStorage.note ? localStorage.note : initialNote);
    function writeNote(e) {
        localStorage.note = e;
        onChange(e);
    }
    return (
            <RichTextEditor value={value} onChange={writeNote} />
    );
}
