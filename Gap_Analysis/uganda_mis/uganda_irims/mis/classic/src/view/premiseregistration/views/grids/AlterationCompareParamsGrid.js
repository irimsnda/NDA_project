/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.AlterationCompareParamsGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.AlterationSetupParamsGrid',
    xtype: 'alterationcompareparamsgrid',
    width: '',
    listeners:{
        beforeselect: function (sel, record) {
            var is_editable = record.get('is_editable');
            if (!is_editable) {
                return false;
            }
        }
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            //width: '100%',
            displayInfo: false,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.store,
                    grid = this.up('grid'),
                    panel = grid.up('premisealterationcomparedetails'),
                    module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                    application_id = panel.down('hiddenfield[name=application_id]').getValue(),
                    application_code = panel.down('hiddenfield[name=application_code]').getValue();
                store.getProxy().extraParams = {
                    module_id: module_id,
                    application_id: application_id,
                    application_code: application_code
                };
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Sync Changes',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            name: 'effect_changes',
            disabled: true,
            hidden: true
        }
    ]
});