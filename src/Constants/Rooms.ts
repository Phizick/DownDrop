interface IRoom {
    value: string;
    label: string;
}

export const RoomsArr: IRoom[] = Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}`,
    label: `Комната ${i + 1}`,
}));