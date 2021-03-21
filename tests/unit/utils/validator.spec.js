import { validateEntityName } from '@/utils/validator.js'
describe('Utils-validator', () => {
    it('测试方法validateEntityName', () => {
        let showGraphNodes = [
            {
                name: 'test1',
                color: '#000'
            },
            {
                name: 'test2',
                color: '#000'
            },
            {
                name: 'test3',
                color: '#000'
            }
        ];
        expect(validateEntityName('   ', null, null).errorMsg).toBe('请输入实体值');
        expect(validateEntityName('', null, null).errorMsg).toBe('请输入实体值');
        expect(validateEntityName('test4', 'test1', showGraphNodes).errorMsg).toBeNull();
        expect(validateEntityName('test2', 'test3', showGraphNodes).errorMsg).toBe('与现有实体重名');
        expect(validateEntityName('testtesttesttesttesttest', null, null).errorMsg).toBe('实体值应为1-15位');
    })
});
