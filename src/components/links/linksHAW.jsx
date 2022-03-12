import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moodleIcon from "../../images/moodle.png"
import nextcloudIcon from "../../images/nextcloud.png"

export const linksHAW = [

    {
        name: "moodle",
        icon: moodleIcon,
        img: true,
        link: "https://moodle.hof-university.de"
    },
    {
        name: "Nextcloud",
        icon: nextcloudIcon,
        img: true,
        link: "https://nextcloud.hof-university.de"
    },
    {
        name: "Outlook",
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        img: false,
        link: "https://outlook.hof-university.de"
    },
]