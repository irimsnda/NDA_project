/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.PersonnelQualificationMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'study_field_name', type: 'string'},
        {name: 'study_field_id',type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});