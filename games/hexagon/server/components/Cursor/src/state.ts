export interface IState{
    cursorTop: number;
    cursorLeft: number;
    isSelected: boolean
}

let state: IState = {
    cursorTop: 0,
    cursorLeft: 0,
    isSelected: false
};

export default state;