import React from "react";
import StundenListe from "./woche/StundenListe";
import StundenTabelle from "./woche/StundenTabelle";
import { MediaQuery } from "@mantine/core";

export default function Woche() {
    return (
        <>
            <MediaQuery largerThan="lg" styles={{ display: "none" }}>
                <StundenListe />
            </MediaQuery>
            <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
                <StundenTabelle />
            </MediaQuery>
        </>
    );
}
