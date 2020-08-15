export interface Team {
    teamid: number;
    name: string;
    alias: string;
    ordering: number;
    description: string;
    status: string;
}

export interface Officer {
    officerid: number;
    name: string;
    alias: string;
    team: Team;
    ordering: number;
    description: string;
    status: string;
    type: string;
}

export interface Officership {
    id: string;
    member: User;
    officer: Officer;
    from_date: string;
    till_date: string;
    officer_name: string;
}

export interface Paid {
    year: string;
    paid: string;
}

export interface Depends {
}

export interface AwardedBy {
    display: string;
    url: string;
    value: string;
}

export interface AwardedTo {
    display: string;
    url: string;
    value: string;
}

export interface Training {
    status_id: number;
    title: string;
    detail: string;
    depends: Depends;
    awarded_by: AwardedBy;
    user_status_id: number;
    awarded_to: AwardedTo;
    awarded_time: number;
    revoked_by?: any;
    revoked_time: boolean;
}

export interface User {
    memberid: number;
    fname: string;
    sname: string;
    public_email: string;
    url: string;
    receive_email: boolean;
    photo: string;
    bio: string;
}

export interface Credit {
    type: number;
    memberid: number;
    User: User;
    type_name: string;
}

export interface Subtype {
    id: string;
    name: string;
    class: string;
    description: string;
    display: string;
    html: string;
}

export interface Seasons {
    display: string;
    value: number;
    title: string;
    url: string;
}

export interface Editlink {
    display: string;
    value: string;
    title: string;
    url: string;
}

export interface Applylink {
    display: string;
    value: string;
    title: string;
    url: string;
}

export interface Micrositelink {
    display: string;
    value: string;
    title: string;
    url: string;
}

export interface Show {
    show_id: number;
    title: string;
    credits_string: string;
    credits: Credit[];
    description: string;
    show_type_id: number;
    subtype: Subtype;
    seasons: Seasons;
    editlink: Editlink;
    applylink: Applylink;
    micrositelink: Micrositelink;
    photo: string;
}

export interface Payment {
    year: string;
    paid: string;
}

export interface MyRadioUser extends User {
    officerships?: Officership[];
    paid?: Paid[];
    locked?: boolean;
    college?: string;
    email?: string;
    phone?: string;
    eduroam?: string;
    local_alias?: string;
    local_name?: string;
    last_login?: string;
    training?: Training[];
    shows?: Show[];
    payment?: Payment[];
    is_currently_paid?: boolean;
}
