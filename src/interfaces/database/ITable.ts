export interface ITable<T> {
    tableName: string;
    records: Array<T>;


    loadTableFromStoage(): Array<T>;
    saveTableToStorage(): void;
}