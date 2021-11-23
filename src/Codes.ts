const fs = require("fs");
const path = require("path");
const codePath = path.join(__dirname, "/data/codes.json");

export class CodesCtrl {
  async getAll() {
    try {
      const data = fs.readFileSync(codePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  }

  async getCode(id: any) {
    let codes = await this.getAll();
    return codes[id];
  }

  async createCode(code: string) {
    let codes = await this.getAll()
    let capsCode = code.toUpperCase();
    let newCodes = {...codes, [capsCode]:code}
    let jsonString = JSON.stringify(newCodes)
    try{
      fs.writeFile(codePath, jsonString, (err:any) => {console.error(err)})
    }catch(err){
      console.error(err)
    }
  }

  async deleteCode(id: any) {
    let capsCode = id.toUpperCase();
    let codes = await this.getAll();
    delete codes[capsCode]
    console.log(codes)
    let jsonString = JSON.stringify(codes)
    try{
      fs.writeFile(codePath, jsonString, (err:any) => {console.error(err)})
    }catch(err){
      console.error(err)
    }
  }
}
