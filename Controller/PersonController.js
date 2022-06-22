import PersonService from "../Service/PersonService";


class PersonController {
    constructor(express) {
        this._express = express;
        this._path = null;
    }

    get express() { 
        return this._express; 
    }
    get path() { 
        return this._path; 
    }
    set express(express) { 
        this._express = express; 
    }
    set path(path) { 
        this._path = path; 
    }

    
    startPath = () => {
        this.helloWorld();
    }

    init() {
        //设置路由
        this.path = "/";
        this.startPath();
    }




    helloWorld = () => { // 具体业务路由
        this.express.get(this.path, (req, res) => {
            new PersonService(res, req).helloWorld(); // 在控制层调用具体业务
        })
    }
}

export default PersonController;