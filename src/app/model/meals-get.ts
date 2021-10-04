export class MealsGet {
    mealId: number;
    name: string;
    description: string;
    price: number;
    type: number;
    picPath: string;
    quantity: number;

    constructor(mealGetObject: any) { 
        this.mealId = mealGetObject.MealId,
        this.name = mealGetObject.Name,
        this.description = mealGetObject.Description,
        this.price = mealGetObject.Price,
        this.type = mealGetObject.Type,
        this.picPath = mealGetObject.PicPath,
        this.quantity = 0
    }
}


export class MealTypesGet {
    typeId: number;
    type: string;

    constructor(mealTypesGetObject: any) {
        this.typeId = mealTypesGetObject.TypeId;
        this.type = mealTypesGetObject.Type;
    }
}