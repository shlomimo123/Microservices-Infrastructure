
export class ArrayManipulations {

    public static MapObjFromArray(array:any,key:string) {
        return array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
          }, {});
    }
}