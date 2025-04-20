// this libary will allow the server to create and manage sessions

export function generateRandomString(length: number) : string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}
  
export function generateUniqueSessionId(sessions: Array<string>) : string {
    const length = 12;
    let newSessionId;
  
    do {
      newSessionId = generateRandomString(length);
    } while (sessions.includes(newSessionId));
  
    return newSessionId;
}

export function isValidSession(session: string, sessions: Array<string>) : boolean {
    return session.includes(session)
}