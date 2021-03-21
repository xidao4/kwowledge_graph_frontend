export function validateEntityName(newName, oldName, showGraphNodes) {
    if (newName.length === 0) {
        return {
            validateStatus: 'error',
            errorMsg: '请输入实体值',
        };
    }else if(newName.match(/^\s*$/)){
        return {
            validateStatus: 'error',
            errorMsg: '请输入实体值',
        };
    }else if (newName.length > 0 && newName.length <= 15) {
        for(let i = 0; i < showGraphNodes.length; i++){
            if(newName !== oldName && showGraphNodes[i]['name'] === newName){
                return {
                    validateStatus: 'error',
                    errorMsg: '与现有实体重名',
                };
            }
        }
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    } else {
        // input的maxLength即可限制，这里防御式编程
        return {
            validateStatus: 'error',
            errorMsg: '实体值应为1-15位',
        };
    }
}
