/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.model.productRegistration.ProductRegMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});