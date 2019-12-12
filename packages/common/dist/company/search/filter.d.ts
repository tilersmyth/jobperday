interface FilterOption {
    options: string[];
    default: string;
}
interface SearchFilterOptions {
    radius: FilterOption;
    pay_rate: FilterOption;
}
export declare const searchFilterOptions: SearchFilterOptions;
export {};
