import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hfödIcon from "../../images/hföd-logo.png";
import iliasIcon from "../../images/ilias.png";

export const linksHföD = [
    {
        name: "Intranet",
        icon: hfödIcon,
        img: true,
        link: "https://wwwint.fhvr-aiv.de/",
    },
    {
        name: "Ilias",
        icon: iliasIcon,
        img: true,
        link: "https://fhoed.iliasnet.de",
    },
    {
        name: "Webmail",
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        img: false,
        link: "https://webmail.aiv.hfoed.de",
    },
];
