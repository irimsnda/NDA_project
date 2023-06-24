/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.model.premiseRegistration.PremiseRegMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'cost', type: 'float'},
        {name: 'amount_paid', type: 'float'},
        {name: 'exchange_rate', type: 'float'},
        {name: 'total_element_amount', type: 'float'},
        {
            name: 'tshs_equivalent', type: 'float',
            convert: function (val, row) {
                return (row.data.exchange_rate * row.data.total_element_amount);
            }
        },
        {
            name: 'tshs_equivalent_paid', type: 'float',
            convert: function (val, row) {
                return (row.data.exchange_rate * row.data.amount_paid);
            }
        }
    ]
});