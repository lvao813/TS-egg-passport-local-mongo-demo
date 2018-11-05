/**
 * 成功时的类，生成成功对象
 */
export class Success {
    code: number;
    msg: string;
    data?: any;
    constructor(code: number, msg: string, data?: any){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
/**
 * 失败时的类，生成失败对象
 */
export class Failure {
    code: number;
    msg: string;
    error?: any;
    constructor(code: number, msg: string, error?: any){
        this.code = code;
        this.msg = msg;
        this.error = error;
    }
}
