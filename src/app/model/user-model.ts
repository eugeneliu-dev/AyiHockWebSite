
export class UserModel {

    private _name = ''
    private _email = '';
    private _role = '';
    private _platform = 0;
    private _discount = 1;

    constructor(name: string, email: string, role: string, platform: number) {
        this._name = name;
        this._email = email;
        this._role = role;
        this._platform = platform;
    }

    //Name
    get getName(): string {
        return this._name;
    }
    set setName(name: string) {
        this._name = name;
    }

    //Email
    get getMail(): string {
        return this._email;
    }
    set setMail(mail: string) {
        this._email = mail;
    }

    //Role
    get userrole(): string {
        return this._role;
    }
    set setRole(role: string) {
        this._role = role;
    }

    //Platform
    get getPlatform(): number {
        return this._platform;
    }
    set setPlatform(platform: number) {
        this._platform = platform;
    }

    get discount(): number {

        switch (this._role)
        {
            case "normal":
                return 1;
            case "golden":
                return 0.95;
            case "platinum":
                return 0.90;
            case "diamond":
                return 0.85;
            default:
                return 1;
        }
    }
}

export class UserPwdModifyModel {
    constructor(
        public OldPassword: string,
        public NewPassword: string
    ) { }
}

export class UserPwdResetModel {
    constructor(
        public UserAccountMail: string,
        public DefaultPassword: string,
        public NewPassword: string
    ) { }
}

export class UserPwdForgetModel {
    constructor(
        public UserAccountMail: string
    ) { }
}