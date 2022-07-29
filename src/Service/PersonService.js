import Person from '../Model/Person'



class PersonService{
    constructor(res,req){
        this._res = res;
        this._req = req;
    }

    set res(res){
        this._res = res;
    }
    set req(req){
        this._req = req;
    }
    get res(){
        return this._res;
    }
    get req() {
        return this._req;
    }

    // 将具体业务逻辑展现在此处

    helloWorld = () => { // 业务中的一个具体方法
        let worker = new Person("poul","man","108")
        this.res.send(worker);
    }

}

export default PersonService;