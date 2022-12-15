const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5YmUwZDU0ZjRhYTAwMTUxOTMwMzkiLCJpYXQiOjE2NzEwMjAwNDUsImV4cCI6MTY3MjIyOTY0NX0.3XuEFOEGaNXNTq32t5nPT9qEUWuQJirhYW-2WA-luyQ`;
export const opts = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const uri = "https://striveschool-api.herokuapp.com/api/profile/";
