import {CourceStoreProxy, Course} from "@/store/course_list";
import {PaState, PaStateProxy} from "@/store/pastate";

class _PaStateMan{
    private _state=new PaState();
    private _comps:any={}
    private _nextcompid=0;
    private _valkey2compids:any={}
    private _recentgetkey=""
    regist_comp(comp:any,cb:(registval:(valinstate:any)=>void,state:PaState)=>void){
        this._comps[this._nextcompid+""]=comp;
        comp.___id___=this._nextcompid;
        this._nextcompid++;
        const regist_val2comp=(valaddr:any)=>{
            console.log("regist val",this._recentgetkey)
            if(!(this._recentgetkey in this._valkey2compids)){
                this._valkey2compids[this._recentgetkey]={}
            }
            this._valkey2compids[this._recentgetkey][comp.___id___+""]=1;
        }
        cb(regist_val2comp,this._state);
    }
    unregist_comp(comp:any){
        delete this._comps[comp.___id___]
    }
    private statep=new PaStateProxy(this._state);
    getstate():PaStateProxy{
        return this.statep
    }
    private _val_ope(key:string,oldval:any,val:any){
        if(key in this._valkey2compids){
            let delids:string[]=[]
            const ids=Object.keys(this._valkey2compids[key]);
            for(const i in ids){
                const id:string=ids[i];
                if(this._comps[id]){
                    this._comps[id].forceUpdate();
                }else{
                    delids.push(id)
                }
            }
            delids.forEach((v)=>{
                delete this._valkey2compids[v]
            })
        }
    }
    constructor() {
        let keys=Object.keys(this._state);
        // console.log("state loaded")
        for(const keyi in keys){
            const key=keys[keyi];
            // console.log("state hook",key)
            // @ts-ignore
            this._state["_"+key]=this._state[key];
            let _this=this
            Object.defineProperty(this._state, key, {
                get: function() { //取值的时候会触发
                    _this._recentgetkey=key
                    // console.log("gethook")
                    // console.log('get: ', age);
                    // @ts-ignore
                    return _this._state["_"+key];
                },
                set: function(value) { //更新值的时候会触发
                    console.log("sethook")
                    // @ts-ignore
                    if(_this._state["_"+key]!=value){
                        // @ts-ignore
                        const old=_this._state["_"+key];
                        // @ts-ignore
                        _this._state["_"+key]=value;
                        _this._val_ope(key,old,value)
                    }
                }
            });
        }
    }
}

export const PaStateMan= new _PaStateMan()