import { readFileSync, writeFile } from "fs";
import { promisify } from "util";

const write = promisify(writeFile);

export default class Data {
    private dataPath: string;

    constructor(dataPath: string) {
        this.dataPath = `./data/${dataPath}.json`;
    }

    public getAll = () => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        return data
    };

    public getOne = (id: number) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        return data.find(d => d.id === id);
    };

    public findByKey = (key: string, value: string) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        return data.find(d => d[key] === value);
    }

    public addOne = async (req: any) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        try {
            await write(
                this.dataPath, 
                JSON.stringify([
                    ...data, 
                    {
                        id: data.length === 0 ? 1 : data[data.length -1].id + 1, 
                        ...req
                    }
                ])
            );
            return true
        } catch (error) {
            return false
        }
    };

    public updateOne = async (id: number, req: any) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        try {
            const index = data.findIndex(d => d.id === id);
            data[index] = {...data[index], ...req };
            await write(this.dataPath, JSON.stringify(data));
            return true
        } catch (error) {
            return false
        }
    };

    public deleteOne = async (id: number) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        try {
            const updatedData = data.filter(d => d.id !== id);
            await write(this.dataPath, JSON.stringify(updatedData));
            return true
        } catch (error) {
            return false
        }
    };
}
