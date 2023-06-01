declare class AdminService {
    private userRepository;
    constructor();
    getAllAccount: () => Promise<any>;
    editRole: (username: any) => Promise<any>;
    reRole: (username: any) => Promise<any>;
}
declare const _default: AdminService;
export default _default;
