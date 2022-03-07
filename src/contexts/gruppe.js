import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export function useGroup() {
    return useContext(GroupContext);
}

export function GroupProvider({ children }) {
    const [currentGroup, setCurrentGroup] = useState(
        localStorage.group ? localStorage.group : ""
    );

    function setGroup(gruppe) {
        localStorage.group = gruppe;
        setCurrentGroup(gruppe);
    }

    const value = {
        currentGroup,
        setGroup,
    };

    return (
        <div>
            <GroupContext.Provider value={value}>
                {children}
            </GroupContext.Provider>
        </div>
    );
}
