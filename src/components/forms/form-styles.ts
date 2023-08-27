import { makeStyles } from "@fluentui/react-components";

export const useFormStyles = makeStyles({
    required: {
        color: "red",
        paddingLeft: "0.2em",
        fontWeight: "bold",
    },
    defaultInputContainer: {
        paddingBottom: "15px",
    },
});
