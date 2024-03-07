interface Interface1 {
    field1: boolean;
    field2: number;
    field3: string;
    field4: string[];
    field5: Date;
}
interface Interface2 extends Interface1 {
    field6: string;
    field7: number;
    textToDisplay: string;
}
const myObject: Interface2 = {
    field1: true,
    field2: 126434328,
    field3: 'Card 5242',
    field4: ['Will', 'Smith'],
    field5: new Date(),
    field6: 'Value 6',
    field7: 20,
    textToDisplay: 'Acesta este cardul creat de myObject.'
};
export { myObject };
export {};