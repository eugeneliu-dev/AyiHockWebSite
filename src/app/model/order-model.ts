export class OrderPost {
    constructor(
        public Status: number,
        public TotalPrice: number,
        public OrdererPhone: string,
        public PayRule: number,
        public OrderContents: OrderContentPost[]
    ) { }
}

export class OrderContentPost {
    constructor(
        public MealId: number,
        public Quantity: number
    ) { }
}

export class OrderGet {
    constructor(
        public OrderId: string,
        public Status: number,
        public TotalPrice: number,
        public OrdererPhone: string,
        public CreateTime: Date,
        public ModifyTime: Date,
        public OrderContents: OrderContentGet[]
    ) { }
}

export class OrderContentGet {
    constructor(
        public OrderId: string,
        public MealId: number,
        public Quantity: number,
        public MealName: string,
        public MealDesc: string,
        public MealPrice: number,
        public MealPic: string
    ) { }
}
