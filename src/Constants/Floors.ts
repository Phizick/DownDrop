interface IFloor {
    value: string;
    label: string;
}

export const FloorsArr: IFloor[] = Array.from({ length: 25 }, (_, i) => ({
    value: `${i + 3}`,
    label: `${i + 3} этаж`,
}));