import React from "react";
import StundenListe from "./woche/StundenListe";
import StundenTabelle from "./woche/StundenTabelle";
import { MediaQuery } from "@mantine/core";

export default function Woche() {
    return (
        <>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <StundenListe />
            </MediaQuery>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <StundenTabelle />
            </MediaQuery>
        </>
    );
}
