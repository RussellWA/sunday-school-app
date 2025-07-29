export interface UserInfo {
    email: string;
    fullName: string;
    role: "parent" | string;
    createdAt: string;
    phone?: string;
}