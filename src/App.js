import React, { useState } from "react";
import "./App.css";
import {
    AppShell,
    Burger,
    Header,
    MediaQuery,
    Navbar,
    Text,
    Tabs,
    useMantineTheme,
    Button,
    Select,
    ScrollArea,
    Modal,
} from "@mantine/core";
import viIcon from "./images/vi-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDay,
    faCalendarWeek,
    faCircleInfo,
    faEnvelope,
    faPencil,
    faUserGroup,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Aktuell from "./components/Aktuell";
import Woche from "./components/Woche";
import { useGroup } from "./contexts/gruppe";
import Dozenten from "./components/dozenten/Dozenten";
import Disclaimer from "./components/Disclaimer";
import Notizen from "./components/Notizen";
import Links from "./components/links/Links";

function App() {
    const { currentGroup, setGroup } = useGroup();
    const [showNav, toggleNav] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [disclaimer, toggleDisclaimer] = useState(
        localStorage.group ? false : true
    );
    const [notes, toggleNotes] = useState(false);
    const theme = useMantineTheme();

    return (
        <div className="text-white bg-zinc-800">
            <Modal
                opened={disclaimer}
                onClose={() => toggleDisclaimer(false)}
                title={<h1 className="text-red-500">OBACHT!</h1>}
            >
                <Disclaimer />
            </Modal>
            <Modal
                className="notes"
                size="full"
                opened={notes}
                onClose={() => toggleNotes(false)}
                title={<h1 className="text-mantineAcc">Notizen</h1>}
            >
                <Notizen />
            </Modal>
            <AppShell
                // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
                navbarOffsetBreakpoint="sm"
                // fixed prop on AppShell will be automatically added to Header and Navbar
                fixed
                navbar={
                    <Navbar
                        fixed
                        position={{ top: 0, left: 0 }}
                        padding="md"
                        // Breakpoint at which navbar will be hidden if hidden prop is true
                        hiddenBreakpoint="lg"
                        // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
                        hidden={!showNav}
                        // when viewport size is less than theme.breakpoints.sm navbar width is 100%
                        // viewport size > theme.breakpoints.sm – width is 300px
                        // viewport size > theme.breakpoints.lg – width is 400px (lg: 400 )
                        width={{ lg: 350 }}
                    >
                        <Navbar.Section className="mb-4">
                            <Select
                                icon={<FontAwesomeIcon icon={faUserGroup} />}
                                label={<Text color="dimmed">
                                Deine Gruppe
                            </Text>}
                                placeholder="wähle eine Gruppe"
                                value={currentGroup}
                                onChange={setGroup}
                                data={[
                                    { value: "gr1", label: "Gruppe I" },
                                    { value: "gr2", label: "Gruppe II" },
                                    { value: "gr3", label: "Gruppe III" },
                                ]}
                            />
                        </Navbar.Section>

                        {/* Grow section will take all available space that is not taken by first and last sections */}
                        
                        <Navbar.Section
                            grow
                            component={ScrollArea}
                            scrollHideDelay={200}
                            ml={-10}
                            mr={-16}
                            sx={{ paddingLeft: 10, paddingRight: 10 }}
                        >
                            <Dozenten />
                        </Navbar.Section>

                        <Navbar.Section className="pt-2 grid gap-2">
                            <Button
                                className="btn-text-left"
                                fullWidth
                                leftIcon={<FontAwesomeIcon icon={faPencil} />}
                                onClick={() => {
                                    toggleNotes(true);
                                }}
                            >
                                Notizen
                            </Button>
                            <Button
                                component="a"
                                href="https://www.studentenwerk-oberfranken.de/essen/speiseplaene/hof.html"
                                target="_blank"
                                className="btn-text-left"
                                fullWidth
                                leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                            >
                                Mensa
                            </Button>
                        </Navbar.Section>

                        <Navbar.Section className="mb-2">
                            <Links />
                        </Navbar.Section>

                        {/* Last section with normal height (depends on section content) */}
                        <Navbar.Section className="w-full flex justify-between pt-4 border-t-2 border-solid border-mantineFg">
                            <Button
                                color="orange"
                                component="a"
                                href="https://github.com/riedadr/vi"
                                target="_blank"
                                leftIcon={<FontAwesomeIcon icon={faGithub} />}
                            >
                                GitHub
                            </Button>

                            <Button
                                color="indigo"
                                component="a"
                                href="mailto:adrian.riedel@hof-university.de"
                                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                            >
                                E-Mail
                            </Button>
                            <Button
                                color="yellow"
                                onClick={() => toggleDisclaimer(true)}
                                leftIcon={
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                }
                            >
                                Info
                            </Button>
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                    <Header height={70} padding="md">
                        {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <MediaQuery
                                largerThan="lg"
                                styles={{ display: "none" }}
                            >
                                <Burger
                                    opened={showNav}
                                    onClick={() => toggleNav((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <div className="flex justify-between w-full items-center">
                                <Text size="xl">VI-Stundenplan</Text>

                                <img className="h-10" src={viIcon} alt="" />
                            </div>
                        </div>
                    </Header>
                }
            >
                <Tabs active={activeTab} onTabChange={setActiveTab}>
                    <Tabs.Tab
                        label="Aktuell"
                        icon={<FontAwesomeIcon icon={faCalendarDay} />}
                    >
                        <Aktuell />
                    </Tabs.Tab>
                    <Tabs.Tab
                        label="Woche"
                        icon={<FontAwesomeIcon icon={faCalendarWeek} />}
                    >
                        <Woche />
                    </Tabs.Tab>
                </Tabs>
            </AppShell>
        </div>
    );
}

export default App;
