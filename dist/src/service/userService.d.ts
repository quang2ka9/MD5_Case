declare class UserService {
    private userRepository;
    constructor();
    addUser: (user: any) => Promise<any>;
    checkRegister: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User is not exist" | {
        idUser: any;
        username: any;
        role: any;
    } | "Password is wrong">;
}
declare const _default: UserService;
export default _default;
