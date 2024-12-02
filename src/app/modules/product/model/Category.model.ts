
export interface Category {
    _id: string; // Update this to match the incoming data structure
    title: string;
    products: string[];
    createdAt?: string; // Optional fields, if needed
    updatedAt?: string; // Optional fields, if needed
}


export interface CategoryFilter {
    label:string;
    value:string|number;
    checked:boolean;
    id:number;
}
