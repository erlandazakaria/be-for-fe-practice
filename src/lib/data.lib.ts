import { readFileSync, writeFile, unlink, existsSync } from "fs";
import { promisify } from "util";

const write = promisify(writeFile);
const unlinkFile = promisify(unlink);

export default class Data {
    private dataPath: string;
    private baseFilePath = "./public/";

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

    public updateOne = async (id: number, req: any, fileAttribute?: string) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        try {
            const index = data.findIndex(d => d.id === id);
            
            // Delete file if will be updated
            if(fileAttribute && index >= 0 && data[index] && data[index][fileAttribute] && existsSync(`${this.baseFilePath}${data[index][fileAttribute]}`)) {
                await unlinkFile(`${this.baseFilePath}${data[index][fileAttribute]}`)
            }
            data[index] = {...data[index], ...req };
            await write(this.dataPath, JSON.stringify(data));
            return true
        } catch (error) {
            return false
        }
    };

    public deleteOne = async (id: number, fileAttribute?: string) => {
        if(!this.dataPath) return false;
        const data = JSON.parse(readFileSync(this.dataPath).toString());
        if(!data) return false;
        try {
            let updatedData = [];
            let removedData = null;
            data.forEach(d => {
                if(d.id === id) {
                    removedData = d;
                } else {
                   updatedData.push(d);
                }
            });

            await write(this.dataPath, JSON.stringify(updatedData));

            // Delete file if exist
            if(fileAttribute && removedData && removedData[fileAttribute] && existsSync(`${this.baseFilePath}${removedData[fileAttribute]}`)) {
                await unlinkFile(`${this.baseFilePath}${removedData[fileAttribute]}`)
            }
            return removedData !== null
        } catch (error) {
            return false
        }
    };
}
