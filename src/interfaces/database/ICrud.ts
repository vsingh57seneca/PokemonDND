export interface ICrud<T> {
    create(record: T): void;
    read(id? :string, name?: string): T | T[] | undefined;
    update(id: string, updatedRecord: Partial<T>): boolean;
    delete(id: string): boolean;

}