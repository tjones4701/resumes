import apiPageHandler from "@src/utilities/api-handler";

export default apiPageHandler(
    {
        description: "",
        roles: ["PUBLIC"],
        authenticated: true,
    },
    {
        GET: async ({ user }) => {
            return user;
        },
    }
);
