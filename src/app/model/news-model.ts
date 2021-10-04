export class NewsGet {
    constructor(
        public NewsId: number,
        public Title: number,
        public Content: number,
        public ManagerName: string,
        public CreateTime: Date,
        public ModifyTime: Date,
        public IsHot: boolean,
        public CategoryName: string,
    ) { }
}