import expect, {createSpy} from 'expect';
import buildSyncValidation from '../buildSyncValidation';


describe('buildSyncValidation', () => {
    const schema = {
        title: 'A schema',
        properties: {
            name : {
                type: 'string',
                title: 'A name',
                pattern: 'a{3}',
            }
        }
    };

    it('returns error if pattern does not match', () => {
        var errors = buildSyncValidation(schema)({name: 'hola'});
        expect(errors).toIncludeKey('name');
        var errors2 = buildSyncValidation(schema)({name: 'holaaa'});
        expect(errors2).toExcludeKey('name');
    });

    const schemaLength = {
        title: 'A schema',
        properties: {
            name : {
                type: 'string',
                title: 'A name',
                maxLength: 3,
            }
        }
    };

    it('returns error if too much length', () => {
        var errors = buildSyncValidation(schemaLength)({name: '123456'});
        expect(errors).toIncludeKey('name');
        var errors2 = buildSyncValidation(schemaLength)({name: 'ho'});
        expect(errors2).toExcludeKey('name');
    });
});
